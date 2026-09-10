import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PageHero } from "@/components/common/PageHero";
import { CtaBand } from "@/components/common/CtaBand";

const foundations = [
  {
    heading: "Purpose",
    body: "To help organisations build stronger, more capable and more resilient institutions — creating lasting value for owners, employees, customers, communities and future generations.",
  },
  {
    heading: "Vision",
    body: "A future where owner-managed businesses become enduring institutions that create lasting value for people, communities, and generations.",
  },
  {
    heading: "Mission",
    body: "To partner with owner-managed businesses to build clarity, strengthen leadership, design effective systems, execute meaningful strategies, and achieve sustainable transformation.",
  },
] as const;

const sectors = [
  "Retail",
  "Wholesale",
  "Food & Hospitality",
  "Professional & Business Services",
  "Agribusiness",
  "Private Education",
  "Faith-based Organisations",
  "Selected Non-profits",
] as const;

export function AboutPage() {
  return (
    <>
      {/* The anchor phrase stays as the heading, but the page no longer reduces
          the name to a one-line translation. On the client's review the
          etymological nuance IS the origin story — seiran is not literally
          "clear sky after a storm", and flattening it to that lost the movement
          and atmosphere the word actually carries. */}
      <PageHero
        eyebrow="The idea behind Seiran"
        title="A clear sky after a storm"
        lede={
          <>
            Seiran is inspired by the Japanese word <i lang="ja-Latn">seiran</i> (
            {/* lang="ja" so assistive tech reads these as Japanese rather than
                attempting them under English pronunciation rules. */}
            <span lang="ja">晴嵐</span>) — traditionally associated with mountain haze
            or wind on a clear day, an image of movement, atmosphere and clarity
            emerging together.
          </>
        }
      />

      <Section tone="white" width="wide" className="py-20 md:py-28">
        <div className="max-w-3xl">
          <div>
            <Eyebrow align="start">Where the name comes from</Eyebrow>
            <h2 className="text-h1 mt-6 font-serif">
              What worked when a business was small stops working as it scales.
            </h2>
            <div className="text-body text-ink-muted mt-7 flex flex-col gap-5">
              <p>
                Businesses grow, and complexity grows with them. The ways of working,
                decisions and structures that served the business when it was smaller can
                start to constrain it as it grows.
              </p>
              <p>
                For us, the name became a metaphor for what happens when an organisation
                moves through uncertainty and complexity toward greater clarity, stronger
                leadership and sustainable growth. The storm is the uncertainty, disorder
                and pressure organisations face as they grow. The clear sky represents
                what becomes possible when that complexity is understood, addressed and
                transformed.
              </p>
              <p>
                That is the idea behind Seiran: helping organisations move from complexity
                to clarity, and from clarity to lasting capability.
              </p>
              <p className="text-ink-strong font-semibold">
                The goal is not simply a bigger organisation. It is an enduring one.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="parchment" width="wide" className="py-20 md:py-28">
        <Eyebrow>What we are building toward</Eyebrow>
        <h2 className="text-h1 mt-6 text-center font-serif">
          Purpose, vision and mission
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {foundations.map((item) => (
            <article
              key={item.heading}
              className="bg-surface border-border rounded-card border p-6 md:p-8"
            >
              <h3 className="text-h3 text-ink-strong font-serif font-semibold">
                {item.heading}
              </h3>
              <p className="text-small text-ink-muted border-border mt-5 border-t pt-5">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="white" width="wide" className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <Eyebrow align="start">Who we work with</Eyebrow>
            <h2 className="text-h1 mt-6 font-serif">
              Owner-managed businesses facing the challenges that come with growth.
            </h2>
            <p className="text-body text-ink-muted mt-7">
              Seiran works primarily with owner-managed businesses where the owner remains
              closely involved in the business. We also work with selected organisations
              navigating similar challenges and needing stronger leadership, systems and
              capability.
            </p>
            <p className="text-small text-ink-strong mt-7 font-semibold">
              Our experience spans:
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {sectors.map((sector) => (
              <li
                key={sector}
                className="bg-surface-sunken rounded-control text-small text-ink px-4 py-3"
              >
                {sector}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand
        heading="Start with a conversation about your situation."
        body="The first conversation is about understanding what you are facing, not selling you a service. If Seiran is not the right fit, we will say so."
      />
    </>
  );
}
