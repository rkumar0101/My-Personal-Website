import type { Metadata } from "next";
import { ConstructionInProgress } from "@/components/ui/ConstructionInProgress";

export const metadata: Metadata = {
  title: "Blog — Rishav Kumar",
  description:
    "Notes on content, code, and what is worth reading. Coming soon.",
};

export default function BlogIndexPage() {
  return (
    <ConstructionInProgress
      pageTitle="Blog"
      description="The full archive of essays, tear-downs, and notes is being built. Until then, you can preview the latest pieces on the home page."
      features={[
        "Searchable archive across all posts",
        "Category and topic filters",
        "Individual post pages with reading time",
        "RSS feed for subscribers",
        "Author profiles linking to Geekflare and Testlify",
      ]}
      progress={35}
      eta="Q3 2026"
      backHref="/"
      backLabel="Back to home"
    />
  );
}
