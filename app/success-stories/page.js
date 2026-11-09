import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { StoriesGallery } from "@/components/sections/stories-gallery";
import { Cta } from "@/components/sections/cta";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatsStrip } from "@/components/sections/stats-strip";
import { Badge } from "@/components/ui/badge";
import { stories, stats } from "@/lib/content/stories";

export const metadata = {
  title: "Success stories",
  description:
    "Six student products built and launched during the 8-week programme: the problem, the build, and what happened when real users tried it.",
  alternates: { canonical: "/success-stories" },
};

export default function SuccessStoriesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,oklch(1_0_0/0.08),transparent_55%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Badge variant="outline" className="font-label border-foreground/20">
            Student work
          </Badge>
          <h1 className="mt-6 max-w-3xl text-[2.5rem] leading-[1.02] font-medium tracking-[-0.045em] sm:text-6xl">
            What teenagers shipped when they were given eight weeks.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every project below started with someone else&apos;s problem. We publish the build
            and the first result — not just the launch announcement.
          </p>
        </div>
      </section>

      <StatsStrip stats={stats} />

      <section className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-5 pb-4 sm:px-8">
          <SectionHeading
            eyebrow="Scroll sideways"
            title="Six projects, six constraints."
            body="On a phone these become a swipeable carousel; on desktop the row moves as you scroll."
            className="pt-16 sm:pt-20"
          />
        </div>
      </section>

      <StoriesGallery stories={stories} />

      <section className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            eyebrow="The index"
            title="Every project, in one list."
            body="Open any project for the problem, the build decisions and the first result."
          />
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {stories.map((story) => (
              <li key={story.slug}>
                <Link
                  href={`/success-stories/${story.slug}`}
                  className="group grid gap-3 py-5 sm:grid-cols-[1fr_1.4fr_auto] sm:items-center sm:gap-6"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-muted-foreground">{story.year}</span>
                    <span className="text-lg tracking-tight group-hover:underline group-hover:underline-offset-4">
                      {story.name}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{story.tagline}</p>
                  <div className="flex items-center gap-4">
                    <span className="font-label text-muted-foreground">{story.category}</span>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Cta
        eyebrow="Your kid's project"
        title="The next case study could be theirs."
        body="Bring one problem they care about to a free consultation. We will tell you whether it can ship in eight weeks."
      />
    </>
  );
}
