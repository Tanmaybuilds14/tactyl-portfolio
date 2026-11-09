import { Suspense } from "react";
import { notFound } from "next/navigation";

import { PostEditor } from "@/components/studio/post-editor";
import { Skeleton } from "@/components/ui/skeleton";
import { readPostsRaw } from "@/lib/blog/store";
import { requireStudio } from "@/lib/studio/auth";

export default function EditPostPage(props) {
  return (
    <Suspense fallback={<Skeleton className="mx-auto mt-16 h-96 w-full max-w-4xl" />}>
      <EditPost params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

async function EditPost({ params, searchParams }) {
  await requireStudio();
  const { id } = await params;
  const query = await searchParams;
  const posts = await readPostsRaw();
  const post = posts.find((item) => item.id === id);
  if (!post) notFound();

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="font-label text-muted-foreground">Edit post</p>
      <h1 className="mt-3 mb-8 text-3xl font-medium tracking-[-0.035em]">
        {post.title}
      </h1>
      <PostEditor post={post} error={query?.error} />
    </div>
  );
}
