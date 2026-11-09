"use client";

import PerspectiveTunnelHero from "@/components/ui/perspective-tunnel-hero";
import { useMounted } from "@/lib/use-mounted";

/**
 * Home hero.
 *
 * The tunnel is scroll-linked, so its spring-derived inline styles are computed
 * on the client only; the server paints the same stage frame (and a crawlable
 * h1) for the frame before hydration.
 */
export function TunnelHero({ cards }) {
  const mounted = useMounted();

  if (!mounted) return <HeroFrame />;

  return <PerspectiveTunnelHero cards={cards} />;
}

function HeroFrame() {
  return (
    <section className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(oklch(1_0_0/0.12)_1px,transparent_1px)] [background-size:28px_28px] opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
      <h1 className="sr-only">
        Empower your kid to build the next app that impacts millions.
      </h1>
    </section>
  );
}
