"use client";

import { Suspense, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigation, site } from "@/lib/site";

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  const y = useSpring(0, { stiffness: 220, damping: 32 });

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
    const goingDown = value > lastY.current;
    const pastThreshold = value > 160;
    const next = goingDown && pastThreshold && !open;
    setHidden((current) => (current === next ? current : next));
    y.set(next ? -96 : 0);
    lastY.current = value;
  });

  return (
    <>
      <motion.header
        style={{ y }}
        className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
          scrolled
            ? "border-border/70 bg-background/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${site.name} — home`}
          >
            <span className="relative grid size-7 place-items-center rounded-full border border-foreground/25">
              <span className="size-1.5 rounded-full bg-foreground transition-transform duration-500 group-hover:scale-150" />
            </span>
            <span className="font-mono text-[0.8rem] font-medium tracking-[0.28em]">
              {site.wordmark}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            <Suspense fallback={<NavItems />}>
              <ActiveNavItems />
            </Suspense>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              render={<Link href={site.bookingUrl} />}
              className="hidden h-9 rounded-full px-4 text-[0.8rem] sm:inline-flex"
            >
              Book a free call
              <ArrowUpRight data-icon="inline-end" />
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full lg:hidden"
                    aria-label="Open menu"
                  />
                }
              >
                <Menu />
              </SheetTrigger>
              <SheetContent side="right" className="w-full gap-0 sm:max-w-sm">
                <SheetHeader>
                  <SheetTitle className="font-mono text-xs tracking-[0.28em]">
                    {site.wordmark}
                  </SheetTitle>
                  <SheetDescription className="text-xs">
                    8-week 1:1 build programme
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col px-4" aria-label="Mobile">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-border/60 py-3.5 text-lg tracking-tight last:border-0"
                    >
                      {item.title}
                      <ArrowUpRight className="size-4 text-muted-foreground" />
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-2 p-4">
                  <Button
                    render={<Link href={site.bookingUrl} onClick={() => setOpen(false)} />}
                    className="h-11 rounded-full"
                  >
                    Book a free call
                  </Button>
                  <Button
                    variant="outline"
                    render={<Link href="/contact" onClick={() => setOpen(false)} />}
                    className="h-11 rounded-full"
                  >
                    Contact
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>

      {/* Sticky mobile conversion bar, added to the plan as a suggestion. */}
      <Suspense fallback={null}>
        <MobileCta />
      </Suspense>
    </>
  );
}

function NavItems({ pathname }) {
  return (
    <>
      {navigation.map((item) => {
        const active =
          typeof pathname === "string" &&
          (pathname === item.href || pathname.startsWith(`${item.href}/`));
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
              active
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.title}
          </Link>
        );
      })}
    </>
  );
}

/**
 * usePathname is URL data: it has to sit behind its own Suspense boundary so the
 * app shell for unknown params can still be prerendered.
 */
function ActiveNavItems() {
  const pathname = usePathname();
  return <NavItems pathname={pathname} />;
}

function MobileCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setShow(value > 900);
  });

  if (pathname === "/contact") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 p-3 backdrop-blur-xl transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Button render={<Link href={site.bookingUrl} />} className="h-11 w-full rounded-full">
        Book a free consultation
      </Button>
    </div>
  );
}
