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
  "Food & hospitality",
  "Professional & business services",
  "Agribusiness",
  "Private schools & education",
  "Faith-based organisations",
  "Churches & church-affiliated bodies",
  "Selected non-profits",
] as const;

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="Seiran means a clear sky after a storm"
        lede="The storm is the uncertainty, disorder and pressure organisations face as they grow. The clear sky is the clarity, stronger leadership and sustainable growth on the other side of it."
      />

      <Section tone="white" width="wide" className="py-20 md:py-28">
        <div className="max-w-3xl">
          <div>
            <Eyebrow align="start">The story</Eyebrow>
            <h2 className="text-h1 mt-6 font-serif">
              What worked when an organisation was small stops working as it scales.
            </h2>
            <div className="text-body text-ink-muted mt-7 flex flex-col gap-5">
              <p>
                Businesses grow, and complexity grows with them. The founder cannot keep
                carrying everything, and the habits that built the business start to hold
                it back.
              </p>
              <p>
                Seiran represents that transition: understanding what is happening,
                identifying what is holding a business back, clarifying the way forward,
                and building the capability required for sustainable growth.
              </p>
              <p className="text-ink-strong font-semibold">
                The goal is not simply a bigger organisation. It is an enduring one.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="parchment" width="wide" className="py-20 md:py-28">
        <Eyebrow>What we are for</Eyebrow>
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
            <Eyebrow align="start">Who we serve</Eyebrow>
            <h2 className="text-h1 mt-6 font-serif">
              Defined by situation, not by size or sector.
            </h2>
            <p className="text-body text-ink-muted mt-7">
              Seiran works with owner-managed businesses and SMEs where the owner remains
              closely involved and where growth or complexity is creating a need for
              stronger structures and capability — alongside selected mission-driven and
              institutional organisations facing the same challenges.
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
        body="Not a pitch, and not a proposal. If Seiran is not the right fit for what you are facing, we will say so."
      />
    </>
  );
}
