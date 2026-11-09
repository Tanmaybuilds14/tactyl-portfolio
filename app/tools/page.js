import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import { ToolsGrid } from "@/components/sections/tools-grid";
import { Cta } from "@/components/sections/cta";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { tools } from "@/lib/content/tools";

export const metadata = {
  title: "Free tools",
  description:
    "Eight free assessments for young founders: idea generation, fundability, team fit, pitch decks, cofounder compatibility and more.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  const totalMinutes = tools.reduce((sum, tool) => sum + tool.minutes, 0);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,oklch(1_0_0/0.08),transparent_55%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Badge variant="outline" className="font-label border-foreground/20">
            Free · no account needed
          </Badge>
          <h1 className="mt-6 max-w-3xl text-[2.5rem] leading-[1.02] font-medium tracking-[-0.045em] sm:text-6xl">
            Eight assessments to pressure-test an idea.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {totalMinutes} minutes of questions across the whole set. Use one before applying,
            or bring the result to a consultation.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              render={<Link href="/tools/startup-idea-generator" />}
              className="h-11 rounded-full px-6"
            >
              Start with the idea generator
              <ArrowUpRight data-icon="inline-end" />
            </Button>
            <span className="font-label text-muted-foreground">
              <Clock className="mr-1.5 inline size-3" />5 minutes
            </span>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <ToolsGrid tools={tools} />
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHeading
            eyebrow="How this works"
            title="Scores are a starting point, not a verdict."
            body="Every assessment explains its reasoning and the evidence you still need. We do not score students, and we do not collect results you do not ask us to keep."
          />
        </div>
      </section>

      <Cta
        eyebrow="Want a human read?"
        title="Bring your result to a mentor."
        body="A free consultation is the fastest way to find out which assessment matters for your child's idea."
      />
    </>
  );
}
