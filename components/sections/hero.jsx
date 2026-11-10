"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import PerspectiveTunnelHero from "@/components/ui/perspective-tunnel-hero";
import { buttonVariants } from "@/components/ui/button";
import { useMounted } from "@/lib/use-mounted";
import { stories } from "@/lib/content/stories";

/**
 * Home hero.
 *
 * Default view is the Perspective Tunnel (scroll-linked card flight, see
 * perspective-tunnel-hero.jsx). The server paints the same copy statically for
 * the frame before hydration (crawlable h1, no hydration cliff); once mounted
 * the tunnel takes over — matching the original component's behaviour.
 */

const HERO_COPY = {
  eyebrow: "8-week 1:1 programme · ages 13–18",
  title: "Build and launch a real app",
  accent: "in 8 weeks.",
  description:
    "One student. One mentor. Weekly build logs, a Friday demo, and a deployed product at the end — starting from no code.",
};

export function Hero({ cards }) {
  const mounted = useMounted();

  if (mounted) {
    return <PerspectiveTunnelHero cards={cards} {...HERO_COPY} />;
  }
  return <StaticHero />;
}

function StaticHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
        <div className="flex flex-col items-start">
          <p className="font-label flex items-center gap-2.5 text-muted-foreground">
            <span className="size-1.5 rounded-full bg-positive" />
            {HERO_COPY.eyebrow}
          </p>

          <h1 className="mt-6 max-w-[16ch] text-[2.6rem] leading-[1.02] font-medium tracking-[-0.045em] text-balance sm:text-6xl lg:text-[4.2rem]">
            {HERO_COPY.title}{" "}
            <span className="text-brand-soft">{HERO_COPY.accent}</span>
          </h1>

          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            {HERO_COPY.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className={buttonVariants({ className: "h-10 rounded-md px-5 shadow-lg shadow-brand/25" })}
            >
              Book a free consultation
              <ArrowUpRight data-icon="inline-end" />
            </Link>
            <Link
              href="/tools"
              className={buttonVariants({
                variant: "outline",
                className: "h-10 rounded-md px-5",
              })}
            >
              Try the free tools
            </Link>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
            {["No-code first", "Weekly build log", "Launch at week 8"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="font-mono text-[0.65rem] text-muted-foreground/90">
                  [ {item} ]
                </span>
              </div>
            ))}
          </dl>
        </div>

        <BuildLog launchStory={stories[0]} />
      </div>
    </section>
  );
}

const STATUS = {
  locked: { label: "LOCKED", tone: "text-muted-foreground" },
  pass: { label: "PASS", tone: "text-positive" },
  live: { label: "LIVE", tone: "text-brand-soft" },
};

function BuildLog({ launchStory }) {
  const rows = [
    { week: "WK 01", line: "scope.cut", detail: "feature list: 12 → 4", status: STATUS.locked },
    { week: "WK 02", line: "interviews", detail: "5 users · pain points ranked", status: STATUS.pass },
    { week: "WK 05", line: "build.lock", detail: "core flow wired + tested", status: STATUS.pass },
    {
      week: "WK 08",
      line: "launch",
      detail: `${launchStory?.name ?? "Student app"} — ${launchStory?.metric ?? ""} ${launchStory?.metricLabel ?? "in the wild"}`.trim(),
      status: STATUS.live,
    },
  ];

  return (
    <aside
      aria-label="Programme build log"
      className="relative w-full overflow-hidden rounded-xl border border-border bg-surface-2 shadow-2xl shadow-black/40"
    >
      {/* Window bar */}
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
        <span className="font-mono text-[0.7rem] tracking-[0.14em] text-muted-foreground">
          tactyqal://build-log
        </span>
        <span className="font-mono text-[0.65rem] text-muted-foreground/80">
          WEEK 08/08
        </span>
      </div>

      <div className="flex flex-col divide-y divide-border/60 px-4">
        {rows.map((row) => (
          <div
            key={row.week}
            className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3.5"
          >
            <span className="font-mono text-[0.65rem] tracking-[0.08em] text-brand-soft/80">
              {row.week}
            </span>
            <span className="font-mono text-xs text-foreground/90">{row.line}</span>
            <span className="mr-auto text-xs text-muted-foreground">{row.detail}</span>
            <span
              className={`font-mono text-[0.6rem] tracking-[0.14em] ${row.status.tone}`}
            >
              [{row.status.label}]
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-border bg-surface px-4 py-3">
        <p className="font-mono text-[0.7rem] text-muted-foreground">
          <span className="text-positive"> $</span> next cohort — intake open
          <span className="cursor-blink ml-1 inline-block h-3 w-[0.45rem] translate-y-0.5 bg-brand-soft/80" />
        </p>
      </div>
    </aside>
  );
}
