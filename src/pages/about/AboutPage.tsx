import { Section } from "@/components/common/Section";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PageHero } from "@/components/common/PageHero";
import { CtaBand } from "@/components/common/CtaBand";
import { aboutContent } from "@/content/pages/about";

export function AboutPage() {
  const {
    hero,
    nameOrigin,
    foundationsSection,
    foundations,
    whoWeWorkWith,
    sectors,
    cta,
  } = aboutContent;

  return (
    <>
      {/* The anchor phrase stays as the heading, but the page no longer reduces
          the name to a one-line translation. On the client's review the
          etymological nuance IS the origin story — seiran is not literally
          "clear sky after a storm", and flattening it to that lost the movement
          and atmosphere the word actually carries.

          The lede below is deliberately NOT sourced from CMS content — it
          embeds `lang="ja"` markup around 晴嵐 so assistive tech pronounces it
          correctly, which a plain-text CMS field can't safely carry. */}
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lede={
          <>
            Seiran is inspired by the Japanese word <i lang="ja-Latn">seiran</i> (
            {/* lang="ja" so assistive tech reads these as Japanese rather than
                attempting them under English pronunciation rules. */}
            <span lang="ja">晴嵐</span>) — traditionally associated with mountain haze or
            wind on a clear day, an image of movement, atmosphere and clarity emerging
            together.
          </>
        }
      />

      <Section tone="white" width="wide" className="py-20 md:py-28">
        <div className="max-w-3xl">
          <div>
            <Eyebrow align="start">{nameOrigin.eyebrow}</Eyebrow>
            <h2 className="text-h1 mt-6 font-serif">{nameOrigin.heading}</h2>
            <div className="text-body text-ink-muted mt-7 flex flex-col gap-5">
              {nameOrigin.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === nameOrigin.paragraphs.length - 1
                      ? "text-ink-strong font-semibold"
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="parchment" width="wide" className="py-20 md:py-28">
        <Eyebrow>{foundationsSection.eyebrow}</Eyebrow>
        <h2 className="text-h1 mt-6 text-center font-serif">
          {foundationsSection.heading}
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
            <Eyebrow align="start">{whoWeWorkWith.eyebrow}</Eyebrow>
            <h2 className="text-h1 mt-6 font-serif">{whoWeWorkWith.heading}</h2>
            <p className="text-body text-ink-muted mt-7">{whoWeWorkWith.body}</p>
            <p className="text-small text-ink-strong mt-7 font-semibold">
              {whoWeWorkWith.experienceLabel}
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

      <CtaBand heading={cta.heading} body={cta.body} />
    </>
  );
}
