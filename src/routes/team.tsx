import { createFileRoute } from "@tanstack/react-router";
import { TeamPage } from "@/pages/team/TeamPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/team")({
  component: TeamPage,
  head: () =>
    seo({
      title: "Team | Seiran Partners",
      description:
        "Eldaah Toi, PMP, Founder and Managing Consultant, and Seiran's network of strategic associates across strategy, operations, people and performance.",
      path: "/team",
    }),
});
