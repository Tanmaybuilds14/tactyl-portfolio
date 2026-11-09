import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/format";

const coverStyles = {
  tunnel: "from-neutral-400/25 via-neutral-600/10",
  grid: "from-zinc-400/20 via-zinc-700/10",
  rings: "from-stone-400/25 via-stone-600/10",
};

export function PostCard({ post, compact = false }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className="h-full gap-0 py-0 transition-colors group-hover:border-foreground/25">
        <div
          className={`relative h-32 overflow-hidden border-b border-border bg-gradient-to-br ${
            coverStyles[post.cover] || coverStyles.grid
          } to-transparent`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(1_0_0/0.14),transparent_55%)]" />
          <span className="font-label absolute bottom-3 left-4 text-foreground/70">
            {post.category?.name}
          </span>
          <ArrowUpRight className="absolute top-3 right-3 size-4 text-foreground/50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <CardHeader className="pt-5">
          <CardTitle className="text-base leading-snug font-medium tracking-tight">
            {post.title}
          </CardTitle>
          {!compact && (
            <CardDescription className="line-clamp-2 text-[0.82rem] leading-relaxed">
              {post.excerpt}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="mt-auto pb-5">
          <div className="font-label flex items-center gap-2 text-muted-foreground">
            <time dateTime={post.publishedAt || undefined}>
              {formatDate(post.publishedAt)}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
