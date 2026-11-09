import { revalidatePath } from "next/cache";

import { readPostsRaw, createPost } from "@/lib/blog/store";
import { isStudioAuthed } from "@/lib/studio/auth";
import { postSchema } from "@/lib/validation";
import { slugify } from "@/lib/blog/markdown";

/**
 * Public read API for the blog.
 * GET /api/blog            → published posts
 * GET /api/blog?all=1      → every post (studio session required)
 * POST /api/blog           → create a post (studio session required)
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const wantsAll = searchParams.get("all") === "1";

  const posts = await readPostsRaw();

  if (wantsAll) {
    if (!(await isStudioAuthed())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    return Response.json({ posts });
  }

  const published = posts
    .filter((post) => post.status === "published")
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .map(({ body, ...rest }) => rest);

  return Response.json({ posts: published });
}

export async function POST(request) {
  if (!(await isStudioAuthed())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = postSchema.safeParse({
    ...payload,
    tags: Array.isArray(payload?.tags) ? payload.tags.join(",") : payload?.tags,
    categoryName: payload?.categoryName || payload?.category?.name,
  });

  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const value = parsed.data;
  const post = await createPost({
    title: value.title,
    slug: slugify(value.slug || value.title),
    excerpt: value.excerpt,
    body: value.body,
    status: value.status,
    category: {
      slug: slugify(value.categoryName || "Notes"),
      name: value.categoryName || "Notes",
    },
    tags: (value.tags || "").split(",").map(slugify).filter(Boolean),
    featured: Boolean(value.featured),
  });

  revalidatePath("/blog");
  revalidatePath("/");

  return Response.json({ post }, { status: 201 });
}
