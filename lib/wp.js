import { readingMinutes } from "./blog/store";
import { slugify } from "./blog/markdown";

/**
 * WordPress REST adapter.
 *
 * The plan keeps WordPress as a headless CMS at cms.tactyqal.com. These helpers
 * map wp/v2 responses onto the same post shape the local store returns, so pages
 * and components do not care where content comes from.
 *
 * Env:
 *   WP_API_URL        e.g. https://cms.tactyqal.com/wp-json
 *   WP_APP_USER       read-only service user
 *   WP_APP_PASSWORD   application password (drafts/preview only)
 */
function credentials() {
  const user = process.env.WP_APP_USER;
  const password = process.env.WP_APP_PASSWORD;
  if (!user || !password) return null;
  return `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`;
}

function stripHtml(html = "") {
  return String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function mapWpPost(item) {
  const terms = item._embedded?.["wp:term"]?.flat?.() || [];
  const category =
    terms.find((term) => term.taxonomy === "category") || {
      slug: "notes",
      name: "Notes",
    };
  const tags = terms.filter((term) => term.taxonomy === "post_tag").map((term) => term.slug);
  const media = item._embedded?.["wp:featuredmedia"]?.[0];
  const content = item.content?.rendered || "";

  return {
    id: `wp_${item.id}`,
    slug: item.slug,
    title: item.title?.rendered ? stripHtml(item.title.rendered) : "Untitled",
    excerpt: stripHtml(item.excerpt?.rendered || "").slice(0, 280),
    body: content,
    html: content,
    status: item.status === "publish" ? "published" : "draft",
    category: { slug: category.slug, name: stripHtml(category.name || "") },
    tags: tags.map((tag) => Array.isArray(tag) ? tag : String(tag)),
    author: {
      name: stripHtml(item._embedded?.author?.[0]?.name || "Tactyqal Labs"),
      initials: "TL",
    },
    featured: Boolean(item.sticky),
    cover: media?.source_url || "grid",
    coverAlt: media?.alt_text || "",
    publishedAt: item.date || null,
    updatedAt: item.modified || null,
    readingMinutes: readingMinutes(stripHtml(content)),
    source: "wordpress",
  };
}

async function wpFetch(pathname, { draft = false } = {}) {
  const base = (process.env.WP_API_URL || "").replace(/\/$/, "");
  const url = new URL(`${base}${pathname}`);
  url.searchParams.set("_embed", "1");
  if (draft) {
    url.searchParams.set("status", "draft,future,publish");
    const auth = credentials();
    if (!auth) return null;
    const res = await fetch(url, {
      headers: { Authorization: auth, "Cache-Control": "no-store" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  }

  const res = await fetch(url, { next: { revalidate: 3600, tags: ["blog"] } });
  if (!res.ok) throw new Error(`WordPress responded ${res.status} for ${pathname}`);
  return res.json();
}

export async function fetchWpPosts() {
  const data = await wpFetch("/wp/v2/posts?per_page=100&orderby=date&order=desc");
  return (Array.isArray(data) ? data : []).map(mapWpPost);
}

export async function fetchWpPost(slug, options) {
  const data = await wpFetch(`/wp/v2/posts?slug=${encodeURIComponent(slug)}`, options || {});
  const item = Array.isArray(data) ? data[0] : null;
  return item ? mapWpPost(item) : null;
}

/** Rewrites internal links from the CMS host to the public site. */
export function rewriteCmsLinks(html, publicOrigin) {
  const cmsUrl = process.env.WP_API_URL?.replace(/\/wp-json\/?$/, "");
  if (!cmsUrl) return html;
  return String(html).split(cmsUrl).join(publicOrigin);
}

export function canonicalCategorySlug(name) {
  return slugify(name || "notes");
}
