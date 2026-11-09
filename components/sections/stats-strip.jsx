import { CountUp } from "@/components/motion/count-up";

export function StatsStrip({ stats }) {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-x divide-border/60 px-5 sm:px-8 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-1 py-8 sm:py-10 ${
              index > 1 ? "border-t border-border/60 lg:border-t-0" : ""
            } ${index % 2 === 1 ? "pl-5 sm:pl-8" : "pr-5 sm:pr-8"}`}
          >
            <span className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="font-label text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
