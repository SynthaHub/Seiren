import { Link } from "@tanstack/react-router";
import { Check, Layers, ListChecks, Route, UserRound } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { Photo } from "@/components/common/Photo";
import { buttonVariants } from "@/components/ui/Button";
import { servicePillars } from "@/content/services";
import { journeyStages } from "@/content/journey";

/**
 * About, rebuilt on BizFusionX's construction: heading left, supporting copy
 * right, then a framed photo beside a figures grid and a ticked checklist.
 *
 * This absorbs what used to be a separate figures band. The reference puts its
 * numbers *inside* About rather than in a strip of their own, and it is right —
 * a lone stats band asks the reader to admire a claim, while the same numbers
 * next to the story are evidence for it.
 *
 * **The figures are computed from the content files**, so they cannot drift
 * from the site. The reference shows "10+ Years, 500+ Clients, 97+ Success
 * Rate" — Seiran is a new practice and every one of those would be invented.
 * These describe scope, which is true, rather than results, which do not exist
 * yet. The fourth is deliberately "1": for a firm positioned as a specialist
 * practice rather than a pyramid, one named consultant is the selling point.
 */

const differentiators = [
  "Diagnosis before proposal",
  "The consultant you meet runs the engagement",
  "Work continues through execution",
  "Specialists brought in only where needed",
] as const;

export function AboutSection() {
  const serviceCount = servicePillars.reduce((n, p) => n + p.services.length, 0);

  const figures = [
    { icon: Layers, value: String(servicePillars.length), label: "Advisory pillars" },
    { icon: ListChecks, value: String(serviceCount), label: "Named services" },
    {
      icon: Route,
      value: String(journeyStages.length),
      label: "Stages, start to finish",
    },
    { icon: UserRound, value: "1", label: "Consultant on your engagement" },
  ];

  return (
    <Section tone="parchment" width="wide" className="py-20 md:py-24">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow align="start">Why growth gets harder</Eyebrow>
          <h2 className="text-h1 mt-6 font-serif">
            Businesses grow. Complexity grows with them.
          </h2>
        </div>
        <p className="text-body text-ink-muted lg:pt-14">
          What worked at ten people quietly stops working at eighty, and the founder
          cannot keep carrying all of it. Seiran works on the structural constraint rather
          than the symptom — because the presenting problem is rarely the one holding
          growth back.
        </p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16">
        {/* Offset gold rule behind the image — the reference's hatched frame,
            translated to a mark the brand actually owns. */}
        <div className="relative">
          <div
            className="border-accent/45 rounded-media absolute -bottom-4 -left-4 h-full w-full border"
            aria-hidden="true"
          />
          <Photo slot="teamWorkshop" aspect="aspect-[4/3]" className="relative" />
        </div>

        <div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-7">
            {figures.map((f) => (
              <div key={f.label} className="flex items-start gap-4">
                <f.icon className="text-accent mt-1 size-6 shrink-0" aria-hidden="true" />
                <div>
                  <dd className="text-ink-strong font-serif text-[1.9rem] leading-none font-semibold tabular-nums">
                    {f.value}
                  </dd>
                  <dt className="text-small text-ink-muted mt-1.5">{f.label}</dt>
                </div>
              </div>
            ))}
          </dl>

          <ul className="border-border mt-9 grid gap-3 border-t pt-8 sm:grid-cols-2">
            {differentiators.map((item) => (
              <li key={item} className="text-small text-ink flex items-start gap-2.5">
                <span
                  className="bg-accent text-accent-ink rounded-pill mt-0.5 grid size-5 shrink-0 place-items-center"
                  aria-hidden="true"
                >
                  <Check className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <Link to="/about" className={`${buttonVariants({ variant: "outline" })} mt-9`}>
            More about the firm
          </Link>
        </div>
      </div>
    </Section>
  );
}
