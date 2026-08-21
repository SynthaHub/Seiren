import { HeroSection } from "./sections/HeroSection";
import { SectorsSection } from "./sections/SectorsSection";
import { AboutSection } from "./sections/AboutSection";
import { PillarsSection } from "./sections/PillarsSection";
import { ImpactSection } from "./sections/ImpactSection";
import { GetInTouchSection } from "./sections/GetInTouchSection";
import { InsightsPreviewSection } from "./sections/InsightsPreviewSection";
import { CtaSection } from "./sections/CtaSection";

/**
 * Home follows the approved reference layout section for section: split hero,
 * credibility strip, centre-weighted about with collage, services, a dark
 * figures band, contact with a consultation card, a three-card thinking row,
 * and a closing capture over a photo cluster.
 *
 * Tone alternates light -> navy -> light rather than running the earlier
 * top-to-bottom clearing, which this layout supersedes. Navy now carries the
 * utility bar, the figures band, the consultation card and the footer, which is
 * what keeps SPES-001's navy-dominant proportion within reach.
 */
export function HomePage() {
  return (
    <>
      <HeroSection />
      <SectorsSection />
      <AboutSection />
      <PillarsSection />
      <ImpactSection />
      <GetInTouchSection />
      <InsightsPreviewSection />
      <CtaSection />
    </>
  );
}
