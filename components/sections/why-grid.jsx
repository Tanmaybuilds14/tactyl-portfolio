import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";

export function WhyGrid({ cards }) {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Why parents choose Tactyqal"
          title="Seven commitments we can actually keep."
          body="No guarantees about admissions or investment. These are the things the programme controls."
        />

        <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <RevealItem
              key={card.index}
              className="flex flex-col gap-3 bg-background p-6 transition-colors hover:bg-card/60 sm:p-7"
            >
              <span className="font-mono text-[0.7rem] text-muted-foreground">
                {card.index}
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
