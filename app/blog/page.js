import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PostCard } from "@/components/sections/post-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { Cta } from "@/components/sections/cta";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, getBlogCategories } from "@/lib/blog/queries";
import { formatDate } from "@/lib/format";

export const metadata = {
  title: "Blog",
  description:
    "How the 8-week programme works: scope, no-code, launch week and what students learn by shipping.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = await getBlogCategories();
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,oklch(1_0_0/0.08),transparent_55%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <Badge variant="outline" className="font-label border-foreground/20">
            The build log
          </Badge>
          <h1 className="mt-6 max-w-3xl text-[2.5rem] leading-[1.02] font-medium tracking-[-0.045em] sm:text-6xl">
            Notes on teaching teenagers to ship.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Scope, tooling, launch week and the parts of a build that are hard to teach.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/blog"
              className="font-label rounded-full border border-foreground/20 px-3 py-1.5 text-foreground"
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className="font-label rounded-full border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                {category.name} · {category.count}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
          <p className="text-muted-foreground">No posts published yet.</p>
        </section>
      ) : (
        <>
          <section className="border-b border-border bg-background">
            <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid gap-8 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/25 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="font-label">
                      Latest
                    </Badge>
                    <span className="font-label text-muted-foreground">
                      {featured.category?.name} · {formatDate(featured.publishedAt)}
                    </span>
                  </div>
                  <h2 className="text-2xl leading-tight font-medium tracking-[-0.03em] sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm underline underline-offset-4">
                    Read the post
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
                <div className="relative h-40 overflow-hidden rounded-xl bg-gradient-to-br from-neutral-400/25 via-neutral-600/10 to-transparent sm:h-52">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(1_0_0/0.16),transparent_60%)]" />
                  <span className="font-label absolute bottom-4 left-4 text-foreground/60">
                    {featured.readingMinutes} min read
                  </span>
                </div>
              </Link>
            </div>
          </section>

          <section className="bg-background">
            <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
              <SectionHeading eyebrow="Archive" title="Everything else." />
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <Reveal key={post.slug}>
                    <PostCard post={post} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <Cta />
    </>
  );
}
