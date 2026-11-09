import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import { ToolLeadForm } from "@/components/sections/tool-lead-form";
import { Cta } from "@/components/sections/cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tools, getTool } from "@/lib/content/tools";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: tool.name,
    description: tool.blurb,
    alternates: { canonical: `/tools/${slug}` },
  };
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const related = tools.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,oklch(1_0_0/0.07),transparent_55%)]" />
        <div className="relative mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
          <Link
            href="/tools"
            className="font-label inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            All tools
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="font-label">
              {tool.category}
            </Badge>
            <span className="font-label text-muted-foreground">
              {tool.minutes} min · free
            </span>
          </div>
          <h1 className="mt-5 text-4xl leading-[1.03] font-medium tracking-[-0.045em] sm:text-5xl">
            {tool.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {tool.blurb}
          </p>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-5xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-8">
          <section>
            <p className="font-label text-muted-foreground">What you get</p>
            <ul className="mt-4 flex flex-col gap-3">
              {tool.whatYouGet.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.98rem]">
                  <Check className="mt-1 size-4 shrink-0 text-foreground/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <p className="font-label text-muted-foreground">Best for</p>
            <p className="mt-3 text-[0.98rem] leading-relaxed">{tool.goodFor}</p>
          </section>

          <section>
            <p className="font-label text-muted-foreground">What happens next</p>
            <ol className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <li>1. Add your email and we send the assessment link.</li>
              <li>2. Answer the questions — no account, no payment.</li>
              <li>3. Get the result with the reasoning shown, not just a score.</li>
            </ol>
          </section>
        </div>

        <div>
          <Card className="gap-0 py-0">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium tracking-tight">Get the assessment</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                One email with the link. No newsletter unless you ask for it.
              </p>
              <ToolLeadForm toolName={tool.name} toolSlug={tool.slug} />
            </CardContent>
          </Card>

          <div className="mt-6">
            <p className="font-label text-muted-foreground">Related assessments</p>
            <ul className="mt-3 flex flex-col divide-y divide-border border-y border-border">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/tools/${item.slug}`}
                    className="flex items-center justify-between py-3 text-sm hover:underline hover:underline-offset-4"
                  >
                    {item.name}
                    <span className="font-mono text-[0.65rem] text-muted-foreground">
                      {item.minutes} min
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Button
              variant="ghost"
              render={<Link href="/tools" />}
              className="mt-4 rounded-full"
            >
              All tools
            </Button>
          </div>
        </div>
      </div>

      <Cta />
    </>
  );
}
