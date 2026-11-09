import { CountUp } from "@/components/motion/count-up";

export function StatsStrip({ stats }) {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px bg-border/60 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex min-w-0 flex-col gap-1.5 bg-background px-5 py-8 sm:px-8 sm:py-10"
          >
            <span className="text-3xl font-medium tracking-[-0.04em] tabular-nums sm:text-4xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="font-label text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
