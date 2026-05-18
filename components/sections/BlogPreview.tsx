"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Clock,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { blogPosts, type BlogPost } from "@/lib/data";
import { cn } from "@/lib/utils";

// =============================================================
// Main section
// =============================================================
export function BlogPreview() {
  const [active, setActive] = useState<string>("all");

  // Derive filter pills from the data
  const categories = useMemo(() => {
    const set = new Set(blogPosts.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, []);

  const filtered = useMemo(
    () =>
      active === "all"
        ? blogPosts
        : blogPosts.filter((p) => p.category === active),
    [active],
  );

  const featured = filtered.find((p) => p.featured);
  const rest = featured
    ? filtered.filter((p) => p.slug !== featured.slug)
    : filtered;

  return (
    <section
      id="blog"
      className="relative py-24 md:py-32 border-b border-border overflow-hidden"
    >
      {/* Subtle backdrop */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <Header postCount={filtered.length} />

        {/* Filter pills */}
        <FilterPills
          categories={categories}
          active={active}
          onChange={setActive}
        />

        {/* Featured card */}
        <AnimatePresence mode="wait">
          {featured && (
            <motion.div
              key={`featured-${featured.slug}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 md:mt-12"
            >
              <FeaturedCard post={featured} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editorial list */}
        <div className="mt-12 md:mt-14">
          <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle mb-5">
            More posts
          </p>

          <ul className="border-t border-border">
            <AnimatePresence mode="popLayout">
              {rest.length === 0 ? (
                <motion.li
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center text-sm text-muted"
                >
                  No more posts in this category.
                </motion.li>
              ) : (
                rest.map((post, i) => (
                  <motion.li
                    key={post.slug}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(i * 0.05, 0.25),
                      ease: [0.22, 1, 0.36, 1],
                      layout: { duration: 0.4 },
                    }}
                  >
                    <PostRow post={post} />
                  </motion.li>
                ))
              )}
            </AnimatePresence>
          </ul>
        </div>

        {/* Personal Journal aside */}
        <JournalAside />
      </div>
    </section>
  );
}

// =============================================================
// Header (Bio convention)
// =============================================================
function Header({ postCount }: { postCount: number }) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-10 md:mb-12">
      <div className="max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-center lg:text-left"
        >
          From the desk<span className="text-accent">?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 text-sm md:text-base text-muted max-w-xl text-center lg:text-left mx-auto lg:mx-0"
        >
          Pieces on content, code, and what is worth reading. Some get
          published. The rest live in the journal.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center gap-3 self-center lg:self-end"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-3 py-1.5 text-[11px] font-medium text-muted">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          {postCount} {postCount === 1 ? "post" : "posts"}
        </span>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent transition-colors"
        >
          View archive
          <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}

// =============================================================
// Filter pills (segmented control)
// =============================================================
function FilterPills({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (k: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="overflow-x-auto -mx-5 md:mx-0 px-5 md:px-0 no-scrollbar"
    >
      <div className="inline-flex items-center gap-0.5 rounded-full border border-border-strong bg-background p-1">
        {categories.map((c) => {
          const isActive = active === c;
          const label = c === "all" ? "All" : c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => onChange(c)}
              className={cn(
                "relative inline-flex items-center px-3.5 py-1.5 text-[12px] md:text-[13px] font-medium rounded-full transition-colors z-10 whitespace-nowrap",
                isActive
                  ? "text-background"
                  : "text-muted hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="blog-filter-pill"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

// =============================================================
// Featured card (the hero post)
// =============================================================
function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group/featured relative block rounded-2xl border border-border bg-background overflow-hidden transition-all duration-300 hover:border-foreground hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_24px_60px_-24px_rgba(239,68,68,0.18)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Visual side */}
        <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto bg-gradient-to-br from-surface to-surface-elevated overflow-hidden border-b lg:border-b-0 lg:border-r border-border">
          {post.image ? (
            <>
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 group-hover/featured:scale-105"
              />
              {/* Subtle dark vignette so overlays read on any image */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/40 pointer-events-none" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-grid opacity-40" />
              {/* Decorative big serif glyph (fallback when no image) */}
              <div className="absolute inset-0 grid place-items-center">
                <span
                  aria-hidden
                  className="font-serif italic text-foreground/10 text-[180px] md:text-[240px] leading-none select-none transition-transform duration-700 group-hover/featured:scale-110"
                >
                  {post.title.charAt(0)}
                </span>
              </div>
            </>
          )}

          {/* Top-left FEATURED ribbon */}
          <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
            <Sparkles className="size-3" />
            Featured
          </span>
          {/* Bottom-right read indicator (decorative) */}
          <div className="absolute bottom-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background group-hover/featured:bg-accent group-hover/featured:scale-110 transition-all duration-300">
            <ArrowUpRight className="size-4" />
          </div>
        </div>

        {/* Content side */}
        <div className="lg:col-span-7 p-7 md:p-9 lg:p-11 flex flex-col">
          {/* Meta row */}
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.14em] text-muted mb-5">
            <span className="text-accent">{formatDate(post.date)}</span>
            <span className="size-1 rounded-full bg-border-strong" />
            <span>{post.category}</span>
            <span className="size-1 rounded-full bg-border-strong" />
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" />
              {post.readTime} min read
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl lg:text-[2.25rem] font-medium tracking-[-0.02em] leading-[1.15] text-foreground group-hover/featured:text-accent transition-colors">
            {post.title}
          </h3>

          <p className="mt-5 text-[15px] md:text-base text-muted leading-relaxed line-clamp-4">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-7 flex items-center gap-2 text-sm font-medium text-foreground group-hover/featured:text-accent transition-colors">
            Read the piece
            <ArrowRight className="size-4 group-hover/featured:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Bottom hover line */}
      <span className="absolute bottom-0 left-7 right-7 h-px bg-accent scale-x-0 group-hover/featured:scale-x-100 origin-left transition-transform duration-500" />
    </Link>
  );
}

// =============================================================
// Editorial post row (one row per post)
// =============================================================
function PostRow({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group/row relative block border-b border-border py-6 md:py-7 transition-colors"
    >
      {/* Hover bg sweep */}
      <span className="absolute inset-0 bg-accent/[0.025] dark:bg-accent/[0.04] scale-x-0 group-hover/row:scale-x-100 origin-left transition-transform duration-500 -z-0 rounded-xl" />

      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-baseline">
        {/* Meta (date + category) */}
        <div className="md:col-span-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono uppercase tracking-[0.14em] text-muted">
          <span className="text-foreground/80">{formatDate(post.date)}</span>
          <span className="size-1 rounded-full bg-border-strong" />
          <span>{post.category}</span>
        </div>

        {/* Title + excerpt */}
        <div className="md:col-span-7">
          <h3 className="text-lg md:text-xl font-medium tracking-tight text-foreground group-hover/row:text-accent transition-colors leading-snug">
            {post.title}
          </h3>
          <p className="mt-1.5 text-sm text-muted leading-relaxed line-clamp-1 md:line-clamp-1">
            {post.excerpt}
          </p>
        </div>

        {/* Read time + arrow */}
        <div className="md:col-span-2 flex items-center md:justify-end gap-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-[0.14em] text-muted">
            <Clock className="size-3" />
            {post.readTime} min
          </span>
          <ArrowUpRight className="size-4 text-muted group-hover/row:text-accent group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 transition-all duration-300 shrink-0" />
        </div>
      </div>
    </Link>
  );
}

// =============================================================
// Personal Journal aside (distinct intimate aesthetic)
// =============================================================
function JournalAside() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-14 md:mt-16"
    >
      <Link
        href="/journal"
        className="group/journal relative block rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-surface/60 to-surface-elevated/40 hover:border-foreground transition-all duration-500 hover:-translate-y-1"
      >
        {/* Decorative paper texture (soft cross-hatch) */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 14px), repeating-linear-gradient(-45deg, currentColor 0 1px, transparent 1px 14px)",
          }}
        />

        {/* Accent corner ribbon */}
        <span className="absolute top-0 left-0 h-1 w-24 bg-accent rounded-tl-2xl" />

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 p-7 md:p-10 lg:p-12">
          {/* Left: icon + label */}
          <div className="md:col-span-3 flex md:flex-col items-center md:items-start gap-4 md:gap-5">
            <div className="relative">
              <span className="inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-accent-soft text-accent group-hover/journal:rotate-[-4deg] group-hover/journal:scale-110 transition-transform duration-500">
                <BookOpen className="size-6 md:size-7" />
              </span>
              {/* Decorative wax seal dot */}
              <span className="absolute -right-1 -bottom-1 size-3 rounded-full bg-accent ring-2 ring-background animate-pulse" />
            </div>
            <p className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] text-muted">
              Personal journal
            </p>
          </div>

          {/* Middle: copy */}
          <div className="md:col-span-7">
            <h3 className="font-serif italic text-2xl md:text-3xl lg:text-4xl tracking-tight leading-[1.2] text-foreground">
              Looking for the{" "}
              <span className="text-accent">unfiltered</span> version?
            </h3>
            <p className="mt-4 text-sm md:text-base text-muted leading-relaxed max-w-xl">
              My personal journal lives here. Day-to-day notes, half-formed
              ideas, late-night thinking, unsent letters. No SEO, no clients,
              no edits. Just me.
            </p>
          </div>

          {/* Right: CTA */}
          <div className="md:col-span-2 flex md:items-end md:justify-end">
            <div className="inline-flex items-center gap-2.5 rounded-full bg-foreground text-background pl-5 pr-2 py-1.5 font-medium text-sm group-hover/journal:bg-accent transition-colors duration-300">
              <span>Open journal</span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-background text-foreground group-hover/journal:bg-accent-foreground group-hover/journal:text-accent transition-colors">
                <ArrowUpRight className="size-3.5 group-hover/journal:-translate-y-0.5 group-hover/journal:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </div>

        {/* Bottom hover line */}
        <span className="absolute bottom-0 left-7 right-7 h-px bg-accent scale-x-0 group-hover/journal:scale-x-100 origin-left transition-transform duration-700" />
      </Link>
    </motion.div>
  );
}

// =============================================================
// Helpers
// =============================================================
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
