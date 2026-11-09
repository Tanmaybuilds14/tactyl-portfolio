"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { ArrowDown, ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

/**
 * Perspective Tunnel Hero — 21st.dev/@daiwiikharihar/perspective-tunnel-hero.
 *
 * Ported to this project's setup: JavaScript instead of TSX, and `motion/react`
 * (the package already in the app) rather than a second framer-motion install.
 * The mechanics are unchanged: cards sit on a golden-angle spiral, fly down the
 * Z axis on a spring-smoothed progress value driven by the wheel, and pan with
 * the pointer. Accent colours are remapped from indigo to the Graphite Mono
 * tokens, and the photos are replaced by the real case-study cards.
 */
const GOLDEN_ANGLE_STEP = 137.5;
const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };
const WHEEL_SPEED = 0.0008;

function buildTunnelCards(cards) {
  return cards.map((item, i) => {
    const goldenAngle = i * GOLDEN_ANGLE_STEP * (Math.PI / 180);

    return {
      item,
      angleCos: Math.cos(goldenAngle),
      angleSin: Math.sin(goldenAngle),
      radiusFactorX: 0.28 + (i % 3) * 0.08,
      radiusFactorY: 0.26 + (i % 2) * 0.09,
      rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
      index: i,
    };
  });
}

function useCameraParallax(enabled) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event) => {
      rawX.set((event.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

function TunnelCard({ card, progress, pointer, total, stage }) {
  const staggerSpan = 0.55;
  const start = (card.index / total) * (1 - staggerSpan);
  const end = start + staggerSpan;

  const localProgress = useTransform(progress, [start, end], [0, 1]);

  const farZ = stage.isMobile ? -1200 : -1700;
  const nearZ = stage.isMobile ? 350 : 500;
  const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

  const opacity = useTransform(localProgress, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);

  const cardWidth = stage.isMobile
    ? Math.max(130, Math.min(180, stage.width * 0.38))
    : Math.max(180, Math.min(270, stage.width * 0.18));

  const baseX = card.angleCos * (stage.width * card.radiusFactorX);
  const baseY = card.angleSin * (stage.height * card.radiusFactorY);
  const panStrength = stage.isMobile ? 20 : 45;

  const transform = useTransform(
    [z, pointer.x, pointer.y],
    ([currentZ, pointerX, pointerY]) => {
      const offsetX = baseX - pointerX * panStrength;
      const offsetY = baseY - pointerY * panStrength;
      return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currentZ}px) rotateZ(${card.rotationZ}deg)`;
    },
  );

  return (
    <motion.div
      style={{ width: cardWidth, transform, opacity, zIndex: card.index + 1 }}
      className="pointer-events-auto absolute top-1/2 left-1/2 aspect-[4/5] cursor-pointer will-change-transform select-none"
    >
      <Link
        href={`/success-stories/${card.item.slug}`}
        className="group relative block h-full w-full overflow-hidden rounded-2xl bg-card shadow-2xl shadow-black/50 ring-1 ring-foreground/12 transition-all duration-500 hover:ring-foreground/45"
      >
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-br ${card.item.accent} via-card to-card`}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,oklch(1_0_0/0.14),transparent_62%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/0.05)_1px,transparent_1px)] [background-size:26px_26px]"
        />

        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          <span className="font-label text-foreground/60">{card.item.category}</span>
          <span className="font-mono text-[0.62rem] text-foreground/40">{card.item.year}</span>
        </div>

        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-4 sm:p-5">
          <div>
            <span className="block text-lg leading-tight font-medium tracking-tight text-white sm:text-xl">
              {card.item.name}
            </span>
            <span className="font-label mt-1 block text-white/70">
              {card.item.metric} {card.item.metricLabel}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PerspectiveTunnelHero({
  cards,
  eyebrow = "8-week 1:1 programme",
  title = "Empower your kid to build the next app that",
  accent = "impacts millions.",
  description = "In eight weeks, one student and one mentor take a real problem from interview to a launched product.",
  promptLabel = "Scroll to fly through the work",
}) {
  const containerRef = useRef(null);

  const [stage, setStage] = useState({
    width: 1440,
    height: 900,
    isMobile: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setStage({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Read by the wheel handler; smoothed for the card transforms.
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.0001,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (event) => {
      const current = rawProgress.get();
      const atStart = current <= 0 && event.deltaY < 0;
      const atEnd = current >= 1 && event.deltaY > 0;

      // At either edge let the page scroll normally instead of trapping it.
      if (atStart || atEnd) return;

      event.preventDefault();
      const next = Math.min(1, Math.max(0, current + event.deltaY * WHEEL_SPEED));
      rawProgress.set(next);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [rawProgress]);

  const pointer = useCameraParallax(true);
  const tunnelCards = buildTunnelCards(cards);

  const titleScale = useTransform(smoothProgress, [0, 0.5, 1], [0.72, 1, 1.18]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.12, 0.85, 1], [0.25, 1, 1, 0]);
  const promptOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-background text-foreground select-none"
      style={{
        perspective: stage.isMobile ? "900px" : "1200px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Background grid & glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(oklch(1_0_0/0.12)_1px,transparent_1px)] [background-size:28px_28px] opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(1_0_0/0.08)_0%,transparent_70%)]" />

      {/* Depth ring guides */}
      <div className="pointer-events-none absolute h-[48vmin] w-[48vmin] rounded-full border border-foreground/12" />
      <div className="pointer-events-none absolute h-[76vmin] w-[76vmin] rounded-full border border-dashed border-foreground/10" />

      {/* Central anchor typography */}
      <motion.div
        style={{ scale: titleScale, opacity: titleOpacity }}
        className="pointer-events-none z-0 flex max-w-2xl flex-col items-center px-6 text-center"
      >
        <p className="font-label text-foreground/50">{eyebrow} · Ages 13–18</p>
        <h1 className="mt-5 text-4xl leading-[0.95] font-medium tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl">
          {title}{" "}
          <span className="bg-gradient-to-b from-foreground via-foreground/80 to-foreground/35 bg-clip-text text-transparent">
            {accent}
          </span>
        </h1>
        <p className="mt-5 max-w-[42ch] text-sm leading-relaxed font-light text-muted-foreground sm:text-base">
          {description}
        </p>

        <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/contact" className={buttonVariants({ className: "h-11 rounded-full px-6 text-sm" })}>
            Book a free consultation
            <ArrowUpRight data-icon="inline-end" />
          </Link>
          <Link
            href="/success-stories"
            className={buttonVariants({
              variant: "outline",
              className: "h-11 rounded-full border-foreground/20 px-6 text-sm",
            })}
          >
            See student work
          </Link>
        </div>
      </motion.div>

      {/* Scroll prompt */}
      <motion.div
        style={{ opacity: promptOpacity }}
        className="pointer-events-none absolute bottom-8 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-label text-muted-foreground">{promptLabel}</span>
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <ArrowDown className="size-3.5 animate-bounce" />
          <div className="h-6 w-px bg-gradient-to-b from-foreground/50 to-transparent" />
        </div>
      </motion.div>

      {/* 3D Z-space plane */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        {tunnelCards.map((card) => (
          <TunnelCard
            key={card.item.slug}
            card={card}
            progress={smoothProgress}
            pointer={pointer}
            total={tunnelCards.length}
            stage={stage}
          />
        ))}
      </div>
    </div>
  );
}
