import Link from "next/link";
import { Check, Minus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/section-heading";
import { pricingPlan } from "@/lib/content/marketing";

export function Pricing({ compact = false }) {
  return (
    <section className="theme-light border-y border-border bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        {!compact && (
          <SectionHeading
            eyebrow="Pricing"
            title="One plan. Everything included."
            body="No upsells, no separate mentor fee. The only extra cost is a tool subscription if your child chooses one with a paid tier."
            className="text-foreground"
          />
        )}

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-between gap-8 rounded-2xl bg-card p-7 ring-1 ring-foreground/10 sm:p-9">
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="font-label text-muted-foreground">{pricingPlan.name}</p>
                <Badge variant="secondary" className="font-label">
                  8 weeks · 1:1
                </Badge>
              </div>
              <div className="mt-5 flex items-end gap-3">
                <span className="text-5xl leading-none font-medium tracking-[-0.05em]">
                  {pricingPlan.price}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  {pricingPlan.priceWas}
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
                className="h-11 rounded-full px-6"
              >
                Book a free consultation
              </Button>
              <Button
                variant="outline"
                render={<Link href="/refund-policy" />}
                className="h-11 rounded-full px-6"
              >
                Refund policy
              </Button>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-7 ring-1 ring-foreground/10 sm:p-9">
            <p className="font-label text-muted-foreground">What is included</p>
            <ul className="mt-5 flex flex-col gap-3">
              {pricingPlan.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-foreground/60" />
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
