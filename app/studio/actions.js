"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { createPost, deletePost, updatePost } from "@/lib/blog/store";
import { BLOG_TAG } from "@/lib/blog/queries";
import { postSchema } from "@/lib/validation";
import { requireStudio, signIn, signOut } from "@/lib/studio/auth";
import { slugify } from "@/lib/blog/markdown";

function revalidateBlog() {
  revalidateTag(BLOG_TAG, "max");
  revalidatePath("/blog");
  revalidatePath("/");
}

export async function loginAction(prevState, formData) {
  const ok = await signIn(String(formData.get("password") || ""));
  if (!ok) return { error: "That password is not right." };
  redirect("/studio");
}

export async function logoutAction() {
  await signOut();
  redirect("/studio/login");
}

export async function savePostAction(formData) {
  await requireStudio();

  const id = String(formData.get("id") || "");
  const raw = {
    title: String(formData.get("title") || ""),
    slug: String(formData.get("slug") || "") || undefined,
    excerpt: String(formData.get("excerpt") || ""),
    body: String(formData.get("body") || ""),
    status: String(formData.get("status") || "draft") === "published" ? "published" : "draft",
    categoryName: String(formData.get("categoryName") || "Notes"),
    tags: String(formData.get("tags") || ""),
    featured: formData.get("featured") === "on",
  };

  const parsed = postSchema.safeParse(raw);
  if (!parsed.success) {
    const first =
      Object.values(parsed.error.flatten().fieldErrors).flat().filter(Boolean)[0] ||
      "Check the form and try again.";
    redirect(`/studio/${id || "new"}?error=${encodeURIComponent(first)}`);
  }

  const value = parsed.data;
  const payload = {
    title: value.title,
    slug: slugify(value.slug || value.title),
    excerpt: value.excerpt,
    body: value.body,
    status: value.status,
    category: {
      slug: slugify(value.categoryName || "Notes"),
      name: value.categoryName || "Notes",
    },
    tags: (value.tags || "")
      .split(",")
      .map((tag) => slugify(tag))
      .filter(Boolean),
    featured: Boolean(value.featured),
  };

  if (id) {
    await updatePost(id, payload);
  } else {
    await createPost(payload);
  }

  revalidateBlog();
  redirect("/studio?saved=1");
}

export async function deletePostAction(formData) {
  await requireStudio();
  await deletePost(String(formData.get("id") || ""));
  revalidateBlog();
  redirect("/studio?deleted=1");
}

export async function toggleStatusAction(formData) {
  await requireStudio();
  const id = String(formData.get("id") || "");
  const next = String(formData.get("status") || "draft") === "published" ? "published" : "draft";
  await updatePost(id, { status: next });
  revalidateBlog();
  redirect("/studio?updated=1");
}

export async function previewAction(formData) {
  await requireStudio();
  const slug = String(formData.get("slug") || "");
  const secret = process.env.BLOG_PREVIEW_SECRET || "dev-preview";
  redirect(`/api/draft?secret=${encodeURIComponent(secret)}&slug=${encodeURIComponent(slug)}`);
}
