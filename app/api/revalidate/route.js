import { revalidatePath, revalidateTag } from "next/cache";

import { BLOG_TAG } from "@/lib/blog/queries";

const DEFAULT_PATHS = ["/", "/blog"];

/**
 * On-demand revalidation webhook.
 *
 * Point the WordPress publish hook here:
 *   POST /api/revalidate?secret=...   { "paths": ["/blog/some-slug"] }
 * The secret can also arrive as `x-revalidate-secret`.
 */
export async function POST(request) {
  const url = new URL(request.url);
  const secret =
    request.headers.get("x-revalidate-secret") || url.searchParams.get("secret");
  const expected = process.env.BLOG_REVALIDATE_SECRET || "dev-revalidate";

  if (!secret || secret !== expected) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  revalidateTag(BLOG_TAG, "max");

  const paths = Array.isArray(body.paths) && body.paths.length ? body.paths : DEFAULT_PATHS;
  const revalidated = [];
  for (const path of paths) {
    if (typeof path !== "string" || !path.startsWith("/")) continue;
    revalidatePath(path);
    revalidated.push(path);
  }

  return Response.json({ revalidated: true, paths: revalidated });
}
