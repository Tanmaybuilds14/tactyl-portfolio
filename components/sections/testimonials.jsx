"use client";

import { Quote } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Testimonials({ testimonials }) {
  return (
    <div className="flex flex-col gap-6">
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent>
          {testimonials.map((item) => (
            <CarouselItem key={item.name} className="sm:basis-1/2 lg:basis-1/3">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col justify-between gap-6">
                  <div className="flex flex-col gap-4">
                    <Quote className="size-5 text-foreground/25" />
                    <p className="text-[0.95rem] leading-relaxed text-foreground/85">
                      {item.quote}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarFallback className="font-label bg-secondary text-[0.6rem]">
                        {item.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">{item.name}</span>
                      <span className="font-label text-muted-foreground">{item.role}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-5 flex items-center justify-between">
          <p className="font-label max-w-md text-muted-foreground">
            Placeholder quotes — real, consented testimonials land before launch.
          </p>
          <div className="flex gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </div>
      </Carousel>
    </div>
  );
}
