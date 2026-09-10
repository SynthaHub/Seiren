/**
 * Stand-in imagery, to be replaced with Seiran's own photography.
 *
 * Sourced from Unsplash, whose licence permits commercial use without
 * attribution. Files live in `public/placeholders/` — see the README there.
 *
 * ⚠ NONE OF THESE MAY BE PRESENTED AS A PHOTOGRAPH OF ELDAAH TOI.
 *
 * That is the one hard rule here. Putting a stranger's face on the page beside
 * a real, named person's biography misrepresents that person, and it is the
 * kind of thing that is embarrassing precisely when the site starts working.
 * The founder slot therefore uses a workspace interior rather than a portrait,
 * and the rule is enforced through accurate `alt` copy: alt text must never
 * name a real person unless the photograph is genuinely of them, so the page
 * cannot claim to be showing someone it is not.
 *
 * When real photography arrives: drop the files into `public/`, swap the paths
 * here, and set `usingPlaceholderImagery: false`. Nothing at the call sites
 * changes.
 *
 * MARKET RELEVANCE — client review, September 2026.
 *
 * Seiran sells to Kenyan owner-managed businesses. The imagery has to let that
 * reader think "this is for businesses like mine" while staying premium and
 * institutional, rather than reading as international corporate stock. Every
 * `note` below is therefore written as the PHOTOGRAPHY BRIEF for that slot —
 * it specifies the East African context the final image must have. The notes
 * are not descriptions of the current stand-ins.
 *
 * Status, image by image — every one below was opened and checked, not taken
 * on the strength of its caption. Captions proved unreliable: a result billed
 * as Nairobi was a Bangladeshi agency with its own logo on the wall, and one
 * tagged "Kenya office" showed East Asian and white subjects.
 *
 *   heroAdvisory      VERIFIED AFRICAN — three African women in a working
 *                     discussion, laptop and notes on the table. This is the
 *                     concept the client praised in review, with the subjects
 *                     corrected; the previous stand-in was a white European
 *                     woman in a Western office
 *   teamWorkshop      VERIFIED KENYAN — Nairobi skyline at golden hour. Reads
 *                     at both the 4:3 and 16:9 crops this slot is used at
 *   advisorySession   VERIFIED AFRICAN — Nairobi office, Cytonn Photography
 *   officeDesk        VERIFIED AFRICAN — signing a Capex approval, Cytonn
 *   workingDocuments  African subject, generic office. A little casual for the
 *                     brand; fine at thumbnail size, worth revisiting
 *   nairobiExterior   VERIFIED KENYAN — Nairobi CBD, on /contact
 *   workspacePortrait Neutral office corridor, no people, no cultural markers.
 *                     Deliberately NOT a face — it sits beside Eldaah Toi's
 *                     biography on /team, so a stranger's portrait there would
 *                     read as a photograph of him
 *
 * Every image with people in it now shows African subjects.
 */

export type PlaceholderKey =
  | "heroAdvisory"
  | "workspacePortrait"
  | "advisorySession"
  | "teamWorkshop"
  | "workingDocuments"
  | "officeDesk"
  | "nairobiExterior";

/**
 * `alt` and `note` are deliberately SEPARATE fields, and conflating them is a
 * bug this file has already shipped once.
 *
 *   alt  — what a person would say this picture shows. It is the alt attribute:
 *          read aloud by screen readers, indexed by search engines, and shown
 *          if the image fails to load. User-facing. Describes THIS file.
 *   note — the art direction for whoever shoots the replacement. Internal.
 *          Never rendered as alt text.
 *
 * They were one field until September 2026, which meant the review notes
 * ("VERIFIED KENYAN", "Replace at the photoshoot") were being read out to
 * screen-reader users and indexed by Google. Worse, when the image files were
 * reshuffled between slots the shared field went stale, so the hero announced
 * itself as a Nairobi skyline while actually showing three women in a meeting.
 * Two jobs, two fields — and `alt` must be re-checked whenever a file changes.
 *
 * `intrinsic` is the file's real pixel size. It is required, not optional: the
 * Photo component uses it for the width/height attributes that let a browser
 * reserve space before the image arrives. Without it every image on the site
 * reflowed the page as it loaded.
 *
 * Each slot ships at two widths, sized to how it is ACTUALLY rendered rather
 * than to whatever the source file happened to be. The three Insights
 * thumbnails are the clearest case: they display at 112–128px and were being
 * served 1600px files, so a phone downloaded roughly 600KB to paint three
 * postage stamps. Sizing to use cut the image payload from 2010KB to 774KB,
 * and the hero a phone actually fetches from 454KB to 63KB.
 *
 * `base` + `widths` build the srcset; `sizes` tells the browser how wide the
 * image will BE at each breakpoint, which is what lets it pick the small file
 * before layout. Get `sizes` wrong and the browser over-fetches — so if a
 * slot's column width changes, update it here too.
 *
 * Regenerate variants with `python scripts/images.py` after replacing a source.
 */
