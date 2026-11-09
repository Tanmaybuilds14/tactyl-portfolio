import { Suspense } from "react";

import { PostEditor } from "@/components/studio/post-editor";
import { Skeleton } from "@/components/ui/skeleton";
import { requireStudio } from "@/lib/studio/auth";

export default function NewPostPage(props) {
  return (
    <Suspense fallback={<Skeleton className="mx-auto mt-16 h-96 w-full max-w-4xl" />}>
      <NewPost searchParams={props.searchParams} />
    </Suspense>
  );
}

async function NewPost({ searchParams }) {
  await requireStudio();
  const params = await searchParams;

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="font-label text-muted-foreground">New post</p>
      <h1 className="mt-3 mb-8 text-3xl font-medium tracking-[-0.035em]">Write something</h1>
      <PostEditor
        post={{ title: "", slug: "", excerpt: "", body: "", status: "draft", tags: [] }}
        error={params?.error}
      />
    </div>
  );
}
