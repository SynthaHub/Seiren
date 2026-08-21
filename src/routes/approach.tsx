import { createFileRoute } from "@tanstack/react-router";
import { ApproachPage } from "@/pages/approach/ApproachPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/approach")({
  component: ApproachPage,
  head: () =>
    seo({
      title: "Our Approach | Seiran Partners",
      description:
        "The Seiran Transformation Journey: Understand, Diagnose, Clarify, Design, Execute, Strengthen, Transform. A report is not the finish line.",
      path: "/approach",
    }),
});
