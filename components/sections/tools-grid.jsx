import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ToolsGrid({ tools, limit }) {
  const items = limit ? tools.slice(0, limit) : tools;

  return (
    <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((tool) => (
        <RevealItem key={tool.slug}>
          <Link
            href={`/tools/${tool.slug}`}
            className="group flex h-full flex-col justify-between gap-8 rounded-2xl border border-border bg-card p-5 transition-all hover:border-foreground/25 hover:bg-card/80"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <Badge variant="outline" className="font-label border-border/80">
                  {tool.category}
                </Badge>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <h3 className="text-base font-medium tracking-tight">{tool.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{tool.blurb}</p>
            </div>
            <span className="font-label flex items-center gap-1.5 text-muted-foreground">
              <Clock className="size-3" />0{tool.minutes} min · free
            </span>
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export function ToolsTeaser() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button render={<Link href="/tools" />} variant="outline" className="rounded-full">
        All eight assessments
        <ArrowUpRight data-icon="inline-end" />
      </Button>
    </div>
  );
}
