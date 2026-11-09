"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { Check } from "lucide-react";

import { SectionHeading } from "@/components/sections/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineDraw } from "@/components/motion/line-draw";

function PhaseDetail({ phase }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="font-label rounded-full border border-foreground/20 px-3 py-1.5 text-foreground/70">
          {phase.weeks}
        </span>
        <span className="font-label text-muted-foreground">{phase.label}</span>
      </div>
      <h3 className="text-2xl leading-tight font-medium tracking-[-0.03em] sm:text-3xl">
        {phase.title}
      </h3>
      <p className="text-[0.98rem] leading-relaxed text-muted-foreground">
        {phase.summary}
      </p>
      <ul className="flex flex-col gap-2.5">
        {phase.outcomes.map((outcome) => (
          <li key={outcome} className="flex items-start gap-2.5 text-sm">
            <Check className="mt-0.5 size-3.5 shrink-0 text-foreground/50" />
            <span className="text-foreground/85">{outcome}</span>
          </li>
        ))}
      </ul>
      <p className="border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground italic">
        {phase.session}
      </p>
    </div>
  );
}

export function Journey({ phases }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState(phases[0]?.id);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(progress, "change", (value) => {
    const next = Math.min(phases.length - 1, Math.max(0, Math.floor(value * phases.length)));
    setActive((current) => (current === next ? current : next));
  });

  return (
    <section id="journey" className="relative border-t border-border bg-background">
      {/* Desktop: sticky scroll timeline */}
      {!reduced && (
        <div ref={ref} className="relative hidden h-[340vh] lg:block">
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-[0.92fr_1.08fr] gap-16 px-8">
              <div className="flex flex-col gap-8">
                <SectionHeading
                  eyebrow="The 8 weeks"
                  title="Four phases. One launched product."
                  body="Each phase has an exit gate. Nothing moves forward until the work exists."
                />

                <div className="relative">
                  <LineDraw className="pointer-events-none absolute top-2 left-[7px] h-[calc(100%-16px)] w-4">
                    <svg
                      viewBox="0 0 16 300"
                      preserveAspectRatio="none"
                      className="h-full w-full"
                      aria-hidden="true"
                    >
                      <path
                        d="M8 0 V300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-foreground/15"
                      />
                      <path
                        data-draw
                        d="M8 0 V300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-foreground/70"
                      />
                    </svg>
                  </LineDraw>

                  <ul className="flex flex-col gap-6 pl-8">
                    {phases.map((phase, index) => {
                      const isActive = index === active;
                      const isDone = index < active;
                      return (
                        <li key={phase.id} className="relative">
                          <span
                            className={`absolute top-2 -left-8 size-2.5 rounded-full border transition-colors duration-300 ${
                              isActive
                                ? "border-foreground bg-foreground"
                                : isDone
                                  ? "border-foreground/60 bg-foreground/60"
                                  : "border-foreground/25 bg-background"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const el = ref.current;
                              if (!el) return;
                              const top = el.offsetTop + (el.offsetHeight * (index + 0.05)) / phases.length;
                              window.scrollTo({ top, behavior: "smooth" });
                            }}
                            className="text-left"
                          >
                            <span
                              className={`font-label block transition-colors ${
                                isActive ? "text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              {phase.label} · {phase.weeks}
                            </span>
                            <span
                              className={`mt-1.5 block text-lg tracking-tight transition-colors ${
                                isActive ? "text-foreground" : "text-muted-foreground/70"
                              }`}
                            >
                              {phase.title}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="h-px w-full bg-border">
                  <motion.div
                    style={{ scaleX: progress }}
                    className="h-px origin-left bg-foreground/70"
                  />
                </div>
              </div>

              <div className="relative">
                {phases.map((phase, index) => (
                  <motion.div
                    key={phase.id}
                    initial={false}
                    animate={{
                      opacity: index === active ? 1 : 0,
                      y: index === active ? 0 : 24,
                      pointerEvents: index === active ? "auto" : "none",
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={index === active ? "relative" : "pointer-events-none absolute inset-0"}
                    aria-hidden={index !== active}
                  >
                    <PhaseDetail phase={phase} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile and reduced-motion: tabs */}
      <div className={`mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24 ${reduced ? "" : "lg:hidden"}`}>
        <SectionHeading
          eyebrow="The 8 weeks"
          title="Four phases. One launched product."
          body="Each phase has an exit gate. Nothing moves forward until the work exists."
        />
        <Tabs value={tab} onValueChange={setTab} className="mt-8">
          <TabsList className="grid h-auto w-full grid-cols-2 gap-1 bg-muted p-1 sm:grid-cols-4">
            {phases.map((phase, index) => (
              <TabsTrigger key={phase.id} value={phase.id} className="h-9">
                {`0${index + 1} · ${phase.title.split(" ")[0]}`}
              </TabsTrigger>
            ))}
          </TabsList>
          {phases.map((phase) => (
            <TabsContent key={phase.id} value={phase.id} className="pt-6">
              <PhaseDetail phase={phase} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
