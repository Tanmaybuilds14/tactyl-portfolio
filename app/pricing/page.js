import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { faqs, pricingPlan } from "@/lib/content/marketing";

export const metadata = {
  title: "Pricing",
  description:
    "One plan for the 8-week programme: 16 live 1:1 sessions, two build clinics a week, demo day and one month of post-launch support.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-60" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <Badge variant="outline" className="font-label border-foreground/20">
            One plan · no upsells
          </Badge>
          <h1 className="mx-auto mt-6 max-w-3xl text-[2.5rem] leading-[1.02] font-medium tracking-[-0.045em] sm:text-6xl">
            {pricingPlan.price} for the whole eight weeks.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Was {pricingPlan.priceWas}. Payment plans are available — ask on the call, not
            after you have paid.
          </p>
        </div>
      </section>

      <Pricing compact />

      <section className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            eyebrow="Before you pay"
            title="The fine print, in plain language."
            body="If any of this is unclear, ask before the first session. We would rather answer than refund."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
              <p className="font-label text-muted-foreground">Money back</p>
              <p className="text-sm leading-relaxed">{pricingPlan.refund}</p>
              <Link
                href="/refund-policy"
                className="mt-auto inline-flex w-fit items-center gap-1.5 text-sm underline underline-offset-4"
              >
                Read the refund policy
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
            <Faq faqs={faqs.slice(0, 5)} />
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Questions about cost"
        title="Ask before you commit."
        body="We will tell you what the programme includes, what it does not, and when a refund applies."
      />
    </>
  );
}
