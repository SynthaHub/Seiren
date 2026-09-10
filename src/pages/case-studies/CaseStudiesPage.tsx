import { Info } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PageHero } from "@/components/common/PageHero";
import { CtaBand } from "@/components/common/CtaBand";
import { illustrativeCaseStudies, caseStudies } from "@/content/case-studies";
import type { IllustrativeCaseStudy } from "@/content/schemas";

/**
 * Illustrative scenarios, published as worked examples of method.
 *
 * The brief bars publishing a real case study without a genuine engagement and
 * the client's permission (§7), and `caseStudies` stays empty until one exists.
 * These are a different thing: worked examples that show how the firm reasons,
 * which is the actual question a prospective client has when there is no track
 * record to point at.
 *
 * That only works if a reader can never mistake one for a client. Three things
 * hold that line, and none of them should be quietly removed:
 *
 * 1. A standing notice above the list, not a footnote below it.
 * 2. An "Illustrative" badge on every scenario, in the accent, at the top.
 * 3. Sector and rough size only — no named or identifiable organisations —
 *    and structural outcomes rather than invented numbers.
 *
 * The page also emits no CaseStudy or Review structured data: marking these up
 * as published work would put the claim into search results, which is exactly
 * the misrepresentation the labelling prevents on the page itself.
 */

const parts = [
  ["Context", "context", "Brief description of the organisation and situation."],
  ["Challenge", "challenge", "What the client was experiencing or trying to achieve."],
  [
    "Diagnosis",
    "diagnosis",
    "What Seiran identified as the underlying issue or constraint.",
  ],
  ["Intervention", "intervention", "What Seiran designed, changed or implemented."],
  ["Outcome", "outcome", "What changed as a result of the work."],
  ["Learning", "learning", "The broader insight from the engagement."],
] as const;

function Scenario({ study }: { study: IllustrativeCaseStudy }) {
  return (
    <article className="border-border border-t pt-10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="bg-accent text-accent-ink rounded-pill px-3 py-1 text-[0.7rem] font-semibold tracking-[0.08em] uppercase">
          Illustrative
        </span>
        <span className="text-small text-ink-muted">{study.sector}</span>
      </div>

      <h3 className="text-h2 text-ink-strong mt-4 max-w-2xl font-serif">{study.title}</h3>

      <dl className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
        {parts.map(([label, key]) => (
          <div key={key}>
            <dt className="text-label text-accent font-semibold tracking-[0.1em] uppercase">
              {label}
            </dt>
            <dd className="text-body text-ink-muted mt-2">{study[key]}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="What the work looks like in practice"
        title="Real business problems. Clear thinking. Practical change."
        lede="Each case study shows how Seiran moves from understanding the situation to identifying what is really holding the business back, deciding what needs to change, and putting that change into practice. Seiran is a new practice, so what follows are illustrative scenarios rather than client engagements — real case studies are published only with a client's permission."
      />

      <Section tone="parchment" width="default" className="py-12 md:py-14">
        <div className="border-accent bg-surface rounded-card flex items-start gap-4 border-l-4 p-5 md:p-6">
          <Info className="text-accent mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p className="text-small text-ink">
            <strong className="text-ink-strong">
              The scenarios below are illustrative, not client engagements.
            </strong>{" "}
            They are composed to show method and are not drawn from, or representative of,
            any identifiable organisation. Outcomes describe what changes structurally,
            not results achieved. Seiran has published{" "}
            {caseStudies.length === 0 ? "no" : String(caseStudies.length)} real case
            {caseStudies.length === 1 ? " study" : " studies"} to date — those appear here
            only where a client has given permission.
          </p>
        </div>
      </Section>

      <Section tone="white" width="default" className="py-16 md:py-20">
        <Eyebrow align="start">From problem to progress</Eyebrow>
        <h2 className="text-h1 mt-6 max-w-2xl font-serif">
          Every case study follows the same six parts
        </h2>
        <p className="text-body text-ink-muted mt-5 max-w-xl">
          This makes the work easy to understand, and shows not only what changed, but
          why. It also means examples can be read against one another, rather than each
          being written to flatter its own result.
        </p>

        {/* The spine, explained once, so a reader knows what they are looking at
            before the first scenario rather than inferring it from three. */}
        <ol className="border-border mt-12 grid gap-x-10 gap-y-7 border-t pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {parts.map(([label, , description], index) => (
            <li key={label}>
              <p className="text-label text-accent font-semibold tracking-[0.1em] tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-h3 text-ink-strong mt-2 font-serif font-semibold">
                {label}
              </h3>
              <p className="text-small text-ink-muted mt-2">{description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col gap-14">
          {illustrativeCaseStudies.map((study) => (
            <Scenario key={study.slug} study={study} />
          ))}
        </div>
      </Section>

      <Section tone="navy" width="default" className="py-16 md:py-20">
        <div className="max-w-2xl">
          <Eyebrow align="start">How we share client work</Eyebrow>
          <p className="text-quote mt-7 font-serif italic">
            A client&rsquo;s situation is theirs to disclose, not ours.
          </p>
          <p className="text-body text-ink-muted mt-6">
            Our work can involve sensitive issues around growth, leadership, operations
            and performance. We respect that confidentiality. Where a client gives
            permission for an engagement to be published, we share the work clearly and
            accurately. Where they do not, the work remains confidential.
          </p>
        </div>
      </Section>

      <CtaBand
        heading="Recognise your situation?"
        body="If something in these examples sounds familiar, the first conversation is where we explore what is really happening in your business."
      />
    </>
  );
}
