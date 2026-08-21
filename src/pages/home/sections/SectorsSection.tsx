import { Asterisk } from "lucide-react";

/**
 * The ticker strip, on BizFusionX's construction: a navy band with the accent
 * mark between items, running continuously.
 *
 * The reference lists its services here. Seiran's services already have a whole
 * section, and the more useful thing for this reader is scope — the sectors the
 * brief names — which also keeps the band honest: the equivalent "Trusted By
 * 14K Companies" strip would need a client count Seiran does not have.
 *
 * Navy rather than the parchment it was on before, because BizFusionX uses this
 * strip to break between the hero and About, and a light strip between two
 * light sections breaks nothing.
 *
 * The track is duplicated and translated exactly 50%, which is what makes the
 * loop seamless. The copy is aria-hidden so the list is announced once, and the
 * whole thing stops under prefers-reduced-motion — a permanently moving band is
 * a real accessibility problem, not a nicety.
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
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {sectors.map((sector) => (
        <li key={sector} className="flex items-center gap-8 pr-8 whitespace-nowrap">
          <span className="text-body text-ink font-medium">{sector}</span>
          <Asterisk className="text-accent size-4 shrink-0" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export function SectorsSection() {
  return (
    <section className="on-navy bg-surface text-ink overflow-hidden py-5">
      <h2 className="sr-only">Sectors Seiran advises</h2>
      <div className="animate-marquee flex w-max">
        <Run />
        <Run hidden />
      </div>
    </section>
  );
}
