import { HeroSection } from "./sections/HeroSection";
import { SectorsSection } from "./sections/SectorsSection";
import { AboutSection } from "./sections/AboutSection";
import { PillarsSection } from "./sections/PillarsSection";
import { ProcessSection } from "./sections/ProcessSection";
import { InsightsPreviewSection } from "./sections/InsightsPreviewSection";
import { GetInTouchSection } from "./sections/GetInTouchSection";

/**
 * Home follows the BizFusionX section rhythm: hero, ticker, about with figures
 * and checklist, services on a dark band, working process, writing, contact.
 *
 * Two of the reference's sections are absent on purpose, and neither is an
 * oversight:
 *
 * - **Success stories.** No case study may be published without a genuine
 *   engagement and the client's permission (content brief §7). The Case Studies
 *   page states that; putting an invented carousel on Home would contradict it.
 * - **Testimonials.** Seiran has no clients to quote. A fabricated testimonial
 *   is the single most damaging thing this site could ship.
 *
 * The reference's team grid is also gone — it needs eight faces and Seiran has
 * one, which the Team page handles properly rather than padding out here.
 *
 * The standalone figures band and newsletter section have been folded into
 * About and the footer respectively, which is where the reference puts them.
 */
export function HomePage() {
  return (
    <>
      <HeroSection />
      <SectorsSection />
      <AboutSection />
      <PillarsSection />
      <ProcessSection />
      <InsightsPreviewSection />
      <GetInTouchSection />
    </>
  );
}
