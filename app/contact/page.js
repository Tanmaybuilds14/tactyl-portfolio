import Link from "next/link";
import { Clock, Mail, Phone, ArrowUpRight } from "lucide-react";

import { ContactForm } from "@/components/sections/contact-form";
import { SectionHeading } from "@/components/sections/section-heading";
import { Faq } from "@/components/sections/faq";
import { Badge } from "@/components/ui/badge";
import { faqs } from "@/lib/content/marketing";
import { site } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description:
    "Book a free 20-minute consultation for the 8-week programme, or ask a question by email or phone.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,oklch(1_0_0/0.08),transparent_55%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <Badge variant="outline" className="font-label border-foreground/20">
            Free consultation
          </Badge>
          <h1 className="mt-6 max-w-2xl text-[2.5rem] leading-[1.02] font-medium tracking-[-0.045em] sm:text-5xl">
            Tell us what your kid wants to build.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            A mentor replies within one working day to arrange a 20-minute call. No sales
            sequence, no automatic enrolment.
          </p>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
        <ContactForm />

        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-label text-muted-foreground">Direct</p>
            <ul className="mt-4 flex flex-col gap-4">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-sm hover:underline hover:underline-offset-4"
                >
                  <Mail className="size-4 text-muted-foreground" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm hover:underline hover:underline-offset-4"
                >
                  <Phone className="size-4 text-muted-foreground" />
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="size-4" />
                {site.hours}
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-label text-muted-foreground">What the call covers</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li>— One problem your child cares about</li>
              <li>— Whether it can ship in eight weeks</li>
              <li>— Schedule, price and what is included</li>
              <li>— An honest answer if it is not a fit</li>
            </ul>
            <Link
              href="/program"
              className="mt-5 inline-flex items-center gap-1.5 text-sm underline underline-offset-4"
            >
              Read the programme first
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          <p className="px-2 text-xs leading-relaxed text-muted-foreground">
            We collect only what is needed to reply. Details about students under 18 are shared
            with a parent or guardian. See the{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              privacy note
            </Link>
            .
          </p>
        </aside>
      </div>

      <section className="border-t border-border bg-background">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Before you ask" title="The common questions." />
          <Faq faqs={faqs.slice(0, 6)} />
        </div>
      </section>
    </>
  );
}
