import Link from "next/link";
import { site, legalLinks } from "@/lib/site";
import { CopyrightYear } from "@/components/site/copyright-year";

const columns = [
  {
    title: "Programme",
    links: [
      { title: "The 8 weeks", href: "/program" },
      { title: "Pricing", href: "/pricing" },
      { title: "Success stories", href: "/success-stories" },
      { title: "About", href: "/about" },
    ],
  },
  {
    title: "Free tools",
    links: [
      { title: "All assessments", href: "/tools" },
      { title: "Startup Idea Generator", href: "/tools/startup-idea-generator" },
      { title: "Fundability Assessment", href: "/tools/fundability-assessment" },
      { title: "Pitch Deck Analyzer", href: "/tools/pitch-deck-analyzer" },
    ],
  },
  {
    title: "Read",
    links: [
      { title: "Blog", href: "/blog" },
      { title: "Method", href: "/blog/category/method" },
      { title: "Stories", href: "/blog/category/stories" },
      { title: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="relative grid size-4 place-items-center bg-brand">
                <span className="absolute inset-y-0 left-0 w-[3px] bg-brand-soft/90" />
              </span>
              <span className="font-mono text-[0.8rem] font-medium tracking-[0.28em]">
                {site.wordmark}
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.tagline}
            </p>
            <div className="mt-2 flex flex-col gap-1 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="w-fit text-foreground/90 underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="w-fit text-muted-foreground">
                {site.phone}
              </a>
              <span className="font-label mt-2 text-muted-foreground">{site.hours}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <p className="font-label text-muted-foreground">{column.title}</p>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/80 underline-offset-4 hover:text-foreground hover:underline"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-label text-muted-foreground">
            © <CopyrightYear /> {site.name}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-label text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  {link.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/studio"
                className="font-label text-muted-foreground/60 underline-offset-4 hover:text-foreground hover:underline"
              >
                Studio
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
