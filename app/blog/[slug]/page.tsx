import type { Metadata } from "next";
import { ConstructionInProgress } from "@/components/ui/ConstructionInProgress";

export const metadata: Metadata = {
  title: "Post — Rishav Kumar",
  description: "Individual blog posts are being designed. Coming soon.",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Slug is reserved for the future post template
  await params;

  return (
    <ConstructionInProgress
      pageTitle="This post"
      description="Individual post pages are being designed. MDX rendering, reading time, table of contents, share buttons, related posts, and comments are all in the queue."
      features={[
        "MDX-rendered article body",
        "Reading time + word count meta",
        "Auto-generated table of contents",
        "Share to LinkedIn, X, copy link",
        "Related posts at the bottom",
      ]}
      progress={20}
      eta="Q3 2026"
      backHref="/blog"
      backLabel="Back to blog"
    />
  );
}
