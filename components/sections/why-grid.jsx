import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";

/**
 * "Why founders + parents choose Tactyqal" — the commitment matrix.
 *
 * Hairline-divided grid (Linear-style spec sheet): monospace index tokens,
 * high-contrast titles, AAA secondary copy. Cells are informational, so the
 * hover response is a surface + token highlight rather than a lift.
 */
export function WhyGrid({ cards }) {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Why founders + parents choose Tactyqal"
          title="Seven commitments we can actually keep."
          body="No guarantees about admissions or investment. These are the things the programme controls."
        />

        <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <RevealItem
              key={card.index}
              className="group/cell flex flex-col gap-3 bg-card p-6 transition-colors duration-200 hover:bg-secondary/70 sm:p-7"
            >
              <span className="font-mono relative flex items-center gap-2 text-[0.65rem] tracking-[0.14em] text-muted-foreground transition-colors duration-200 group-hover/cell:text-brand-soft">
                {card.index}
                <span
                  className="h-px w-6 bg-border transition-colors duration-200 group-hover/cell:bg-brand/60"
                  aria-hidden="true"
                />
                <span className="text-brand-soft/0 transition-colors duration-200 group-hover/cell:text-brand-soft/80">
                  [KEEP]
                </span>
              </span>
              <h3 className="text-lg font-medium tracking-tight">{card.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{card.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
