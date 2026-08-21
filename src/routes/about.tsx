import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/pages/about/AboutPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () =>
    seo({
      title: "Who We Are | Seiran Partners",
      description:
        "Seiran means a clear sky after a storm. We help owner-managed businesses in Kenya move from complexity to clarity, stronger execution and sustainable growth.",
      path: "/about",
    }),
});
