import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-start gap-6 px-5 py-32 sm:px-8">
      <p className="font-label text-muted-foreground">404</p>
      <h1 className="text-4xl leading-tight font-medium tracking-[-0.04em] sm:text-5xl">
        This page did not ship.
      </h1>
      <p className="text-base leading-relaxed text-muted-foreground">
        The link may be old, or the page may have moved. Try the programme, the student work, or
        the blog.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button render={<Link href="/" />} className="rounded-md">
          Back home
        </Button>
        <Button variant="outline" render={<Link href="/blog" />} className="rounded-md">
          Read the blog
        </Button>
      </div>
    </div>
  );
}
