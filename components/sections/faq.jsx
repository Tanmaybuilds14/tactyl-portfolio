"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq({ faqs }) {
  return (
    <Accordion className="divide-y divide-border border-y border-border">
      {faqs.map((item, index) => (
        <AccordionItem key={item.q} value={`faq-${index}`} className="border-0">
          <AccordionTrigger className="py-5 text-left text-base font-normal tracking-tight hover:no-underline">
            <span className="flex items-start gap-4">
              <span className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.q}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pl-8 text-[0.95rem] leading-relaxed text-muted-foreground">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
