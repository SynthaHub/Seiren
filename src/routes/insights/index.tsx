import { createFileRoute } from "@tanstack/react-router";
import { InsightsPage } from "@/pages/insights/InsightsPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/insights/")({
  component: InsightsPage,
  head: () =>
    seo({
      title: "Insights | Seiran Partners",
      description:
        "Thinking on SME growth, operating models, founder dependency, business systems and performance visibility for owner-managed businesses in Kenya.",
      path: "/insights",
    }),
});
