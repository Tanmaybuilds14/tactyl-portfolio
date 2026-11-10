import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/format";

export function PostCard({ post, compact = false }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full transition-transform duration-300 hover:-translate-y-0.5"
    >
      <Card className="h-full gap-0 py-0 transition-colors group-hover:border-brand/40">
        <div className="relative h-32 overflow-hidden border-b border-border bg-muted">
          {post.image ? (
            <Image
              src={post.image}
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, 360px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="grid-bg absolute inset-0 opacity-80" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <span className="font-mono absolute bottom-3 left-4 text-[0.62rem] tracking-[0.16em] text-white/80">
            [# {post.category?.name?.toUpperCase()}]
          </span>
          <ArrowUpRight className="absolute top-3 right-3 size-4 text-white/50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-soft" />
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
          <div className="font-mono flex items-center gap-2 text-[0.62rem] tracking-[0.12em] text-muted-foreground">
            <time dateTime={post.publishedAt || undefined} className="tabular-nums">
              {formatDate(post.publishedAt)}
            </time>
            <span aria-hidden="true">/</span>
            <span>{post.readingMinutes} MIN READ</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
