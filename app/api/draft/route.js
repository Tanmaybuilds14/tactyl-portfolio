import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

import { getPostForPreview } from "@/lib/blog/queries";

/**
 * Draft preview entry point.
 * /api/draft?secret=…&slug=… enables Draft Mode and redirects to the post.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const expected = process.env.BLOG_PREVIEW_SECRET || "dev-preview";

  if (!secret || secret !== expected || !slug) {
    return new Response("Invalid preview token", { status: 401 });
  }

  const post = await getPostForPreview(slug);
  if (!post) {
    return new Response("Unknown slug", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  // Redirect to the stored slug, never to the user-supplied value.
  redirect(`/blog/${post.slug}`);
}
