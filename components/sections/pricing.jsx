import Link from "next/link";
import { Check, Minus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/section-heading";
import { pricingPlan } from "@/lib/content/marketing";

export function Pricing({ compact = false }) {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        {!compact && (
          <SectionHeading
            eyebrow="Pricing"
            title="One plan. Everything included."
            body="No upsells, no separate mentor fee. The only extra cost is a tool subscription if your child chooses one with a paid tier."
          />
        )}

        <div className="mt-10 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-xl border border-border bg-card p-7 sm:p-9">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent"
            />
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="font-label text-muted-foreground">{pricingPlan.name}</p>
                <Badge
                  variant="outline"
                  className="font-mono rounded-sm text-[0.6rem] tracking-[0.14em] text-brand-soft"
                >
                  8 WEEKS · 1:1
                </Badge>
              </div>
              <div className="mt-5 flex items-end gap-3">
                <span className="font-mono text-5xl leading-none font-medium tracking-[-0.02em] tabular-nums">
                  {pricingPlan.price}
                </span>
                <span className="font-mono text-lg tabular-nums text-muted-foreground line-through">
                  {pricingPlan.priceWas}
                </span>
                <span className="font-mono ml-1 rounded-sm bg-positive/10 px-1.5 py-1 text-[0.6rem] tracking-[0.12em] text-positive">
                  −36%
                </span>
              </div>
              <p className="font-label mt-2 text-muted-foreground">{pricingPlan.cadence}</p>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {pricingPlan.summary}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                render={<Link href="/contact" />}
                className="h-10 rounded-md px-5 shadow-lg shadow-brand/25"
              >
                Book a free consultation
              </Button>
              <Button
                variant="outline"
                render={<Link href="/refund-policy" />}
                className="h-10 rounded-md px-5"
              >
                Refund policy
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-7 sm:p-9">
            <p className="font-label text-muted-foreground">What is included</p>
            <ul className="mt-5 flex flex-col gap-3">
              {pricingPlan.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-positive" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-label mt-7 text-muted-foreground">Not included</p>
            <ul className="mt-3 flex flex-col gap-2">
              {pricingPlan.excludes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Minus className="mt-0.5 size-4 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
              {pricingPlan.refund}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
