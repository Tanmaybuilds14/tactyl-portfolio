import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Cta } from "@/components/sections/cta";
import { SectionHeading } from "@/components/sections/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { aboutValues, timeline } from "@/lib/content/marketing";
import { site } from "@/lib/site";

export const metadata = {
  title: "About",
  description:
    "Tactyqal Labs runs an 8-week, 1:1 build programme for teenagers. Who mentors, how the method works, and what we refuse to promise.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-60" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Badge variant="outline" className="font-label border-foreground/20">
            About
          </Badge>
          <h1 className="mt-6 max-w-3xl text-[2.5rem] leading-[1.02] font-medium tracking-[-0.045em] sm:text-6xl">
            We teach teenagers to finish things.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Tactyqal Labs started as a weekend build club. It became an eight-week programme
            because finishing a product — not attending a class — is the part that changes how
            a student sees their own work.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-label text-muted-foreground">The method</p>
            <h2 className="mt-4 text-3xl leading-tight font-medium tracking-[-0.035em]">
              Small scope, real users, honest feedback.
            </h2>
          </div>
          <div className="flex flex-col gap-4 text-[1.02rem] leading-relaxed text-muted-foreground">
            <p>
              Most courses add content. We remove it. Week one is largely an exercise in
              subtraction: which single user, which single job, which single screen.
            </p>
            <p>
              Sessions are 1:1 because feedback only works when it is specific. A mentor who
              has watched the same student for eight weeks can say &ldquo;this feature is not
              working&rdquo; and be understood.
            </p>
            <p>
              We do not promise admissions, investment or a guaranteed outcome. We do promise
              that we will tell you early if the project is not going to ship.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHeading eyebrow="What we optimise for" title="Three things, in order." />
          <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-border/60 sm:grid-cols-3">
            {aboutValues.map((value) => (
              <RevealItem key={value.title} className="flex flex-col gap-3 bg-background p-6">
                <h3 className="text-lg font-medium tracking-tight">{value.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{value.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Who delivers the sessions"
            title="Mentors who ship, not tutors who lecture."
            body="Every mentor is a practising builder. Each student is matched to a mentor working in the area closest to their project."
          />
          <Reveal>
            <ol className="flex flex-col divide-y divide-border border-y border-border">
              {timeline.map((item) => (
                <li key={item.year} className="grid grid-cols-[4rem_1fr] gap-4 py-5">
                  <span className="font-mono text-xs text-muted-foreground">{item.year}</span>
                  <p className="text-sm leading-relaxed">{item.event}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6">
            <div>
              <p className="font-label text-muted-foreground">Still deciding?</p>
              <p className="mt-2 text-lg tracking-tight">
                Read the week-by-week plan, or ask us directly.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button render={<Link href="/program" />} className="rounded-md">
                The programme
                <ArrowUpRight data-icon="inline-end" />
              </Button>
              <Button
                variant="outline"
                render={<Link href={`mailto:${site.email}`} />}
                className="rounded-md"
              >
                {site.email}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
