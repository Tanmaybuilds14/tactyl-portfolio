import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { PostCard } from "@/components/sections/post-card";
import { Cta } from "@/components/sections/cta";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogCategories, getPostsByCategory } from "@/lib/blog/queries";

export async function generateStaticParams() {
  const categories = await getBlogCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categories = await getBlogCategories();
  const category = categories.find((item) => item.slug === slug);
  return {
    title: category ? `${category.name} — blog` : "Blog category",
    description: category
      ? `Posts filed under ${category.name} on the Tactyqal Labs blog.`
      : undefined,
    alternates: { canonical: `/blog/category/${slug}` },
  };
}

export default function BlogCategoryPage(props) {
  return (
    <>
      <Suspense fallback={<CategorySkeleton />}>
        <BlogCategoryContent params={props.params} />
      </Suspense>
      <Cta />
    </>
  );
}

async function BlogCategoryContent({ params }) {
  const { slug } = await params;
  const categories = await getBlogCategories();
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const posts = await getPostsByCategory(slug);

  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Link
            href="/blog"
            className="font-label inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            All posts
          </Link>
          <Badge variant="secondary" className="font-label mt-6">
            Category
          </Badge>
          <h1 className="mt-4 text-4xl leading-[1.05] font-medium tracking-[-0.04em] sm:text-5xl">
            {category.name}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CategorySkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-6 h-6 w-20 rounded-full" />
      <Skeleton className="mt-4 h-12 w-1/3" />
      <Skeleton className="mt-3 h-5 w-24" />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
