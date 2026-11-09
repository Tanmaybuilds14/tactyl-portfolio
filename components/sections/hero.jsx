"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import PerspectiveTunnelHero from "@/components/ui/perspective-tunnel-hero";
import { useMounted } from "@/lib/use-mounted";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Hero wrapper.
 *
 * The tunnel is wheel-driven inside a 100svh stage, so it is desktop-only and
 * client-only: spring-derived inline styles differ between server and client,
 * and touch devices have no wheel to drive it. Everything else (SSR markup,
 * reduced motion, phones) gets the static hero.
 */
export function TunnelHero({ cards }) {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const [isDesktop, setIsDesktop] = useState(false);
  const [playAnyway, setPlayAnyway] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  const showTunnel = mounted && isDesktop && (!reduced || playAnyway);

  if (showTunnel) {
    return <PerspectiveTunnelHero cards={cards} />;
  }

  return (
    <StaticHero cards={cards} onPlay={reduced ? () => setPlayAnyway(true) : undefined} />
  );
}

/** Static, no-motion version: SSR, reduced motion, and touch devices. */
function StaticHero({ cards, onPlay }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(1_0_0/0.10),transparent_60%)]" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-32">
        <div>
          <span className="font-label rounded-full border border-foreground/15 px-3 py-1.5 text-foreground/70">
            8-week 1:1 programme · Ages 13–18
          </span>
          <h1 className="mt-6 text-4xl leading-[1.02] font-medium tracking-[-0.04em] sm:text-6xl">
            Empower your kid to build the next app that{" "}
            <span className="text-foreground/55">impacts millions.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            In eight weeks, one student and one mentor take a real problem from
            interview to a launched product.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button render={<Link href="/contact" />} className="h-11 rounded-full px-6">
              Book a free consultation
            </Button>
            <Button
              variant="outline"
              render={<Link href="/success-stories" />}
              className="h-11 rounded-full px-6"
            >
              See student work
            </Button>
          </div>
          {onPlay && (
            <button
              type="button"
              onClick={onPlay}
              className="font-label mt-6 text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Play the tunnel animation
            </button>
          )}
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {cards.map((card) => (
            <li key={card.slug} className="rounded-2xl border border-foreground/12 bg-card p-4">
              <span className="font-label text-muted-foreground">{card.category}</span>
              <p className="mt-2 text-sm font-medium">{card.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{card.tagline}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
