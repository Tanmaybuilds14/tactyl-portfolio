"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Counts up once when the stat enters view. */
export function CountUp({ value, suffix = "", prefix = "", duration = 1.6, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [animated, setAnimated] = useState(0);

  // `reduced` is false during hydration, so both renders start at 0.
  const display = reduced ? value : animated;

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setAnimated(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
