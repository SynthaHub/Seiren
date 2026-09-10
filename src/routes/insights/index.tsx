import { createFileRoute } from "@tanstack/react-router";
import { InsightsPage } from "@/pages/insights/InsightsPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/insights/")({
  component: InsightsPage,
  head: () =>
    seo({
      title: "Insights | Seiran Partners",
      description:
        "Practical thinking on growth, systems and the founder's role — articles, guides and perspectives on the challenges owner-managed businesses in Kenya face as they grow.",
      path: "/insights",
    }),
});
