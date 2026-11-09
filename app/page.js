import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { TunnelHero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { StoriesGallery } from "@/components/sections/stories-gallery";
import { Journey } from "@/components/sections/journey";
import { WhyGrid } from "@/components/sections/why-grid";
import { ToolsGrid, ToolsTeaser } from "@/components/sections/tools-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { SectionHeading } from "@/components/sections/section-heading";
import { PostCard } from "@/components/sections/post-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { stories, stats } from "@/lib/content/stories";
import { programPhases } from "@/lib/content/program";
import { tools } from "@/lib/content/tools";
import { faqs, testimonials, whyCards } from "@/lib/content/marketing";
import { getLatestPosts } from "@/lib/blog/queries";

export const metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const posts = await getLatestPosts(3);

  return (
    <>
      <TunnelHero cards={stories} />
      <StatsStrip stats={stats} />

      <section className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-5 pb-6 sm:px-8">
          <SectionHeading
            eyebrow="Proof, not promises"
            title="Six student products that shipped."
            body="Each one started as a problem a teenager had watched someone struggle with. Scroll sideways to see the build."
            className="pt-16 sm:pt-20"
            action={
              <Button
                variant="outline"
                render={<Link href="/success-stories" />}
                className="rounded-full"
              >
                All success stories
                <ArrowUpRight data-icon="inline-end" />
              </Button>
            }
          />
        </div>
      </section>

      <StoriesGallery stories={stories} />
      <Journey phases={programPhases} />
      <WhyGrid cards={whyCards} />

      <section className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <SectionHeading
            eyebrow="Free tools"
            title="Eight assessments, no account required."
            body="Use them before you apply, or bring the result to a consultation. Each one takes under ten minutes."
            action={<ToolsTeaser />}
          />
          <div className="mt-10">
            <ToolsGrid tools={tools} limit={6} />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            eyebrow="Parents and students"
            title="What people say after eight weeks."
            className="mb-10"
          />
          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      <Pricing />

      <section className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            eyebrow="From the blog"
            title="How the programme actually works."
            action={
              <Button variant="outline" render={<Link href="/blog" />} className="rounded-full">
                Read the blog
                <ArrowUpRight data-icon="inline-end" />
              </Button>
            }
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Reveal key={post.slug}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow="Questions"
              title="The things parents ask first."
              body="If your question is not here, ask it on the consultation call — no form required."
            />
            <Faq faqs={faqs} />
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
