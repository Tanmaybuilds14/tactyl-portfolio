"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Splits a headline into words and reveals them with a short stagger.
 * Word-level (not per character) keeps the animation cheap; the full sentence
 * stays available to screen readers through aria-label on the heading.
 */
export function SplitText({
  text,
  accent,
  className,
  wordClassName,
  delay = 0.1,
  stagger = 0.055,
  as = "h1",
}) {
  const reduced = useReducedMotion();
  const Tag = as;
  const words = text.split(" ");
  const accentWords = accent ? accent.split(" ") : [];

  if (reduced) {
    return (
      <Tag className={className}>
        {text} {accent && <span className="text-foreground/60">{accent}</span>}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={accent ? `${text} ${accent}` : text}>
      <motion.span
        className="inline"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
        aria-hidden="true"
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden pb-[0.08em] align-bottom"
          >
            <motion.span
              className={`inline-block ${wordClassName || ""}`}
              variants={{
                hidden: { y: "110%", opacity: 0 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {word}
              {index < words.length - 1 || accent ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
        {accentWords.map((word, index) => (
          <span
            key={`accent-${word}-${index}`}
            className="inline-block overflow-hidden pb-[0.08em] align-bottom"
          >
            <motion.span
              className="shimmer inline-block text-foreground/55"
              variants={{
                hidden: { y: "110%", opacity: 0 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  transition: {
                    duration: 0.75,
                    delay: 0.12 + index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              {word}
              {index < accentWords.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
