import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { legalPages } from "@/lib/content/legal";

export function LegalPage({ slug }) {
  const page = legalPages[slug];

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Link
        href="/"
        className="font-label inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to site
      </Link>
      <h1 className="mt-8 text-4xl leading-[1.05] font-medium tracking-[-0.04em] sm:text-5xl">
        {page.title}
      </h1>
      <p className="font-label mt-4 text-muted-foreground">Last updated {page.updated}</p>
      <p className="mt-8 text-[1.05rem] leading-relaxed text-muted-foreground">{page.intro}</p>

      <div className="mt-12 flex flex-col gap-10">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-medium tracking-tight">{section.heading}</h2>
            <div className="mt-3 flex flex-col gap-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[0.98rem] leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-14 border-t border-border pt-6 text-sm text-muted-foreground">
        Questions about this page? Email{" "}
        <a href="mailto:hello@tactyqal.com" className="underline underline-offset-4">
          hello@tactyqal.com
        </a>
        .
      </p>
    </article>
  );
}
