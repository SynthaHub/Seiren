import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass } from "lucide-react";
import { Section, SectionLabel } from "@/components/common/Section";
import { Photo } from "@/components/common/Photo";
import { HeroPattern } from "@/components/common/HeroPattern";
import { buttonVariants } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowButton";

/**
 * Split hero: content left, a single portrait right.
 *
 * One image, not three. An earlier pass followed the reference's inset-photo
 * detail as well, which meant the hero opened on a stack of empty placeholder
 * boxes — the layout became about the missing photography rather than the
 * proposition.
 *
 * The card beneath the CTA carries the seven-stage journey. The reference puts
 * a discount there; Seiran has nothing to discount, and the journey is what a
 * hesitant reader most wants to understand before enquiring.
 */
export function HeroSection() {
  return (
    <Section tone="parchment" width="wide" className="relative isolate py-0 md:py-0">
      {/* Decorative only. Sits behind everything, clipped to the band, and
          weighted to the right so it never runs under the headline. */}
      <HeroPattern className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-[62%] opacity-[0.16] lg:block" />

      <div className="grid items-center gap-x-14 gap-y-12 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionLabel className="flex items-center gap-3">
            <span className="bg-accent/50 h-px w-8" aria-hidden="true" />
            From complexity to clarity
          </SectionLabel>

          <h1 className="text-hero mt-7">
            Clear Thinking,
            <br />
            Lasting Growth
          </h1>

          <p className="text-body text-ink-muted mt-7 max-w-md">
            Seiran partners with owner-managed businesses to build clarity, strengthen
            leadership, and design the systems that let a founder stop carrying
            everything.
          </p>

          <div className="mt-10 flex items-center gap-3">
            <Link to="/contact" className={buttonVariants({ size: "lg" })}>
              Start a Conversation
            </Link>
            <ArrowLink to="/contact" label="Start a conversation with Seiran" />
          </div>

          <div className="bg-surface border-border rounded-card mt-14 flex max-w-md items-center gap-5 border p-5">
            <Compass className="text-accent size-7 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-small text-ink-strong font-semibold">
                The seven-stage transformation journey
              </p>
              <Link
                to="/approach"
                className="text-small text-accent group mt-1.5 inline-flex items-center gap-1.5 hover:underline"
              >
                See how an engagement runs
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <Photo
            note="Eldaah Toi — founder portrait, in the workspace or with a client"
            aspect="aspect-[4/5] lg:aspect-[4/4.5]"
            priority
          />
        </div>
      </div>
    </Section>
  );
}
