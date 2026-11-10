"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-start gap-6 px-5 py-32 sm:px-8">
      <p className="font-label text-muted-foreground">Something broke</p>
      <h1 className="text-3xl leading-tight font-medium tracking-[-0.04em] sm:text-4xl">
        That page could not load.
      </h1>
      <p className="text-base leading-relaxed text-muted-foreground">
        The error has been logged. Try again, or email us at hello@tactyqal.com if it keeps
        happening.
      </p>
      <Button onClick={reset} className="rounded-md">
        Try again
      </Button>
    </div>
  );
}
