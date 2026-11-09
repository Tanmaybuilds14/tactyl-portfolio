"use client";

import { useEffect, useRef } from "react";
import { animate, onScroll, svg } from "animejs";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * anime.js line drawing.
 *
 * Motion handles the React-friendly scroll work (progress, sticky panels,
 * reveals); anime.js is kept for what it is best at here — drawing SVG paths.
 * `onScroll({ sync: true })` ties the draw progress to the scroll position, so
 * the connector line fills as the section is read.
 */
export function LineDraw({ children, className, duration = 2400 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;

    const paths = root.querySelectorAll("[data-draw]");
    if (!paths.length) return;

    const drawables = svg.createDrawable(paths);
    const animations = drawables.map((drawable) =>
      animate(drawable, {
        draw: ["0 0", "0 1"],
        duration,
        ease: "inOutQuad",
        autoplay: onScroll({
          target: root,
          enter: "bottom 88%",
          leave: "top 20%",
          sync: true,
        }),
      })
    );

    return () => {
      animations.forEach((animation) => {
        try {
          animation.revert();
        } catch {
          /* animation already removed */
        }
      });
    };
  }, [reduced, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
