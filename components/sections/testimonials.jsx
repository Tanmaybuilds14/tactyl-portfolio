"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { useSpotlight } from "@/lib/use-spotlight";

/**
 * Testimonial wall — replaces the swipe carousel.
 *
 * Grid of spotlight cards: cursor-tracked 1px border ring + interior glow,
 * 2px lift, crisp square avatar badges, monospaced role chips. One featured
 * quote spans wide on large screens so the wall is a bento, not a card clone.
 */

const ROLE_GLYPH = { Parent: "PARENT", Student: "STUDENT" };

export function Testimonials({ testimonials }) {
  return (
    <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((item, index) => (
        <RevealItem
          key={item.name}
          className={`h-full ${spanFor(index, testimonials.length)}`}
        >
          <TestimonialCard item={item} featured={index === 0} />
        </RevealItem>
      ))}
      <p className="font-label col-span-full pt-2 text-muted-foreground/70">
        {"// Placeholder quotes — real, consented testimonials land before launch."}
      </p>
    </RevealGroup>
  );
}

function spanFor(index, total) {
  if (index === 0) return "sm:col-span-2 lg:col-span-2";
  if (index !== total - 1) return "";
  const tail = total - 1;
  const remainder = tail % 3;
  return [
    // Featured takes 2 slots in row 1; complete the last row's remainder.
    remainder === 2 ? "lg:col-span-2" : remainder === 1 ? "lg:col-span-3" : "",
    tail % 2 === 1 ? "sm:col-span-2" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function TestimonialCard({ item, featured = false }) {
  const spotlight = useSpotlight();

  // Machine-tag the identity line: cohorts and project names become chips,
  // and the display name drops the redundant "of a Cohort…" tail.
  const cohortTag = /Cohort\s(\d{2})/.exec(item.name)?.[1];
  const projectTag = /,\s*(\w.+)$/.exec(item.name)?.[1];
  const display =
    projectTag
      ? item.name.replace(/,\s*\w.+$/, "")
      : item.name.replace(/\s+of\s+a\s+Cohort\s+\d{2}\s+student/i, "") || item.name;
  const tag = [cohortTag && `COHORT-${cohortTag}`, projectTag && projectTag.toUpperCase()]
    .filter(Boolean);

  return (
    <figure
      {...spotlight}
      className="spot-card group flex h-full flex-col gap-6 rounded-xl border border-border bg-card p-6 transition-[transform,border-color] duration-300 outline-none hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-7"
    >
      <blockquote
        className={`leading-relaxed text-foreground/90 ${
          featured ? "text-lg sm:text-xl" : "text-[0.95rem]"
        }`}
      >
        <span aria-hidden="true" className="font-mono mr-1.5 text-brand-soft/80">
          “
        </span>
        {item.quote}
      </blockquote>

      <figcaption className="mt-auto flex items-center gap-3 border-t border-border/70 pt-4">
        <Avatar className="size-9 rounded-md after:rounded-md">
          <AvatarFallback className="font-mono rounded-md bg-secondary text-[0.6rem] tracking-[0.1em] text-brand-soft">
            {item.initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-sm font-medium text-foreground/95">{display}</span>
          <span className="font-mono min-w-0 truncate text-[0.6rem] tracking-[0.18em] text-muted-foreground">
            [ {tag.length > 0 && (
              <span className="text-brand-soft">{tag.filter(Boolean).join(" · ")}{" "}</span>
            )}
            {ROLE_GLYPH[item.role] || item.role.toUpperCase()} ]
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
