import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/home/HomePage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () =>
    seo({
      title: "Seiran Partners | Strategy & Business Advisory, Nairobi",
      description:
        "Seiran Partners works with owner-managed businesses in Kenya to bring clarity to strategic decisions, strengthen leadership and build the systems and capabilities required for sustainable growth.",
      path: "/",
    }),
});
