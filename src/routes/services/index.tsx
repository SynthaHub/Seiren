import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/pages/services/ServicesPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () =>
    seo({
      title: "Advisory Services | Seiran Partners",
      description:
        "Strategy & Growth, Operations & Business Systems, People & Organization, and Business Performance — four pillars worked as one system.",
      path: "/services",
    }),
});
