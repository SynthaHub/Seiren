import { createFileRoute } from "@tanstack/react-router";
import { CaseStudiesPage } from "@/pages/case-studies/CaseStudiesPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/case-studies")({
  component: CaseStudiesPage,
  head: () =>
    seo({
      title: "Case Studies | Seiran Partners",
      description:
        "Real business problems, clear thinking and practical change, in six parts. Seiran publishes a real case study only where there has been a genuine engagement and the client has given permission.",
      path: "/case-studies",
    }),
});
