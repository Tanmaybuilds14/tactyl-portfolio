import Link from "next/link";
import { ArrowUpRight, Check, X } from "lucide-react";

import { Journey } from "@/components/sections/journey";
import { Cta } from "@/components/sections/cta";
import { SectionHeading } from "@/components/sections/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { programPhases, sampleWeek, whoItsFor, notFor } from "@/lib/content/program";
import { pricingPlan } from "@/lib/content/marketing";
import { site } from "@/lib/site";

export const metadata = {
  title: "The 8-week programme",
  description:
    "Week by week: research, design, build and launch. Sixteen 1:1 mentor sessions, two build clinics a week, and a deployed product at the end.",
  alternates: { canonical: "/program" },
};

export default function ProgramPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-60" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Badge variant="outline" className="font-label border-foreground/20">
            8 weeks · 1:1 · Ages 13–18
          </Badge>
          <h1 className="mt-6 max-w-3xl text-[2.5rem] leading-[1.02] font-medium tracking-[-0.045em] sm:text-6xl">
            A programme that ends with something on the internet, built by your kid.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Four phases, sixteen live sessions and a launch. The exit gate is a deployed app
            with real users — we cut scope until that is achievable, not extend the timeline.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button render={<Link href="/contact" />} className="h-10 rounded-md px-5 shadow-lg shadow-brand/25">
              Book a free consultation
              <ArrowUpRight data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              render={<Link href="/pricing" />}
              className="h-10 rounded-md px-5"
            >
              {site.price} · see pricing
            </Button>
          </div>
        </div>
      </section>

      <Journey phases={programPhases} />

      <section className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            eyebrow="A sample week"
            title="Four touchpoints, every week."
            body="Sessions are fixed before the programme starts so the eight weeks stay predictable for the whole family."
          />
          <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
            {sampleWeek.map((item) => (
              <RevealItem key={item.day} className="flex flex-col gap-2 bg-background p-6">
                <div className="flex items-center justify-between">
                  <span className="font-label text-muted-foreground">{item.day}</span>
                  <span className="font-mono text-[0.65rem] text-muted-foreground">
                    {item.duration}
                  </span>
                </div>
                <h3 className="text-base font-medium tracking-tight">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full">
              <CardContent className="flex flex-col gap-4">
                <p className="font-label text-muted-foreground">This is a good fit if</p>
                <ul className="flex flex-col gap-3">
                  {whoItsFor.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-foreground/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="h-full">
              <CardContent className="flex flex-col gap-4">
                <p className="font-label text-muted-foreground">Not a good fit if</p>
                <ul className="flex flex-col gap-3">
                  {notFor.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <X className="mt-0.5 size-4 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                  {pricingPlan.refund}
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      <Cta
        eyebrow="Ready when you are"
        title="Twenty minutes, no pitch."
        body="We will tell you honestly whether the programme suits your child's project and schedule — including when the answer is no."
      />
    </>
  );
}
