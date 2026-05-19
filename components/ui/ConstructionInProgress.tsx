"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Hammer,
  ArrowLeft,
  ArrowUpRight,
  Mail,
  Check,
  Clock,
} from "lucide-react";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ConstructionInProgressProps {
  /** Big page title (e.g., "Blog", "Portfolio") */
  pageTitle: string;
  /** Lead paragraph describing what this space will be */
  description: string;
  /** Feature checklist (3-5 items showing what's coming) */
  features: string[];
  /** Build progress 0-100 */
  progress: number;
  /** Optional ETA string (e.g., "Q3 2026") */
  eta?: string;
  /** Where the back link goes (default "/") */
  backHref?: string;
  /** Back label (default "Back to home") */
  backLabel?: string;
}

export function ConstructionInProgress({
  pageTitle,
  description,
  features,
  progress,
  eta,
  backHref = "/",
  backLabel = "Back to home",
}: ConstructionInProgressProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-accent/12 blur-3xl pointer-events-none" />

      {/* Scrolling stripe top */}
      <ScrollingStripe />

      <div className="relative mx-auto max-w-3xl px-5 md:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-12"
        >
          <Link
            href={backHref}
            className="group inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
            {backLabel}
          </Link>
        </motion.div>

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-3 py-1.5 text-[11px] font-medium text-accent uppercase tracking-[0.18em] mb-7"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Under construction
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.03em] leading-[1] mb-6"
        >
          {pageTitle}
          <span className="text-accent">.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Animated icon constellation */}
        <AnimatedConstruction />

        {/* Feature checklist */}
        <FeatureList features={features} />

        {/* Progress block */}
        <ProgressBlock progress={progress} eta={eta} />

        {/* CTA row */}
        <CtaRow />
      </div>

      {/* Scrolling stripe bottom (reverse) */}
      <ScrollingStripe reverse />
    </section>
  );
}

// =============================================================
// Scrolling diagonal stripe (subtle, theme-aware)
// =============================================================
function ScrollingStripe({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute left-0 right-0 h-8 overflow-hidden pointer-events-none",
        reverse ? "bottom-0" : "top-0",
      )}
    >
      <div
        className="absolute inset-0 opacity-30 dark:opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, var(--accent) 0, var(--accent) 1.5px, transparent 1.5px, transparent 14px)",
          animation: `stripe-scroll ${reverse ? "12s" : "16s"} linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
}

// =============================================================
// Animated icon — concentric rings + orbital dots + hammer
// =============================================================
function AnimatedConstruction() {
  return (
    <div className="relative mx-auto my-14 md:my-16 size-48 md:size-56 grid place-items-center">
      {/* Pulsing concentric rings */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute inset-0 rounded-full border border-accent/30"
          animate={{
            scale: [0.85, 1.4, 0.85],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Orbital dots (rotating ring) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 will-change-transform"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * 360;
          const isAccent = i % 2 === 0;
          return (
            <span
              key={i}
              className={cn(
                "absolute top-1/2 left-1/2 rounded-full",
                isAccent
                  ? "size-2 bg-accent shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                  : "size-1.5 bg-foreground/35",
              )}
              style={{
                marginTop: isAccent ? -4 : -3,
                marginLeft: isAccent ? -4 : -3,
                transform: `rotate(${angle}deg) translateY(-92px) rotate(${-angle}deg)`,
              }}
            />
          );
        })}
      </motion.div>

      {/* Counter-rotating inner orbital (subtle layer) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 will-change-transform"
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1, 2].map((i) => {
          const angle = (i / 3) * 360 + 30;
          return (
            <span
              key={i}
              className="absolute top-1/2 left-1/2 size-1 rounded-full bg-foreground/40"
              style={{
                marginTop: -2,
                marginLeft: -2,
                transform: `rotate(${angle}deg) translateY(-58px) rotate(${-angle}deg)`,
              }}
            />
          );
        })}
      </motion.div>

      {/* Center tile with hammer (gentle wobble) */}
      <motion.div
        animate={{ rotate: [-6, 6, -6] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl bg-foreground text-background shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)] dark:shadow-[0_12px_30px_-8px_rgba(239,68,68,0.4)]"
      >
        <Hammer className="size-7 md:size-8" />
        {/* Soft accent ring around tile */}
        <span className="absolute inset-0 rounded-2xl ring-1 ring-accent/40 ring-offset-4 ring-offset-background" />
      </motion.div>
    </div>
  );
}

// =============================================================
// Feature checklist
// =============================================================
function FeatureList({ features }: { features: string[] }) {
  return (
    <div className="mt-2 mb-10">
      <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle mb-4">
        What is coming
      </p>
      <ul className="space-y-3">
        {features.map((f, i) => (
          <motion.li
            key={f}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-start gap-3 text-[15px] text-foreground/85 leading-snug"
          >
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-accent shrink-0">
              <Check className="size-3" strokeWidth={2.5} />
            </span>
            <span>{f}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// =============================================================
// Progress block (animated bar + ETA)
// =============================================================
function ProgressBlock({
  progress,
  eta,
}: {
  progress: number;
  eta?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="rounded-2xl border border-border bg-background p-5 md:p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">
          Build progress
        </p>
        <p className="font-mono text-sm font-medium tabular-nums text-foreground">
          {progress}%
        </p>
      </div>

      {/* Bar */}
      <div className="relative h-2 rounded-full bg-foreground/[0.08] overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{
            duration: 1.4,
            delay: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-accent to-accent/70"
        />
        {/* Shimmer overlay */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
        />
      </div>

      {eta && (
        <div className="mt-4 flex items-center gap-1.5 text-[11px] text-muted">
          <Clock className="size-3" />
          <span>Estimated launch: </span>
          <span className="text-foreground font-medium">{eta}</span>
        </div>
      )}
    </motion.div>
  );
}

// =============================================================
// CTA row
// =============================================================
function CtaRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="flex flex-wrap items-center gap-3"
    >
      <a
        href={`mailto:${site.email}?subject=Notify%20when%20live`}
        className="group/cta inline-flex items-center gap-2 rounded-full bg-foreground text-background h-11 pl-5 pr-2 text-sm font-medium hover:bg-foreground/90 transition-all active:scale-[0.98]"
      >
        <Mail className="size-4" />
        <span>Notify me when live</span>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-background text-foreground">
          <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
        </span>
      </a>
      <Link
        href="/"
        className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-5 h-11 text-sm font-medium hover:border-foreground hover:text-accent transition-colors"
      >
        <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to home
      </Link>
    </motion.div>
  );
}
