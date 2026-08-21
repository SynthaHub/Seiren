import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PageHero } from "@/components/common/PageHero";
import { CtaBand } from "@/components/common/CtaBand";

/**
 * Launches empty, by policy.
 *
 * The brief is explicit that no case study is published without a genuine
 * engagement and the client's permission. Rather than apologise for that, the
 * page states it — for an advisory firm the restraint is a stronger credibility
 * signal than illustrative examples would be, and a fabricated case study would
 * be the single most damaging thing this site could ship.
 *
 * No photo placeholders here on purpose: there is no engagement to picture.
 */

const structure = [
  ["Context", "The organisation, its market, and where it was in its growth."],
  ["Challenge", "What the client came with — the presenting problem."],
  ["Diagnosis", "What the work found, which is often not the presenting problem."],
  ["Intervention", "What was actually done, and with whom."],
  ["Outcome", "What changed, stated plainly and without inflation."],
  ["Learning", "What would be done differently, including what did not work."],
] as const;

export function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Nothing published yet"
        lede="Seiran publishes a case study only where there has been a genuine engagement and the client has given permission. Until then this page stays empty rather than filled with illustrative examples."
      />

      <Section tone="white" width="wide" className="py-20 md:py-28">
        <Eyebrow>What one will contain</Eyebrow>
        <h2 className="text-h1 mt-6 text-center font-serif">
          A fixed structure, every time
        </h2>
        <p className="text-body text-ink-muted mx-auto mt-5 max-w-xl text-center">
          So they can be read against one another, rather than each being written to
          flatter its own result.
        </p>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {structure.map(([heading, body], index) => (
            <li
              key={heading}
              className="bg-surface border-border rounded-card flex flex-col border p-6 md:p-7"
            >
              <span
                className="text-accent font-serif text-[2.25rem] leading-none font-semibold tabular-nums"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 text-ink-strong border-border mt-5 border-t pt-5 font-semibold">
                {heading}
              </h3>
              <p className="text-small text-ink-muted mt-3">{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="navy" width="default" className="py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Why it is empty</Eyebrow>
          <p className="text-quote mt-8 font-serif italic">
            A client&rsquo;s situation is theirs to disclose, not ours.
          </p>
          <p className="text-body text-ink-muted mt-6">
            Much of this work touches ownership, succession and performance problems that
            businesses do not discuss publicly. Where a client is willing to have an
            engagement written up, it will appear here in full. Where they are not, it
            will not appear at all.
          </p>
        </div>
      </Section>

      <CtaBand
        heading="A past client willing to be written up?"
        body="If you have worked with Seiran and would be happy to have the engagement published, that conversation starts the same way everything else here does."
      />
    </>
  );
}
