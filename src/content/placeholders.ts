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
 * and every placeholder renders with alt text that says it is a placeholder —
 * so the page never claims to be showing someone it is not.
 *
 * When real photography arrives: drop the files into `public/`, swap the paths
 * here, and set `placeholder: false`. Nothing at the call sites changes.
 */

export type PlaceholderKey =
  | "heroAdvisory"
  | "workspacePortrait"
  | "advisorySession"
  | "teamWorkshop"
  | "workingDocuments"
  | "officeDesk"
  | "nairobiExterior";

export const placeholders: Record<PlaceholderKey, { src: string; note: string }> = {
  heroAdvisory: {
    src: "/placeholders/hero-advisory.jpg",
    note: "Advisory conversation — the hero image, bleeding off the right edge",
  },
  workspacePortrait: {
    src: "/placeholders/workspace-portrait.jpg",
    note: "Founder portrait — Eldaah Toi, to be photographed",
  },
  advisorySession: {
    src: "/placeholders/advisory-session.jpg",
    note: "Advisory session with a client team",
  },
  teamWorkshop: {
    src: "/placeholders/team-workshop.jpg",
    note: "Team workshop, whiteboard visible",
  },
  workingDocuments: {
    src: "/placeholders/working-documents.jpg",
    note: "Detail — notes and working documents",
  },
  officeDesk: {
    src: "/placeholders/office-desk.jpg",
    note: "Management reporting reviewed on screen",
  },
  nairobiExterior: {
    src: "/placeholders/nairobi-exterior.jpg",
    note: "Nairobi business district or workspace exterior",
  },
};

/** True until Seiran's own photography replaces these. Drives the alt text. */
export const usingPlaceholderImagery = true;
