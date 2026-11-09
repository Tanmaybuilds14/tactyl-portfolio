"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function StoryCard({ story, index }) {
  return (
    <Link href={`/success-stories/${story.slug}`} className="group block h-full">
      <Card className="h-full gap-0 py-0 transition-colors group-hover:ring-foreground/30">
        <div
          className={`relative h-40 overflow-hidden border-b border-border bg-gradient-to-br ${story.accent} to-transparent`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,oklch(1_0_0/0.16),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/0.05)_1px,transparent_1px)] [background-size:28px_28px]" />
          <span className="font-label absolute top-4 left-4 text-foreground/60">
            0{index + 1} / {story.category}
          </span>
          <div className="absolute right-4 bottom-4 text-right">
            <span className="block text-2xl leading-none font-medium tracking-tight">
              {story.metric}
            </span>
            <span className="font-label text-foreground/60">{story.metricLabel}</span>
          </div>
        </div>
        <CardHeader className="pt-5">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-lg tracking-tight">{story.name}</CardTitle>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-4 pb-5">
          <p className="text-sm leading-relaxed text-muted-foreground">{story.tagline}</p>
          <div className="flex flex-wrap gap-1.5">
            {story.stack.slice(0, 2).map((item) => (
              <Badge key={item} variant="secondary" className="font-label">
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function StoriesGallery({ stories }) {
  const reduced = useReducedMotion();

  return (
    <>
      {reduced ? (
        <div className="grid gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
          {stories.map((story, index) => (
            <StoryCard key={story.slug} story={story} index={index} />
          ))}
        </div>
      ) : (
        <ScrollGallery stories={stories} />
      )}

      <div className="px-5 sm:px-8 lg:hidden">
        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          <CarouselContent>
            {stories.map((story, index) => (
              <CarouselItem key={story.slug} className="basis-[86%] sm:basis-1/2">
                <StoryCard story={story} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-5 flex items-center justify-end gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </>
  );
}

/** Sticky horizontal scroll row. Its own component keeps the target ref mounted. */
function ScrollGallery({ stories }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });
  const x = useTransform(progress, [0, 1], ["1%", "-64%"]);

  return (
    <div ref={ref} className="relative hidden h-[300vh] lg:block">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-5 pl-[max(2rem,calc((100vw-72rem)/2))]">
          {stories.map((story, index) => (
            <div key={story.slug} className="w-[24rem] shrink-0">
              <StoryCard story={story} index={index} />
            </div>
          ))}
          <div className="flex w-[20rem] shrink-0 items-center">
            <Link
              href="/success-stories"
              className="group flex flex-col gap-3 rounded-2xl border border-dashed border-border p-8 transition-colors hover:border-foreground/40"
            >
              <span className="font-label text-muted-foreground">All work</span>
              <span className="text-2xl leading-tight font-medium tracking-tight">
                See every student project
              </span>
              <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
