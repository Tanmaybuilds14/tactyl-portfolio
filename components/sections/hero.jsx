"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SplitText } from "@/components/motion/split-text";

/**
 * Perspective Tunnel Hero — after 21st.dev/@daiwiikharihar/perspective-tunnel-hero.
 *
 * Cards sit on a golden-angle spiral and fly down the Z axis toward the camera
 * as the page scrolls. Transform + opacity only; the hero renders a static grid
 * when prefers-reduced-motion is set.
 */
const GOLDEN_ANGLE = 137.507764;

export function TunnelHero({ cards }) {
  const sceneRef = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const tiltX = useSpring(0, { stiffness: 60, damping: 20 });
  const tiltY = useSpring(0, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-7, 7]);

  if (reduced) {
    return <StaticHero cards={cards} />;
  }

  return (
    <section
      ref={sceneRef}
      className="relative h-[230svh]"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        tiltX.set((event.clientX - rect.left) / rect.width - 0.5);
        tiltY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        tiltX.set(0);
        tiltY.set(0);
      }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="tunnel-scene absolute inset-0">
          <div className="tunnel-grid absolute inset-0" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,color-mix(in_oklch,var(--background)_55%,transparent)_38%,var(--background)_78%)]"
          />

          <motion.div
            style={{ rotateX, rotateY }}
            className="tunnel-layer absolute inset-0 grid place-items-center"
            aria-hidden="true"
          >
            {Array.from({ length: 14 }).map((_, index) => (
              <TunnelRing key={`ring-${index}`} progress={progress} index={index} />
            ))}

            {cards.map((card, index) => (
              <TunnelCard key={card.slug} card={card} index={index} progress={progress} />
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-5 pt-16 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="font-label rounded-full border border-foreground/15 bg-background/40 px-3 py-1.5 text-foreground/70 backdrop-blur-sm">
              8-week 1:1 programme
            </span>
            <span className="font-label text-muted-foreground">Ages 13–18 · No code required</span>
          </motion.div>

          <SplitText
            as="h1"
            text="Empower your kid to build the next app that"
            accent="impacts millions."
            className="mt-6 max-w-4xl text-[2.6rem] leading-[0.98] font-medium tracking-[-0.045em] sm:text-6xl lg:text-[4.6rem]"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            In eight weeks, one student and one mentor take a real problem from
            interview to a launched product — with users, feedback and a demo day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button
              render={<Link href="/contact" />}
              className="h-11 rounded-full px-6 text-sm"
            >
              Book a free consultation
              <ArrowUpRight data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              render={<Link href="/success-stories" />}
              className="h-11 rounded-full border-foreground/20 px-6 text-sm"
            >
              See student work
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-12 flex items-center gap-2 text-muted-foreground"
          >
            <ArrowDown className="size-3.5 animate-bounce" />
            <span className="font-label">Scroll to fly through the work</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TunnelRing({ progress, index }) {
  const startZ = -4200 + index * 300;
  const z = useTransform(progress, [0, 1], [startZ, 1400]);
  const opacity = useTransform(progress, [0, 0.1, 0.85, 1], [0, 0.55, 0.3, 0]);
  const size = 620 + index * 24;

  return (
    <motion.div
      style={{ z, opacity }}
      className="absolute rounded-full border border-foreground/12"
      initial={false}
      animate={{ width: size, height: size }}
      transition={{ duration: 0 }}
    />
  );
}

function TunnelCard({ card, index, progress }) {
  const angle = (index * GOLDEN_ANGLE * Math.PI) / 180;
  const radius = 300 + index * 52;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius * 0.52;

  const z = useTransform(progress, [0, 1], [-1500 - index * 170, 1050]);
  const opacity = useTransform(progress, [0, 0.12, 0.72, 0.94], [0, 1, 1, 0]);
  const cardRotate = useTransform(progress, [0, 1], [-14, 4]);

  return (
    <motion.div
      style={{
        x,
        y,
        z,
        opacity,
        rotateY: -Math.sin(angle) * 16,
        rotateX: Math.cos(angle) * 10,
        rotateZ: cardRotate,
      }}
      className="tunnel-card absolute w-[210px] rounded-2xl border border-foreground/12 bg-card/90 p-4 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-[2px] sm:w-[250px] sm:p-5"
    >
      <div className={`mb-4 h-16 rounded-lg bg-gradient-to-br ${card.accent} to-transparent`}>
        <div className="flex h-full items-end justify-between p-2.5">
          <span className="font-label text-foreground/50">{card.category}</span>
          <span className="font-mono text-[0.65rem] text-foreground/40">{card.year}</span>
        </div>
      </div>
      <p className="text-sm leading-tight font-medium tracking-tight">{card.name}</p>
      <p className="mt-1.5 line-clamp-2 text-[0.78rem] leading-snug text-muted-foreground">
        {card.tagline}
      </p>
    </motion.div>
  );
}

/** Static, no-motion version for reduced-motion users. */
function StaticHero({ cards }) {
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
