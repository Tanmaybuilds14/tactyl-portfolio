"use client";

import Image from "next/image";
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
    <Link
      href={`/success-stories/${story.slug}`}
      className="group block h-full transition-transform duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
    >
      <Card className="h-full gap-0 py-0 transition-colors group-hover:border-brand/40">
        <div className="relative h-44 overflow-hidden border-b border-border bg-muted">
          {story.image ? (
            <Image
              src={story.image}
              alt={`${story.name} app screenshot`}
              fill
              sizes="(max-width: 640px) 86vw, (max-width: 1024px) 45vw, 380px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="grid-bg absolute inset-0 opacity-80" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <span className="font-mono absolute top-3 left-4 text-[0.62rem] tracking-[0.16em] text-white/80">
            {String(index + 1).padStart(2, "0")} / {story.category.toUpperCase()}
          </span>
          <div className="absolute right-4 bottom-3 text-right">
            <span className="block text-2xl leading-none font-medium tracking-tight tabular-nums text-white">
              {story.metric}
            </span>
            <span className="font-mono text-[0.6rem] tracking-[0.14em] text-white/60">
              {story.metricLabel}
            </span>
          </div>
        </div>
        <CardHeader className="pt-5">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-lg tracking-tight">{story.name}</CardTitle>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-soft" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-4 pb-5">
          <p className="text-sm leading-relaxed text-muted-foreground">{story.tagline}</p>
          <div className="flex flex-wrap gap-1.5">
            {story.stack.slice(0, 2).map((item) => (
              <Badge
                key={item}
                variant="outline"
                className="font-mono rounded-sm text-[0.6rem] tracking-[0.12em] text-muted-foreground"
              >
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
              className="group flex flex-col gap-3 rounded-xl border border-dashed border-border p-8 transition-colors hover:border-brand/50"
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
