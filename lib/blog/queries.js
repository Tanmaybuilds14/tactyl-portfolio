import { readPostRaw, readPostsRaw } from "./store";

/**
 * Read-only blog API for pages. Every function is cached and tagged `blog` so a
 * publish, edit or unpublish can invalidate exactly the affected output.
 *
 * Set WP_API_URL to read the same shapes from headless WordPress instead; the
 * pages never change. See `lib/wp.js`.
 */
const hasWordPress = Boolean(process.env.WP_API_URL);

export const BLOG_TAG = "blog";

export async function getAllPosts() {
  "use cache";
  const { cacheLife, cacheTag } = await import("next/cache");
  cacheLife("hours");
  cacheTag(BLOG_TAG);

  if (hasWordPress) {
    const { fetchWpPosts } = await import("../wp");
    return fetchWpPosts();
  }

  const posts = await readPostsRaw();
  return posts
    .filter((post) => post.status === "published")
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

export async function getPostBySlug(slug) {
  "use cache";
  const { cacheLife, cacheTag } = await import("next/cache");
  cacheLife("hours");
  cacheTag(BLOG_TAG);

  if (hasWordPress) {
    const { fetchWpPost } = await import("../wp");
    const post = await fetchWpPost(slug);
    return post && post.status === "published" ? post : null;
  }

  const post = await readPostRaw(slug);
  return post && post.status === "published" ? post : null;
}

export async function getPublishedSlugs() {
  "use cache";
  const { cacheLife, cacheTag } = await import("next/cache");
  cacheLife("hours");
  cacheTag(BLOG_TAG);

  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}

export async function getBlogCategories() {
  "use cache";
  const { cacheLife, cacheTag } = await import("next/cache");
  cacheLife("hours");
  cacheTag(BLOG_TAG);

  const posts = await getAllPosts();
  const map = new Map();
  for (const post of posts) {
    if (!post.category?.slug) continue;
    const entry = map.get(post.category.slug) || { ...post.category, count: 0 };
    entry.count += 1;
    map.set(post.category.slug, entry);
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getPostsByCategory(categorySlug) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category?.slug === categorySlug);
}

export async function getRelatedPosts(slug, limit = 3) {
  const posts = await getAllPosts();
  const current = posts.find((post) => post.slug === slug);
  if (!current) return posts.slice(0, limit);

  const scored = posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      let score = 0;
      if (post.category?.slug === current.category?.slug) score += 2;
      const shared = (post.tags || []).filter((tag) => (current.tags || []).includes(tag));
      score += shared.length;
      return { post, score };
    })
    .sort((a, b) => b.score - a.score || new Date(b.post.publishedAt) - new Date(a.post.publishedAt));

  return scored.slice(0, limit).map((entry) => entry.post);
}

/** Draft-aware read used by previews; never cached. */
export async function getPostForPreview(slug) {
  if (hasWordPress) {
    const { fetchWpPost } = await import("../wp");
    return fetchWpPost(slug, { draft: true });
  }
  return readPostRaw(slug);
}

export async function getLatestPosts(limit = 3) {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}
