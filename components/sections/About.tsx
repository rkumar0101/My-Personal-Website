"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Calendar,
  ArrowUpRight,
  MapPin,
  Briefcase,
} from "lucide-react";
import {
  about,
  site,
  type AboutMilestone,
  type AboutFact,
  type AboutLanguage,
} from "@/lib/data";
import { cn } from "@/lib/utils";

// =============================================================
// Main section
// =============================================================
export function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 border-b border-border overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-20 pointer-events-none" />
      <div className="absolute -top-32 -left-40 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Header />

        {/* Lead row: story + portrait polaroid */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <Story />
          <Portrait />
        </div>

        {/* Career timeline */}
        <Timeline />

        {/* Facts + Languages */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <FactsBlock />
          <LanguagesBlock />
        </div>

        {/* Bottom CTA */}
        <CtaRow />
      </div>
    </section>
  );
}

// =============================================================
// Header (Bio convention)
// =============================================================
function Header() {
  return (
    <div className="max-w-3xl">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-center md:text-left"
      >
        About me<span className="text-accent">?</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-5 text-sm md:text-base text-muted max-w-xl text-center md:text-left mx-auto md:mx-0"
      >
        The long story, told short. Where I started, what I do now, and the
        path between.
      </motion.p>
    </div>
  );
}

// =============================================================
// Lead story column (text)
// =============================================================
function Story() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="lg:col-span-7 space-y-5 md:space-y-6"
    >
      {about.story.map((para, i) => (
        <p
          key={i}
          className={cn(
            "leading-[1.55] text-foreground",
            i === 0
              ? "text-xl md:text-2xl lg:text-[1.6rem] tracking-[-0.01em]"
              : "text-base md:text-lg text-foreground/85",
          )}
        >
          {i === 0 ? (
            <>
              <span className="float-left mr-2 -mt-1 font-serif italic text-accent text-5xl md:text-6xl leading-[0.85]">
                {para.charAt(0)}
              </span>
              {para.slice(1)}
            </>
          ) : (
            para
          )}
        </p>
      ))}
    </motion.div>
  );
}

// =============================================================
// Portrait polaroid (theme-aware via hero mobile image)
// =============================================================
function Portrait() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="lg:col-span-5 mx-auto lg:mx-0 max-w-sm w-full"
    >
      <div className="group relative rotate-[-2deg] hover:rotate-0 transition-transform duration-500 ease-out bg-background p-3 pb-5 rounded-sm border border-border-strong shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] dark:shadow-[0_24px_60px_-20px_rgba(239,68,68,0.18)]">
        {/* Decorative "tape" on top */}
        <span
          aria-hidden
          className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-3 h-5 w-20 bg-accent/30 backdrop-blur-sm rounded-sm border border-accent/30"
        />

        {/* Image — light + dark variants of his portrait */}
        <div className="relative aspect-[3/4] overflow-hidden bg-foreground rounded-sm">
          <Image
            src="/hero/1-mobile-light.png"
            alt="Rishav Kumar portrait"
            fill
            className="object-cover block dark:hidden"
            sizes="(max-width: 1024px) 80vw, 30vw"
          />
          <Image
            src="/hero/1-mobile.png"
            alt="Rishav Kumar portrait"
            fill
            className="object-cover hidden dark:block"
            sizes="(max-width: 1024px) 80vw, 30vw"
          />
        </div>

        {/* Caption */}
        <p className="mt-4 text-center font-serif italic text-sm text-foreground/80">
          Rishav, Kolkata · 2026
        </p>

        {/* Bottom hover line */}
        <span className="absolute bottom-0 left-4 right-4 h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500" />
      </div>
    </motion.div>
  );
}

// =============================================================
// Career timeline (5 milestones in a horizontal grid)
// =============================================================
function Timeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16 md:mt-24"
    >
      <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle mb-6">
        Career timeline
      </p>

      {/* Horizontal milestones */}
      <div className="relative">
        {/* Decorative connecting line behind dots (visible on lg+ only) */}
        <span
          aria-hidden
          className="hidden lg:block absolute left-3 right-3 top-[14px] h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"
        />

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
          {about.timeline.map((m, i) => (
            <Milestone key={i} milestone={m} index={i} />
          ))}
        </ol>
      </div>
    </motion.div>
  );
}

