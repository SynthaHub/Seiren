import { createFileRoute } from "@tanstack/react-router";
import { TeamPage } from "@/pages/team/TeamPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/team")({
  component: TeamPage,
  head: () =>
    seo({
      title: "Team | Seiran Partners",
      description:
        "Eldaah Toi, PMP®, Founder and Managing Consultant. Every Seiran engagement has a named consultant accountable for the work, drawing on strategic associates and specialist expertise where the work calls for it.",
      path: "/team",
    }),
});
