import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/home/HomePage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () =>
    seo({
      title: "Seiran Partners | Strategy & Business Advisory, Nairobi",
      description:
        "Seiran partners with owner-managed businesses in Kenya to turn complexity into clarity, stronger execution and sustainable growth.",
      path: "/",
    }),
});
