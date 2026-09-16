import { Asterisk } from "lucide-react";
import { homeContent } from "@/content/pages/home";

/**
 * The ticker strip, on BizFusionX's construction: a navy band with the accent
 * mark between items, running continuously.
 *
 * It used to list sectors. On the client's review (Sept 2026) it now carries
 * what Seiran helps a business BUILD, because of where the strip sits: directly
 * under the hero's "From complexity to clarity" and immediately above the
 * seven-stage journey. That is high-visibility space between two statements of
 * the same promise, and repeating the promise as capabilities reinforces it,
 * where a sector list changed the subject to who the firm serves.
 *
 * The sector list has not been dropped — it moved to "Who we work with" on the
 * About page, where a reader asking "is this firm for me?" actually looks.
 *
 * The track is duplicated and translated exactly 50%, which is what makes the
 * loop seamless. The copy is aria-hidden so the list is announced once, and the
 * whole thing stops under prefers-reduced-motion — a permanently moving band is
 * a real accessibility problem, not a nicety.
 */

function Run({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {homeContent.capabilityTicker.words.map((capability) => (
        <li key={capability} className="flex items-center gap-8 pr-8 whitespace-nowrap">
          <span className="text-body text-ink font-medium">{capability}</span>
          <Asterisk className="text-accent size-4 shrink-0" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export function CapabilityTicker() {
  return (
    <section className="on-navy bg-surface text-ink overflow-hidden py-5">
      <h2 className="sr-only">{homeContent.capabilityTicker.srHeading}</h2>
      <div className="animate-marquee flex w-max">
        <Run />
        <Run hidden />
      </div>
    </section>
  );
}
