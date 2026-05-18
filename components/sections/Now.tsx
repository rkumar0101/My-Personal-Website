"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PenTool,
  Hammer,
  GraduationCap,
  BookOpen,
  MapPin,
} from "lucide-react";
import { now, type NowProject } from "@/lib/data";
import { cn } from "@/lib/utils";

// =============================================================
// Main section
// =============================================================
export function Now() {
  return (
    <section
      id="now"
      className="relative py-24 md:py-32 border-b border-border bg-surface/30 overflow-hidden"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 -left-40 h-[380px] w-[380px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Header />

        {/* Bento status grid */}
        <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          <WritingCard />
          <BuildingCard />
          <LearningCard />
          <ReadingCard />
          <LocationCard />
        </div>
      </div>
    </section>
  );
}

// =============================================================
// Header (Bio convention)
// =============================================================
function Header() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-center lg:text-left"
        >
          Right now<span className="text-accent">?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 text-sm md:text-base text-muted max-w-xl text-center lg:text-left mx-auto lg:mx-0"
        >
          A status snapshot. What is on my desk this week, what I am building,
          what I am learning. Updated when life shifts.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="self-center lg:self-end inline-flex items-center gap-2 rounded-full border border-border-strong bg-background px-3 py-1.5 text-[11px] font-medium text-muted"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        Updated{" "}
        {new Date(now.updated).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </motion.div>
    </div>
  );
}

// =============================================================
// Card shell — consistent styling for every card
// =============================================================
function NowCard({
  className,
  icon: Icon,
  label,
  delay = 0,
  children,
}: {
  className?: string;
  icon: typeof PenTool;
  label: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative col-span-1 md:col-span-12 rounded-2xl border border-border bg-background p-6 md:p-7 transition-all duration-300 hover:border-foreground hover:-translate-y-0.5",
        className,
      )}
    >
      {/* Header row */}
      <div className="flex items-center gap-2.5 mb-5">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent group-hover:scale-105 transition-transform">
          <Icon className="size-4" />
        </span>
        <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          {label}
        </span>
      </div>

      {children}

      {/* Bottom accent rail (hover) */}
      <span className="absolute bottom-0 left-6 right-6 h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
    </motion.div>
  );
}

// =============================================================
// Writing card (col-span 5) — single focus + weekly progress
// =============================================================
function WritingCard() {
  const w = now.writing;
  return (
    <NowCard
      icon={PenTool}
      label="Writing"
      delay={0}
      className="md:col-span-5"
    >
      <p className="text-xl md:text-2xl font-medium tracking-tight leading-snug text-foreground">
        {w.body}
        <BlinkingCursor />
      </p>

      {/* Weekly progress */}
      <div className="mt-7 pt-5 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-subtle">
            {w.meta}
          </span>
          <span className="text-[11px] font-medium text-foreground">
            {w.progressLabel}
          </span>
        </div>
        <ProgressBar value={w.progress} delay={0.3} />
      </div>
    </NowCard>
  );
}

// =============================================================
// Building card (col-span 7) — multiple projects + progress
// =============================================================
function BuildingCard() {
  const b = now.building;
  return (
    <NowCard
      icon={Hammer}
      label="Building"
      delay={0.08}
      className="md:col-span-7"
    >
      <p className="text-xl md:text-2xl font-medium tracking-tight leading-snug text-foreground">
        {b.body}
      </p>

      <ul className="mt-7 pt-5 border-t border-border space-y-3.5">
        {b.projects.map((p, i) => (
          <ProjectRow key={p.name} project={p} delay={0.2 + i * 0.08} />
        ))}
      </ul>
    </NowCard>
  );
}

function ProjectRow({
  project,
  delay,
}: {
  project: NowProject;
  delay: number;
}) {
  const status =
    project.progress >= 80
      ? "Shipping soon"
      : project.progress >= 40
        ? "In progress"
        : "Early build";

  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className="grid grid-cols-12 items-center gap-3"
    >
      <span className="col-span-12 sm:col-span-4 text-sm font-medium text-foreground truncate">
        {project.name}
      </span>
      <div className="col-span-9 sm:col-span-6">
        <ProgressBar value={project.progress} delay={delay + 0.15} />
      </div>
      <span className="col-span-3 sm:col-span-2 text-right font-mono text-[11px] text-muted">
        {project.progress}%
      </span>
      <span className="col-span-12 sm:hidden text-[10px] font-mono uppercase tracking-[0.14em] text-subtle">
        {status}
      </span>
    </motion.li>
  );
}

// =============================================================
// Learning card (col-span 4) — tags
// =============================================================
function LearningCard() {
  const l = now.learning;
  return (
    <NowCard
      icon={GraduationCap}
      label="Learning"
      delay={0.16}
      className="md:col-span-4"
    >
      <p className="text-base md:text-lg font-medium leading-snug text-foreground">
        {l.body}
      </p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {l.tags.map((t, i) => (
          <motion.li
            key={t}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
            className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground/80"
          >
            {t}
          </motion.li>
        ))}
      </ul>
    </NowCard>
  );
}

// =============================================================
// Reading card (col-span 4) — book progress
// =============================================================
function ReadingCard() {
  const r = now.reading;
  return (
    <NowCard
      icon={BookOpen}
      label="Reading"
      delay={0.22}
      className="md:col-span-4"
    >
      <p className="text-base md:text-lg font-medium leading-snug text-foreground">
        {r.body}
      </p>

      <div className="mt-auto pt-5 mt-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-subtle">
            {r.meta}
          </span>
          <span className="text-[11px] font-medium text-foreground">
            {r.progress}%
          </span>
        </div>
        <ProgressBar value={r.progress} delay={0.4} />
      </div>
    </NowCard>
  );
}

// =============================================================
// Location card (col-span 4) — live clock for Kolkata
// =============================================================
function LocationCard() {
  const l = now.location;
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    function update() {
      try {
        const t = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: l.timezone,
        }).format(new Date());
        setTime(t);
      } catch {
        setTime("");
      }
    }
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [l.timezone]);

  return (
    <NowCard
      icon={MapPin}
      label="Based in"
      delay={0.28}
      className="md:col-span-4"
    >
      <p className="text-2xl md:text-3xl font-medium tracking-tight leading-none text-foreground">
        {l.city}
      </p>
      <p className="mt-1.5 text-sm text-muted">{l.region}</p>

      {/* Live clock + coords */}
      <div className="mt-auto pt-5 mt-6 flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-subtle">
            Local time
          </p>
          <p className="mt-1 font-mono text-2xl tracking-tight tabular-nums text-foreground inline-flex items-center gap-1.5">
            {time || "--:--"}
            <span className="text-[10px] text-muted tracking-[0.12em]">
              IST
            </span>
            <span className="relative flex h-1.5 w-1.5 ml-1">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
          </p>
        </div>
        <p className="text-[10px] font-mono text-muted text-right leading-snug">
          {l.coords}
        </p>
      </div>
    </NowCard>
  );
}

// =============================================================
// Shared bits
// =============================================================
function ProgressBar({ value, delay = 0 }: { value: number; delay?: number }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-foreground/10 overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: value / 100 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 1,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-full origin-left rounded-full bg-accent"
      />
    </div>
  );
}

function BlinkingCursor() {
  return (
    <span
      aria-hidden
      className="inline-block w-[2px] h-[1em] align-middle ml-1.5 -mb-0.5 bg-accent"
      style={{ animation: "cursor-blink 1.1s steps(2) infinite" }}
    />
  );
}
