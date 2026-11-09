"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useMotionValue,
  useScroll,
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
 * The golden-angle spiral, card sizing, stagger and spring values are the
 * original component's.
 *
 * Behaviour: page scroll flies the cards down the Z axis through a sticky
 * viewport; when the corridor is nearly spent the headline and CTAs fade in and
 * stay up while the rest of the hero scrolls away. Scroll works on touch too.
 */
const GOLDEN_ANGLE_STEP = 137.5;
const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

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
      className="pointer-events-none absolute top-1/2 left-1/2 aspect-[4/5] select-none"
    >
      <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-card shadow-2xl shadow-black/50 ring-1 ring-foreground/12">
        {card.item.image ? (
          <Image
            src={card.item.image}
            alt=""
            fill
            sizes="270px"
            className="object-cover object-top"
          />
        ) : (
          <div
            aria-hidden="true"
            className={`absolute inset-0 bg-gradient-to-br ${card.item.accent} via-card to-card`}
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10"
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
      </div>
    </motion.div>
  );
}

export default function PerspectiveTunnelHero({
  cards,
  eyebrow = "8-week 1:1 programme · Ages 13–18",
  title = "Empower your kid to build the next app that",
  accent = "impacts millions.",
  description = "In eight weeks, one student and one mentor take a real problem from interview to a launched product.",
}) {
  const sectionRef = useRef(null);
  const [stage, setStage] = useState({
    width: 1440,
    height: 900,
    isMobile: false,
  });
  const [copyInteractive, setCopyInteractive] = useState(false);

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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Start a little way into the corridor so the first frame has cards in view.
  const tunnelProgress = useTransform(progress, [0, 1], [0.2, 1]);

  useMotionValueEvent(progress, "change", (value) => {
    const next = value >= 0.82;
    setCopyInteractive((current) => (current === next ? current : next));
  });

  const copyOpacity = useTransform(progress, [0.78, 0.95], [0, 1]);
  const copyY = useTransform(progress, [0.78, 0.95], [28, 0]);
  const copyScale = useTransform(progress, [0.78, 0.95], [0.97, 1]);
  const hintOpacity = useTransform(progress, [0, 0.08], [1, 0]);

  const pointer = useCameraParallax(true);
  const tunnelCards = buildTunnelCards(cards);

  return (
    <section ref={sectionRef} className="relative h-[240svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-background text-foreground select-none">
        <div
          className="absolute inset-0"
          style={{
            perspective: stage.isMobile ? "900px" : "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Background grid & glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(oklch(1_0_0/0.12)_1px,transparent_1px)] [background-size:28px_28px] opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(1_0_0/0.08)_0%,transparent_70%)]" />

          {/* Depth ring guides */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[48vmin] w-[48vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/12" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[76vmin] w-[76vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-foreground/10" />

          {/* 3D Z-space plane */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {tunnelCards.map((card) => (
              <TunnelCard
                key={card.item.slug}
                card={card}
                progress={tunnelProgress}
                pointer={pointer}
                total={tunnelCards.length}
                stage={stage}
              />
            ))}
          </div>
        </div>

        {/* Copy, revealed as the flight ends */}
        <motion.div
          style={{
            opacity: copyOpacity,
            y: copyY,
            scale: copyScale,
            pointerEvents: copyInteractive ? "auto" : "none",
          }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <div className="flex max-w-2xl flex-col items-center">
            <p className="font-label text-foreground/50">{eyebrow}</p>
            <h1 className="mt-5 text-4xl leading-[0.95] font-medium tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl">
              {title}{" "}
              <span className="bg-gradient-to-b from-foreground via-foreground/80 to-foreground/35 bg-clip-text text-transparent">
                {accent}
              </span>
            </h1>
            <p className="mt-5 max-w-[42ch] text-sm leading-relaxed font-light text-muted-foreground sm:text-base">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className={buttonVariants({ className: "h-11 rounded-full px-6 text-sm" })}
              >
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
          </div>
        </motion.div>

        {/* Scroll hint, gone once the flight starts */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2"
        >
          <span className="font-label text-muted-foreground">Scroll to fly through the work</span>
          <ArrowDown className="size-3.5 animate-bounce text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}
