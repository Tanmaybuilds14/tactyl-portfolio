import { CountUp } from "@/components/motion/count-up";

export function StatsStrip({ stats }) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px bg-border lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="flex min-w-0 flex-col gap-1.5 bg-background px-5 py-8 sm:px-8 sm:py-10"
          >
            <span className="font-mono text-2xl font-medium leading-none tracking-[-0.02em] sm:text-3xl">
              <CountUp
                value={stat.value}
                suffix={stat.suffix}
                className="tabular-nums"
              />
              <span className="ml-2 select-none font-mono text-[0.6rem] tracking-[0.14em] text-brand-soft/80">
                [0{index + 1}]
              </span>
            </span>
            <span className="font-label text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
