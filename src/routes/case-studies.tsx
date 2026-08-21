import { createFileRoute } from "@tanstack/react-router";
import { CaseStudiesPage } from "@/pages/case-studies/CaseStudiesPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/case-studies")({
  component: CaseStudiesPage,
  head: () =>
    seo({
      title: "Case Studies | Seiran Partners",
      description:
        "Seiran publishes a case study only where there has been a genuine engagement and the client has given permission. Nothing is published yet.",
      path: "/case-studies",
    }),
});