type Placeholder = {
  /** Path without the `-<width>.jpg` suffix. */
  base: string;
  alt: string;
  note: string;
  /** Rendered widths available on disk, ascending. Largest is the fallback. */
  widths: [number, number];
  /** Intrinsic size of the LARGEST variant, for the width/height attributes. */
  intrinsic: { w: number; h: number };
  sizes: string;
};

export const placeholders: Record<PlaceholderKey, Placeholder> = {
  heroAdvisory: {
    base: "/placeholders/hero-advisory",
    alt: "Three colleagues in discussion around a laptop and notes",
    note: "Advisory conversation between Kenyan business people — bleeds off the right edge, so keep the subject right of centre. Must read as East African owner-managers",
    widths: [700, 1400],
    intrinsic: { w: 1400, h: 933 },
    sizes: "(min-width: 1024px) 47vw, 100vw",
  },
  workspacePortrait: {
    base: "/placeholders/workspace-portrait",
    alt: "A quiet office corridor with glass-walled meeting rooms",
    note: "Founder slot — a Nairobi workspace interior, NOT a portrait of a person. See the rule at the top of this file",
    widths: [420, 840],
    intrinsic: { w: 840, h: 1050 },
    sizes: "(min-width: 768px) 40vw, 100vw",
  },
  advisorySession: {
    base: "/placeholders/advisory-session",
    alt: "Two people shaking hands across a meeting table",
    note: "Advisory session with a Kenyan client team, in a recognisably Nairobi workspace",
    widths: [160, 320],
    intrinsic: { w: 320, h: 214 },
    sizes: "128px",
  },
  teamWorkshop: {
    base: "/placeholders/team-workshop",
    alt: "The Nairobi skyline at golden hour",
    note: "Workshop with a Kenyan team, whiteboard visible. Used at both 4:3 and 16:9, so keep the subject centred",
    widths: [600, 1200],
    intrinsic: { w: 1200, h: 798 },
    sizes: "(min-width: 1024px) 50vw, 100vw",
  },
  workingDocuments: {
    base: "/placeholders/working-documents",
    alt: "A colleague handing over a folder of documents at a desk",
    note: "Detail — notes and working documents on a desk",
    widths: [160, 320],
    intrinsic: { w: 320, h: 180 },
    sizes: "128px",
  },
  officeDesk: {
    base: "/placeholders/office-desk",
    alt: "Signing an approval form at a desk",
    note: "Management reporting reviewed on screen, Kenyan workplace",
    widths: [160, 320],
    intrinsic: { w: 320, h: 214 },
    sizes: "128px",
  },
  nairobiExterior: {
    base: "/placeholders/nairobi-exterior",
    alt: "Nairobi's central business district seen from above",
    note: "Nairobi business district or workspace exterior",
    widths: [440, 880],
    intrinsic: { w: 880, h: 495 },
    sizes: "(min-width: 1024px) 30vw, 100vw",
  },
};

/** The file a browser falls back to when it cannot use srcset. */
export function placeholderSrc(p: Placeholder): string {
  return `${p.base}-${p.widths[p.widths.length - 1]}.jpg`;
}

/** `srcset` for a slot: every width on disk, labelled with its real pixel width. */
export function placeholderSrcSet(p: Placeholder): string {
  return p.widths.map((w) => `${p.base}-${w}.jpg ${w}w`).join(", ");
}

/**
 * True until Seiran's own photography replaces these.
 *
 * It no longer prefixes alt text with "Placeholder image —". That prefix was
 * protecting against a real risk — a screen-reader user being told a stock
 * photo IS Eldaah Toi — but accurate `alt` copy protects against it properly,
 * whereas the prefix leaked the word "Placeholder" onto every indexed page.
 * The safety rule now lives where it belongs: in the alt text itself, which
 * must never name a real person unless the photograph is of that person.
 */
export const usingPlaceholderImagery = true;
