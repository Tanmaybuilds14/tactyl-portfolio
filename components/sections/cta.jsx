import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function Cta({
  eyebrow = "Next cohort",
  title = "Start with a free consultation.",
  body = "Twenty minutes with a mentor: what your child wants to build, what the eight weeks look like, and whether it is the right fit. No pitch deck.",
}) {
  return (
    <section className="relative overflow-hidden border-t border-border bg-background">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,oklch(1_0_0/0.10),transparent_60%)]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 px-5 py-20 sm:px-8 sm:py-24 lg:flex-row lg:items-end">
        <Reveal className="max-w-2xl">
          <p className="font-label text-muted-foreground">{eyebrow}</p>
          <h2 className="mt-4 text-3xl leading-[1.03] font-medium tracking-[-0.04em] sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {body}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-3 sm:flex-row">
          <Button render={<Link href="/contact" />} className="h-11 rounded-full px-6">
            Book a free consultation
            <ArrowUpRight data-icon="inline-end" />
          </Button>
          <Button
            variant="outline"
            render={<Link href="/program" />}
            className="h-11 rounded-full px-6"
          >
            Read the programme
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
