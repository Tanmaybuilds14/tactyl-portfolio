"use client";

import { useCallback, useRef } from "react";

/**
 * Cursor-spotlight driver for .spot-card surfaces.
 *
 * Writes the pointer position into CSS custom properties (--mx/--my) on the
 * element itself; all lighting is pure CSS (see .spot-card in globals.css), so
 * there is no per-frame React state. Listeners are skipped on touch devices
 * and under prefers-reduced-motion.
 */
export function useSpotlight() {
  const ref = useRef(null);

  const onMouseMove = useCallback((event) => {
    const el = ref.current;
    if (!el || event.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
