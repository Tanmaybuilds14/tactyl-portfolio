import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Cta } from "@/components/sections/cta";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { stories, getStory } from "@/lib/content/stories";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  return {
    title: `${story.name} — student project`,
    description: story.tagline,
    alternates: { canonical: `/success-stories/${slug}` },
    openGraph: {
      title: story.name,
      description: story.tagline,
      images: story.image ? [{ url: story.image }] : undefined,
    },
  };
}

export default function StoryPage(props) {
  return (
    <>
      <Suspense fallback={<StorySkeleton />}>
        <Story params={props.params} />
      </Suspense>
      <Cta />
    </>
  );
}

async function Story({ params }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const index = stories.findIndex((item) => item.slug === slug);
  const next = stories[(index + 1) % stories.length];

  return (
    <article>
        <header className="relative overflow-hidden border-b border-border">
          <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-60" />
          <div className="relative mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
            <Link
              href="/success-stories"
              className="font-label inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              All success stories
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="font-label">
                {story.category}
              </Badge>
              <span className="font-label text-muted-foreground">
                {story.cohort} · {story.year}
              </span>
            </div>
            <h1 className="mt-5 text-4xl leading-[1.02] font-medium tracking-[-0.045em] sm:text-6xl">
              {story.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {story.tagline}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
              <div className="bg-card p-5">
                <dt className="font-label text-muted-foreground">Result</dt>
                <dd className="font-mono mt-2 text-2xl font-medium tabular-nums">{story.metric}</dd>
                <dd className="font-label mt-1 text-muted-foreground">{story.metricLabel}</dd>
              </div>
              <div className="bg-card p-5">
                <dt className="font-label text-muted-foreground">Cohort</dt>
                <dd className="font-mono mt-2 text-2xl font-medium tabular-nums">{story.year}</dd>
                <dd className="font-label mt-1 text-muted-foreground">{story.cohort}</dd>
              </div>
              <div className="col-span-2 bg-card p-5 sm:col-span-1">
                <dt className="font-label text-muted-foreground">Built with</dt>
                <dd className="mt-3 flex flex-wrap gap-1.5">
                  {story.stack.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="font-mono rounded-sm text-[0.6rem] tracking-[0.12em]"
                    >
                      {item}
                    </Badge>
                  ))}
                </dd>
              </div>
            </dl>

            {story.image && (
              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted">
                <Image
                  src={story.image}
                  alt={`${story.name} app screenshot`}
                  fill
                  priority
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover object-top"
                />
              </div>
            )}
          </div>
        </header>

        <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col gap-12">
            <Reveal>
              <section>
                <p className="font-label text-muted-foreground">The problem</p>
                <p className="mt-4 text-lg leading-relaxed text-foreground/90">{story.problem}</p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <p className="font-label text-muted-foreground">What they built</p>
                <ol className="mt-5 flex flex-col gap-4">
                  {story.build.map((item, i) => (
                    <li key={item} className="flex gap-4 border-b border-border/60 pb-4 last:border-0">
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.98rem] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <p className="font-label text-muted-foreground">What happened</p>
                <p className="mt-4 text-lg leading-relaxed text-foreground/90">{story.result}</p>
              </section>
            </Reveal>

            <Reveal>
              <aside className="rounded-2xl border border-border bg-card p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Student names, photographs and screenshots are added only with written
                  parental consent. Project details here are edited for length.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    render={<Link href="/contact" />}
                    className="rounded-md"
                  >
                    Talk to a mentor
                  </Button>
                </div>
              </aside>
            </Reveal>
          </div>

          <div className="mt-16 border-t border-border pt-8">
            <Link
              href={`/success-stories/${next.slug}`}
              className="group flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-label text-muted-foreground">Next project</p>
                <p className="mt-2 text-2xl font-medium tracking-tight group-hover:underline group-hover:underline-offset-4">
                  {next.name}
                </p>
              </div>
              <ArrowUpRight className="size-6 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
  );
}

function StorySkeleton() {
  return (
    <div className="relative mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
      <Skeleton className="h-4 w-28" />
      <div className="mt-8 flex gap-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-32 rounded-full" />
      </div>
      <Skeleton className="mt-5 h-12 w-3/4 sm:h-16" />
      <Skeleton className="mt-5 h-6 w-full max-w-2xl" />
      <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-3">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="col-span-2 h-28 sm:col-span-1" />
      </div>
      <Skeleton className="mt-8 aspect-[16/9] w-full rounded-2xl" />
    </div>
  );
}
