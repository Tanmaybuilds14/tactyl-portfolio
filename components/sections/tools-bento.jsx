"use client";

import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { useSpotlight } from "@/lib/use-spotlight";

/**
 * Free Tools — interactive Bento Grid.
 *
 * Every tool is a bento cell with an inline preview of the assessment's
 * structure. Hover/Focus drives: a 1px cursor-tracked gradient border ring,
 * an interior spotlight, a 2px lift, and the preview rows' stagger response.
 * Metadata is monospaced and machine-tagged: [IDEATION], [FREE ACCESS], 05:00.
 */

const CATEGORY_ORDER = ["ideation", "validation", "team", "storytelling", "self-assessment", "growth"];

/** Span pattern that always completes the 3-col (and 2-col) grid rows. */
function spanFor(index, total) {
  if (index === 0) return "sm:col-span-2 lg:col-span-2";
  if (index !== total - 1) return "";
  const tail = total - 1;
  const high3 = tail % 3;
  const high2 = tail % 2;
  return [
    high3 === 1 ? "lg:col-span-3" : high3 === 2 ? "lg:col-span-2" : "",
    high2 === 1 ? "sm:col-span-2" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function ToolsBento({ tools, limit }) {
  const items = limit ? tools.slice(0, limit) : tools;

  return (
    <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((tool, index) => (
        <RevealItem
          key={tool.slug}
          className={`h-full ${spanFor(index, items.length)}`}
        >
          <ToolCell tool={tool} featured={index === 0} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

function ToolCell({ tool, featured = false }) {
  const spotlight = useSpotlight();

  return (
    <Link
      {...spotlight}
      href={`/tools/${tool.slug}`}
      aria-label={`${tool.name} — free tool, ${tool.minutes} minutes`}
      className="spot-card group flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-[transform,border-color] duration-300 outline-none hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[0.6rem] tracking-[0.18em] text-brand-soft">
          [{tool.category.toUpperCase()}]
        </span>
        <span className="flex items-center gap-1.5">
          <span className="font-mono text-[0.6rem] tabular-nums text-muted-foreground">
            {String(tool.minutes).padStart(2, "0")}:00
          </span>
          <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-soft" />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <h3 className="text-base font-medium tracking-tight sm:text-lg">
          {tool.name}
          {featured && (
            <span className="font-mono ml-2 align-middle text-[0.6rem] text-muted-foreground">
              {"// START HERE"}
            </span>
          )}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{tool.blurb}</p>
      </div>

      <PreviewPanel tool={tool} featured={featured} />

      <div className="flex items-center justify-between border-t border-border/70 pt-3">
        <span className="font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground">
          [FREE ACCESS]
        </span>
        <span className="font-mono text-[0.6rem] tracking-[0.14em] text-muted-foreground/80 transition-colors duration-300 group-hover:text-positive">
          NO ACCOUNT
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Per-tool previews — honest wireframes of each assessment's output.  */
/* ------------------------------------------------------------------ */

function PreviewPanel({ tool, featured }) {
  const kind = CATEGORY_ORDER.includes(tool.category.toLowerCase())
    ? tool.category.toLowerCase()
    : "rows";

  return (
    <div
      className={`rounded-lg border border-border bg-canvas/70 px-3.5 py-3 ${
        featured ? "flex-1" : ""
      }`}
      aria-hidden="true"
    >
      <div className="font-mono mb-2.5 flex items-center justify-between text-[0.55rem] tracking-[0.2em] text-muted-foreground/70">
        <span className="transition-colors duration-300 group-hover:text-brand-soft">
          PREVIEW
        </span>
        <span>STRUCTURE</span>
      </div>
      {kind === "validation" && <ValidationPreview tool={tool} />}
      {kind === "team" && <TeamPreview />}
      {kind === "storytelling" && <StoryPreview />}
      {kind === "self-assessment" && <TraitsPreview />}
      {kind === "growth" && <GrowthPreview />}
      {(kind === "ideation" || kind === "rows") && <RowsPreview tool={tool} />}
    </div>
  );
}

const rowShift = (i) => ({
  transitionDelay: `${i * 45}ms`,
});

/** Numbered output rows — driven by the tool's own whatYouGet copy. */
function RowsPreview({ tool }) {
  return (
    <ul className="flex flex-col gap-2">
      {tool.whatYouGet.slice(0, 3).map((item, i) => (
        <li
          key={item}
          style={rowShift(i)}
          className="font-mono flex items-baseline gap-2.5 text-[0.68rem] text-muted-foreground transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-foreground/80"
        >
          <span className="text-brand-soft/70">0{i + 1}</span>
          <span className="min-w-0 truncate">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Score bars — the fundability / problem-solution readouts. */
function ValidationPreview({ tool }) {
  const isFit = tool.slug === "problem-solution-fit";
  const axes = isFit
    ? [{ label: "FIT", width: 0.72 }]
    : [
        { label: "MARKET", width: 0.72 },
        { label: "WEDGE", width: 0.55 },
        { label: "EVIDENCE", width: 0.38 },
      ];
  return (
    <ul className="flex flex-col gap-2.5">
      {axes.map((axis, i) => (
        <li
          key={axis.label}
          style={rowShift(i)}
          className="flex items-center gap-2.5 transition-[color,transform] duration-300 group-hover:translate-x-1"
        >
          <span className="font-mono w-[5.2rem] text-[0.6rem] tracking-[0.12em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
            {axis.label}
          </span>
          <span className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
            <span
              className="block h-full rounded-full bg-brand/80 transition-[width,background-color] duration-500 group-hover:bg-brand-soft"
              style={{ width: `${axis.width * 100}%` }}
            />
          </span>
        </li>
      ))}
      {!isFit && (
        <li className="font-mono text-[0.6rem] tracking-[0.1em] text-muted-foreground/80 transition-colors duration-300 group-hover:text-positive">
          → weakest assumption flagged first
        </li>
      )}
    </ul>
  );
}

/** Role coverage matrix with the gap that stalls week five. */
function TeamPreview() {
  const roles = ["BUILD", "DESIGN", "MARKET", "SHIP"];
  const gapIndex = 2;
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {roles.map((role, i) => {
        const isGap = i === gapIndex;
        return (
          <span
            key={role}
            style={rowShift(i)}
            className={`font-mono flex items-center justify-between rounded-md border px-2 py-1.5 text-[0.6rem] tracking-[0.12em] transition-colors duration-300 group-hover:translate-x-0.5 ${
              isGap
                ? "border-dashed border-muted-foreground/40 text-muted-foreground"
                : "border-border bg-secondary/60 text-foreground/75"
            }`}
          >
            {role}
            {isGap && <span className="text-[0.5rem] text-brand-soft">GAP</span>}
          </span>
        );
      })}
    </div>
  );
}

/** Slide-by-slide structural pass; the fluff gets cut. */
function StoryPreview() {
  const slides = [
    ["S01", "hook", null],
    ["S02", "wedge", null],
    ["S03", "appendix", "CUT"],
    ["S04", "ask", null],
  ];
  return (
    <ul className="flex flex-col gap-1.5">
      {slides.map(([id, label, tag], i) => (
        <li
          key={id}
          style={rowShift(i)}
          className="font-mono flex items-baseline gap-2.5 text-[0.68rem] text-muted-foreground transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-foreground/80"
        >
          <span className="text-brand-soft/70">{id}</span>
          <span className={`min-w-0 ${tag === "CUT" ? "line-through opacity-60" : ""}`}>
            {label}
          </span>
          {tag && (
            <span className="ml-auto text-[0.5rem] tracking-[0.2em] text-brand-soft">
              [{tag}]
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/** Ten builder traits; the strongest two surface. */
function TraitsPreview() {
  const traits = ["follow-through", "focus", "honesty", "asking for help"];
  const strong = [0, 3];
  return (
    <div className="flex flex-wrap gap-1.5">
      {traits.map((trait, i) => {
        const isStrong = strong.includes(i);
        return (
          <span
            key={trait}
            style={rowShift(i)}
            className={`font-mono rounded-md border px-2 py-1 text-[0.6rem] tracking-[0.1em] transition-colors duration-300 group-hover:-translate-y-px ${
              isStrong
                ? "border-brand/50 bg-brand/10 text-brand-soft"
                : "border-border bg-secondary/60 text-muted-foreground"
            }`}
          >
            {trait}
          </span>
        );
      })}
    </div>
  );
}

/** Page blocks scored for clarity / proof / next step. */
function GrowthPreview() {
  const blocks = [
    ["HERO", "FIX"],
    ["PROOF", "OK"],
    ["CTA", "OK"],
  ];
  return (
    <ul className="flex flex-col gap-1.5">
      {blocks.map(([label, tag], i) => (
        <li
          key={label}
          style={rowShift(i)}
          className={`font-mono flex items-center justify-between rounded-md border px-2.5 py-1.5 text-[0.6rem] tracking-[0.12em] transition-[color,transform] duration-300 group-hover:translate-x-1 ${
            tag === "FIX"
              ? "border-brand/40 text-brand-soft"
              : "border-border text-muted-foreground"
          }`}
        >
          {label}
          <span className={tag === "FIX" ? "text-brand-soft" : "text-positive"}>
            [{tag}]
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ToolsTeaser() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button render={<Link href="/tools" />} variant="outline" className="rounded-md">
        All eight assessments
        <ArrowUpRight data-icon="inline-end" />
      </Button>
      <span className="font-label flex items-center gap-1.5 text-muted-foreground">
        <Clock className="size-3" />under 10 min each
      </span>
    </div>
  );
}
