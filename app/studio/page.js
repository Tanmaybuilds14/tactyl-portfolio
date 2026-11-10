import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { readPostsRaw } from "@/lib/blog/store";
import { requireStudio } from "@/lib/studio/auth";
import { formatDate, formatDateTime } from "@/lib/format";
import { deletePostAction, logoutAction, previewAction, toggleStatusAction } from "./actions";

export default function StudioPage(props) {
  return (
    <Suspense fallback={<StudioSkeleton />}>
      <StudioList searchParams={props.searchParams} />
    </Suspense>
  );
}

async function StudioList({ searchParams }) {
  await requireStudio();
  const params = await searchParams;
  const posts = (await readPostsRaw()).sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  const flash = params?.saved
    ? "Post saved and the public pages were revalidated."
    : params?.deleted
      ? "Post deleted."
      : params?.updated
        ? "Status updated."
        : params?.error
          ? params.error
          : "";

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-label text-muted-foreground">Blog studio</p>
          <h1 className="mt-3 text-3xl font-medium tracking-[-0.035em]">Posts</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {posts.length} {posts.length === 1 ? "post" : "posts"} · writes go to the blog store
            and revalidate the public pages.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button render={<Link href="/blog" />} variant="outline" className="rounded-md">
            View blog
            <ArrowUpRight data-icon="inline-end" />
          </Button>
          <Button render={<Link href="/studio/new" />} className="rounded-md">
            <Plus data-icon="inline-start" />
            New post
          </Button>
        </div>
      </div>

      {flash && (
        <p
          role="status"
          className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
            params?.error
              ? "border-destructive/40 bg-destructive/10 text-destructive"
              : "border-border bg-secondary/40"
          }`}
        >
          {flash}
        </p>
      )}

      <ul className="mt-8 divide-y divide-border border-y border-border">
        {posts.map((post) => (
          <li key={post.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={post.status === "published" ? "secondary" : "outline"}
                  className="font-label"
                >
                  {post.status}
                </Badge>
                <span className="font-label text-muted-foreground">
                  {post.category?.name} · {post.readingMinutes} min
                </span>
                {post.featured && (
                  <Badge variant="outline" className="font-label">
                    featured
                  </Badge>
                )}
              </div>
              <Link
                href={`/studio/${post.id}`}
                className="mt-2 block truncate text-lg tracking-tight hover:underline hover:underline-offset-4"
              >
                {post.title}
              </Link>
              <p className="mt-1 font-mono text-[0.68rem] text-muted-foreground">
                /blog/{post.slug} · updated {formatDateTime(post.updatedAt)}
                {post.publishedAt ? ` · published ${formatDate(post.publishedAt)}` : ""}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                render={<Link href={`/studio/${post.id}`} />}
                className="rounded-md"
              >
                Edit
              </Button>

              {post.status === "published" ? (
                <form action={toggleStatusAction}>
                  <input type="hidden" name="id" value={post.id} />
                  <input type="hidden" name="status" value="draft" />
                  <Button type="submit" variant="ghost" size="sm" className="rounded-md">
                    Unpublish
                  </Button>
                </form>
              ) : (
                <form action={toggleStatusAction}>
                  <input type="hidden" name="id" value={post.id} />
                  <input type="hidden" name="status" value="published" />
                  <Button type="submit" variant="ghost" size="sm" className="rounded-md">
                    Publish
                  </Button>
                </form>
              )}

              <form action={previewAction}>
                <input type="hidden" name="slug" value={post.slug} />
                <Button type="submit" variant="ghost" size="sm" className="rounded-md">
                  Preview
                </Button>
              </form>

              <form action={deletePostAction}>
                <input type="hidden" name="id" value={post.id} />
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="rounded-md text-destructive hover:text-destructive"
                >
                  Delete
                </Button>
              </form>
            </div>
          </li>
        ))}
      </ul>

      <form action={logoutAction} className="mt-10">
        <Button type="submit" variant="outline" size="sm" className="rounded-md">
          Sign out
        </Button>
      </form>
    </div>
  );
}

function StudioSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="mt-8 h-24 w-full" />
      <Skeleton className="mt-3 h-24 w-full" />
    </div>
  );
}
