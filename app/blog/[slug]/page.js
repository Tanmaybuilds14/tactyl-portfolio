import { Suspense } from "react";
import Link from "next/link";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { ScrollProgress } from "@/components/motion/scroll-progress";
import { PreviewBanner } from "@/components/site/preview-banner";
import { PostCard } from "@/components/sections/post-card";
import { Cta } from "@/components/sections/cta";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getPostBySlug,
  getPostForPreview,
  getPublishedSlugs,
  getRelatedPosts,
} from "@/lib/blog/queries";
import { renderMarkdown } from "@/lib/blog/markdown";
import { rewriteCmsLinks } from "@/lib/wp";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt || undefined,
    },
  };
}

export default function BlogPostPage(props) {
  return (
    <>
      <ScrollProgress />
      <Suspense fallback={<ArticleSkeleton />}>
        <Article params={props.params} />
      </Suspense>
    </>
  );
}

async function Article({ params }) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const post = isEnabled ? await getPostForPreview(slug) : await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, 3);
  const rendered = post.html
    ? { html: rewriteCmsLinks(post.html, site.url), headings: [] }
    : renderMarkdown(post.body);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || post.publishedAt || undefined,
    author: { "@type": "Organization", name: post.author?.name || site.name },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <PreviewBanner />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article>
        <header className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,oklch(1_0_0/0.08),transparent_55%)]" />
          <div className="relative mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
            <Link
              href="/blog"
              className="font-label inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              All posts
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <Link href={`/blog/category/${post.category?.slug}`}>
                <Badge variant="secondary" className="font-label">
                  {post.category?.name}
                </Badge>
              </Link>
              <span className="font-label text-muted-foreground">
                <time dateTime={post.publishedAt || undefined}>
                  {formatDate(post.publishedAt)}
                </time>
                {" · "}
                {post.readingMinutes} min read
              </span>
              {post.status === "draft" && (
                <Badge variant="destructive" className="font-label">
                  Draft
                </Badge>
              )}
            </div>

            <h1 className="mt-5 text-[2.2rem] leading-[1.05] font-medium tracking-[-0.04em] sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <p className="font-label mt-6 text-muted-foreground">
              By {post.author?.name || site.name}
            </p>
          </div>
        </header>

        <div className="mx-auto grid w-full max-w-5xl gap-12 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <div className="min-w-0">
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: rendered.html }}
            />

            {(post.tags || []).length > 0 && (
              <div className="mt-12 flex flex-wrap gap-1.5 border-t border-border pt-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="font-label">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {rendered.headings.length > 1 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="font-label text-muted-foreground">On this page</p>
                <ul className="mt-4 flex flex-col gap-2.5 border-l border-border pl-4">
                  {rendered.headings
                    .filter((heading) => heading.level === 2)
                    .map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className="text-sm leading-snug text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </aside>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border bg-background">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-medium tracking-tight">Keep reading</h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm underline underline-offset-4"
              >
                All posts
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Cta
        eyebrow="The programme"
        title="Eight weeks, one product, one mentor."
        body="If this is the kind of work your kid wants to do, start with a free consultation."
      />
    </>
  );
}

function ArticleSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-8 h-12 w-full" />
      <Skeleton className="mt-3 h-12 w-2/3" />
      <Skeleton className="mt-6 h-5 w-full" />
      <div className="mt-12 flex flex-col gap-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}
