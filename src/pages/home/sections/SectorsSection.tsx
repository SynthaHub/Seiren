/**
 * The credibility strip, in the reference's position and rhythm.
 *
 * The reference runs "Trusted By 14K Companies Worldwide" over a marquee of
 * client logos. Seiran has neither a client count nor a logo to show, and
 * inventing either would be the most damaging thing this site could ship — a
 * firm selling honest diagnosis cannot open with fabricated proof.
 *
 * So the strip keeps its job and its motion, carrying the sectors the brief
 * actually names. When real client logos exist they drop straight into this
 * track in place of the text runs, and the heading above can change with them.
 *
 * The track is duplicated and translated by exactly 50%, which is what makes
 * the loop seamless. The copy is aria-hidden so a screen reader hears the list
 * once, not twice.
 */

const sectors = [
  "Retail",
  "Wholesale",
  "Food & Hospitality",
  "Professional Services",
  "Agribusiness",
  "Private Education",
  "Faith-based Organisations",
  "Owner-managed SMEs",
] as const;

function Run({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-x-14 px-7"
      aria-hidden={hidden || undefined}
    >
      {sectors.map((sector) => (
        <li key={sector} className="flex items-center gap-14 whitespace-nowrap">
          <span className="text-body text-ink-muted">{sector}</span>
          <span className="bg-border rounded-pill size-1.5" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export function SectorsSection() {
  return (
    <section className="bg-surface border-border border-y py-10 md:py-12">
      <p className="text-ink-strong px-5 text-center text-[0.95rem] font-semibold md:px-8">
        Advising owner-managed businesses across Kenya
      </p>

      {/* The mask fades both ends so items enter and leave rather than
          appearing and vanishing at a hard edge. */}
      <div
        className="mt-7 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="animate-marquee flex w-max">
          <Run />
          <Run hidden />
        </div>
      </div>
    </section>
  );
}