function Milestone({
  milestone,
  index,
}: {
  milestone: AboutMilestone;
  index: number;
}) {
  const isLast = index === about.timeline.length - 1;
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group/m relative"
    >
      {/* Dot */}
      <div className="relative flex items-center mb-3">
        <span
          className={cn(
            "size-3 rounded-full ring-4 ring-background relative z-10 transition-all duration-300",
            isLast
              ? "bg-accent shadow-[0_0_18px_rgba(239,68,68,0.55)]"
              : "bg-foreground/50 group-hover/m:bg-accent",
          )}
        >
          {isLast && (
            <span className="absolute inset-0 rounded-full bg-accent opacity-50 animate-ping" />
          )}
        </span>
      </div>

      {/* Year */}
      <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-accent">
        {milestone.year}
      </p>

      {/* Company */}
      <h4 className="mt-1.5 text-base md:text-lg font-medium tracking-tight text-foreground">
        {milestone.company}
      </h4>

      {/* Role + location */}
      <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
        <span>{milestone.role}</span>
        <span className="size-1 rounded-full bg-border-strong" />
        <span>{milestone.location}</span>
      </div>

      {/* Note */}
      <p className="mt-2.5 text-[13px] text-foreground/70 leading-relaxed">
        {milestone.note}
      </p>
    </motion.li>
  );
}

// =============================================================
// Facts block (6 quick facts in 2x3 grid)
// =============================================================
function FactsBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="lg:col-span-7"
    >
      <div className="flex items-center gap-2 mb-5">
        <Briefcase className="size-3.5 text-accent" />
        <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">
          Quick facts
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
        {about.facts.map((f, i) => (
          <FactCell key={f.label} fact={f} delay={i * 0.04} />
        ))}
      </div>
    </motion.div>
  );
}

function FactCell({ fact, delay }: { fact: AboutFact; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
      className="group/fact bg-background hover:bg-surface transition-colors px-5 py-5 md:py-6"
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-subtle">
        {fact.label}
      </p>
      <p className="mt-2 font-medium text-foreground text-[15px] md:text-base group-hover/fact:text-accent transition-colors">
        {fact.value}
      </p>
    </motion.div>
  );
}

// =============================================================
// Languages block
// =============================================================
function LanguagesBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="lg:col-span-5"
    >
      <div className="flex items-center gap-2 mb-5">
        <MapPin className="size-3.5 text-accent" />
        <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">
          Languages
        </p>
      </div>

      <ul className="rounded-2xl border border-border bg-background overflow-hidden divide-y divide-border">
        {about.languages.map((l, i) => (
          <LanguageRow key={l.code} lang={l} delay={i * 0.05} />
        ))}
      </ul>
    </motion.div>
  );
}

function LanguageRow({
  lang,
  delay,
}: {
  lang: AboutLanguage;
  delay: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay }}
      className="group/lang flex items-center gap-4 px-5 py-3.5 hover:bg-surface transition-colors"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent font-mono text-[11px] font-bold group-hover/lang:scale-105 transition-transform">
        {lang.code}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground text-[15px]">{lang.name}</p>
        <p className="text-[11px] text-muted font-mono">{lang.level}</p>
      </div>
    </motion.li>
  );
}

// =============================================================
// Bottom CTA row
// =============================================================
function CtaRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mt-16 md:mt-20 rounded-2xl border border-border bg-gradient-to-br from-surface/60 to-background overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 p-7 md:p-10 items-center">
        <div className="md:col-span-7">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight leading-snug">
            Want the formal version, or to{" "}
            <span className="text-accent">just talk?</span>
          </h3>
          <p className="mt-3 text-sm md:text-base text-muted max-w-xl">
            Drop a mail, or grab a slot on the calendar. I reply within one
            working day, most days.
          </p>
        </div>

        <div className="md:col-span-5 flex flex-wrap items-center gap-3 md:justify-end">
          <a
            href={`mailto:${site.email}`}
            className="group/cta inline-flex items-center gap-2 rounded-full border border-border-strong px-5 h-11 text-sm font-medium hover:border-foreground hover:text-accent transition-colors"
          >
            <Mail className="size-4" />
            Email me
          </a>
          <a
            href={site.bookCall}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta inline-flex items-center gap-2 rounded-full bg-foreground text-background h-11 pl-5 pr-2 text-sm font-medium hover:bg-foreground/90 transition-all active:scale-[0.98]"
          >
            <Calendar className="size-4" />
            <span>Book a call</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-background text-foreground">
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
