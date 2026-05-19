"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, PenTool, Code2 } from "lucide-react";
import { portfolio, site, type PortfolioItem, type PortfolioType } from "@/lib/data";
import { cn } from "@/lib/utils";

type FilterKey = "all" | PortfolioType;

const TYPE_META: Record<
  PortfolioType,
  { label: string; icon: typeof PenTool }
> = {
  writing: { label: "Writing", icon: PenTool },
  web: { label: "Web", icon: Code2 },
  marketing: { label: "Marketing", icon: PenTool },
};

export function Portfolio() {
  const [active, setActive] = useState<FilterKey>("all");

  // Build filter pills dynamically from item types that exist
  const availableTypes = useMemo(() => {
    const seen = new Set<PortfolioType>();
    portfolio.forEach((i) => seen.add(i.type));
    return Array.from(seen);
  }, []);

  const filters: { key: FilterKey; label: string }[] = useMemo(
    () => [
      { key: "all", label: "All" },
      ...availableTypes.map((t) => ({
        key: t,
        label: TYPE_META[t].label,
      })),
    ],
    [availableTypes],
  );

  const items = useMemo(
    () =>
      active === "all"
        ? portfolio
        : portfolio.filter((i) => i.type === active),
    [active],
  );

  return (
    <section
      id="portfolio"
      className="relative py-24 md:py-32 border-b border-border overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Header — Bio / HowIWork convention */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-center md:text-left"
        >
          What have I shipped<span className="text-accent">?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 text-sm md:text-base text-muted max-w-xl text-center md:text-left mx-auto md:mx-0"
        >
          Real published work. Tap any card to read the article or visit the
          live site.
        </motion.p>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-10 md:mt-12 flex justify-center md:justify-start"
        >
          <div className="relative inline-flex items-center gap-0.5 rounded-full border border-border-strong bg-background p-1">
            {filters.map((f) => {
              const isActive = active === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActive(f.key)}
                  className={cn(
                    "relative inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors z-10",
                    isActive
                      ? "text-background"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="portfolio-filter-pill"
                      className="absolute inset-0 bg-foreground rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative">{f.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 [grid-auto-flow:dense]">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                  layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                }}
                className={cn(
                  "relative",
                  item.featured && "lg:col-span-2",
                )}
              >
                {item.type === "writing" ? (
                  <WritingCard item={item} />
                ) : (
                  <WebCard item={item} />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <p className="text-sm text-muted">Explore more:</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={site.authorPages.geekflare}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-sm font-medium hover:border-foreground hover:text-accent transition-colors"
            >
              Geekflare articles
              <ArrowUpRight className="size-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href={site.authorPages.testlify}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-sm font-medium hover:border-foreground hover:text-accent transition-colors"
            >
              Testlify articles
              <ArrowUpRight className="size-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              View full portfolio
              <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================
// Writing card
// =============================================================
function WritingCard({ item }: { item: PortfolioItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-border bg-background p-6 md:p-7 transition-all duration-300 hover:border-foreground hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_12px_32px_-12px_rgba(239,68,68,0.15)]",
        item.featured && "md:p-8 lg:p-10",
      )}
    >
      {/* Type indicator (top-left) + arrow (top-right) */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft text-accent px-2.5 py-1 text-[11px] font-medium">
          <PenTool className="size-3" />
          Writing
        </span>
        <ArrowUpRight className="size-5 text-muted group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
      </div>

      {/* Publication + category */}
      <div className="flex items-center gap-2 text-xs mb-4">
        <span className="font-medium text-foreground">{item.publication}</span>
        <span className="text-subtle">·</span>
        <span className="text-muted">{item.category}</span>
      </div>

      {/* Title */}
      <h3
        className={cn(
          "font-medium tracking-tight leading-snug text-foreground group-hover:text-accent transition-colors",
          item.featured
            ? "text-2xl md:text-3xl lg:text-4xl"
            : "text-lg md:text-xl",
        )}
      >
        {item.title}
      </h3>

      {/* Excerpt */}
      <p
        className={cn(
          "mt-3 text-muted leading-relaxed flex-1",
          item.featured ? "text-base md:text-lg" : "text-sm",
        )}
      >
        {item.description}
      </p>

      {/* Bottom hover line */}
      <div className="absolute bottom-0 left-6 right-6 md:left-7 md:right-7 h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
    </a>
  );
}

// =============================================================
// Web card (with auto-rotating screenshot slideshow when images exist)
// =============================================================
function WebCard({ item }: { item: PortfolioItem }) {
  const isLive = item.status === "live";
  const images = item.images ?? [];
  const hasImages = images.length > 0;

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance the slideshow when there are multiple images
  useEffect(() => {
    if (!hasImages || images.length <= 1 || paused) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, 3500);
    return () => clearInterval(t);
  }, [hasImages, images.length, paused]);

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-border bg-background overflow-hidden transition-all duration-300 hover:border-foreground hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_12px_32px_-12px_rgba(239,68,68,0.15)]",
      )}
    >
      {/* Preview area */}
      <div
        className={cn(
          "relative bg-gradient-to-br from-surface to-surface-elevated border-b border-border overflow-hidden",
          item.featured ? "aspect-[16/8]" : "aspect-[4/3]",
        )}
      >
        {hasImages ? (
          <>
            {/* Slideshow */}
            <AnimatePresence mode="sync">
              <motion.div
                key={`${item.id}-${idx}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={images[idx]}
                  alt={`${item.title} screenshot ${idx + 1}`}
                  fill
                  sizes={item.featured ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 33vw"}
                  className="object-cover"
                  priority={false}
                />
              </motion.div>
            </AnimatePresence>

            {/* Soft top vignette so the type + status badges read on any image */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />

            {/* Progress dots (only when multiple images) */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      i === idx ? "w-6 bg-white" : "w-1.5 bg-white/40",
                    )}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          // Fallback: gradient + first word (building projects without screenshots)
          <>
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="absolute inset-0 grid place-items-center">
              <span
                className={cn(
                  "font-medium tracking-[-0.02em] text-foreground/80",
                  item.featured
                    ? "text-5xl md:text-6xl lg:text-7xl"
                    : "text-3xl md:text-4xl",
                )}
              >
                {item.title.split(" ")[0]}
              </span>
            </div>
          </>
        )}

        {/* Type badge top-left */}
        <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-background/85 backdrop-blur text-foreground border border-border px-2.5 py-1 text-[11px] font-medium">
          <Code2 className="size-3" />
          Web
        </span>

        {/* Status badge top-right */}
        {isLive ? (
          <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-success/15 backdrop-blur border border-success/30 px-2.5 py-1 text-[11px] font-medium text-success">
            <span className="size-1.5 rounded-full bg-success animate-pulse" />
            Live
          </span>
        ) : (
          <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-background/85 backdrop-blur border border-border-strong px-2.5 py-1 text-[11px] font-medium text-muted">
            Building
          </span>
        )}
      </div>

      {/* Meta */}
      <div className={cn("flex-1 p-5", item.featured && "md:p-7")}>
        <div className="flex items-start justify-between gap-3">
          <h3
            className={cn(
              "font-medium tracking-tight text-foreground group-hover:text-accent transition-colors",
              item.featured ? "text-2xl md:text-3xl" : "text-lg",
            )}
          >
            {item.title}
          </h3>
          <ArrowUpRight className="size-4 text-muted shrink-0 mt-1 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
        </div>

        <p
          className={cn(
            "mt-3 text-muted leading-relaxed",
            item.featured ? "text-base" : "text-sm",
          )}
        >
          {item.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {item.role && (
            <span className="text-[11px] font-medium text-subtle uppercase tracking-[0.14em]">
              {item.role}
            </span>
          )}
          {item.stack && (
            <span className="font-mono text-[11px] text-muted">
              {item.stack}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
