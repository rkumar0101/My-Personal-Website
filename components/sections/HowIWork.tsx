"use client";

import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenTool,
  Code2,
  TrendingUp,
  Workflow,
  ChevronDown,
} from "lucide-react";
import {
  howIWork,
  type HowIWorkStage,
  type HowIWorkDiscipline,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  "pen-tool": PenTool,
  code: Code2,
  "trending-up": TrendingUp,
  workflow: Workflow,
} as const;

export function HowIWork() {
  const [hoveredDiscipline, setHoveredDiscipline] = useState<string | null>(
    null,
  );
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const [openDiscipline, setOpenDiscipline] = useState<string | null>(
    howIWork.disciplines[0].key,
  );

  return (
    <section
      id="how-i-work"
      className="relative py-24 md:py-32 border-b border-border overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Header — matches Bio section pattern (H2 + small subtext, no eyebrow) */}
        <div className="max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-center md:text-left"
          >
            How I work<span className="text-accent">?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-sm md:text-base text-muted max-w-xl text-center md:text-left mx-auto md:mx-0"
          >
            {howIWork.intro.body}
          </motion.p>
        </div>

        {/* DESKTOP: Process Atlas grid */}
        <div
          onMouseLeave={() => {
            setHoveredDiscipline(null);
            setHoveredStage(null);
          }}
          className="hidden lg:grid relative mt-16 grid-cols-[220px_repeat(4,_1fr)] gap-px bg-border rounded-2xl overflow-hidden border border-border"
        >
          {/* Top-left placeholder */}
          <div className="bg-background p-5 flex items-end">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-subtle leading-tight">
              Discipline
              <br />× Stage
            </span>
          </div>

          {/* Stage column headers */}
          {howIWork.stages.map((stage, colIdx) => (
            <StageHeader
              key={stage}
              stage={stage}
              index={colIdx}
              isHover={hoveredStage === stage}
              onHover={setHoveredStage}
            />
          ))}

          {/* Discipline rows */}
          {howIWork.disciplines.map((d, rowIdx) => (
            <Fragment key={d.key}>
              <DisciplineHeader
                discipline={d}
                isHover={hoveredDiscipline === d.key}
                onHover={setHoveredDiscipline}
              />
              {howIWork.stages.map((stage, colIdx) => (
                <AtlasCell
                  key={`${d.key}-${stage}`}
                  items={d.cells[stage]}
                  rowIdx={rowIdx}
                  colIdx={colIdx}
                  isDimmed={
                    (hoveredDiscipline !== null &&
                      hoveredDiscipline !== d.key) ||
                    (hoveredStage !== null && hoveredStage !== stage)
                  }
                  onHover={() => {
                    setHoveredDiscipline(d.key);
                    setHoveredStage(stage);
                  }}
                />
              ))}
            </Fragment>
          ))}
        </div>

        {/* MOBILE / TABLET: Accordion per discipline */}
        <div className="lg:hidden mt-12 flex flex-col gap-3">
          {howIWork.disciplines.map((d, i) => (
            <AccordionItem
              key={d.key}
              discipline={d}
              isOpen={openDiscipline === d.key}
              onToggle={() =>
                setOpenDiscipline(openDiscipline === d.key ? null : d.key)
              }
              index={i}
            />
          ))}
        </div>

        {/* "What I do not do" callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 mx-auto max-w-3xl rounded-2xl border border-dashed border-border-strong bg-surface/50 px-6 py-5 text-center"
        >
          <p className="text-muted">
            <span className="text-foreground font-medium">
              What I do not do:
            </span>{" "}
            ship before it is ready, pad word counts, over-engineer when simple
            works, or skip the post-ship check.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================
// Stage column header
// =============================================================
function StageHeader({
  stage,
  index,
  isHover,
  onHover,
}: {
  stage: HowIWorkStage;
  index: number;
  isHover: boolean;
  onHover: (s: HowIWorkStage | null) => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={() => onHover(stage)}
      className={cn(
        "bg-background p-5 text-left transition-all duration-200 border-b-2 cursor-default",
        isHover ? "border-accent bg-surface" : "border-transparent",
      )}
    >
      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-accent block">
        {`0${index + 1}`}
      </span>
      <span
        className={cn(
          "mt-1.5 block font-medium text-lg tracking-tight transition-colors",
          isHover ? "text-foreground" : "text-foreground/85",
        )}
      >
        {stage}
      </span>
    </button>
  );
}

// =============================================================
// Discipline row header
// =============================================================
function DisciplineHeader({
  discipline,
  isHover,
  onHover,
}: {
  discipline: HowIWorkDiscipline;
  isHover: boolean;
  onHover: (k: string | null) => void;
}) {
  const Icon = ICON_MAP[discipline.iconName];
  const isLive = discipline.status === "live";

  return (
    <button
      type="button"
      onMouseEnter={() => onHover(discipline.key)}
      className={cn(
        "bg-background p-5 text-left transition-all duration-200 border-r-2 cursor-default",
        isHover ? "border-accent bg-surface" : "border-transparent",
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
            isLive
              ? "bg-accent-soft text-accent"
              : "bg-surface-elevated text-muted",
          )}
        >
          <Icon className="size-4" />
        </span>
        <span className="font-medium text-base tracking-tight">
          {discipline.label}
        </span>
      </div>
      <span
        className={cn(
          "mt-3 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium",
          isLive
            ? "bg-success/10 text-success border border-success/20"
            : "bg-surface text-subtle border border-border-strong",
        )}
      >
        {isLive ? (
          <>
            <span className="size-1 rounded-full bg-success animate-pulse" />
            Taking clients
          </>
        ) : (
          "Coming soon"
        )}
      </span>
    </button>
  );
}

// =============================================================
// Atlas cell (inner)
// =============================================================
function AtlasCell({
  items,
  rowIdx,
  colIdx,
  isDimmed,
  onHover,
}: {
  items: readonly string[];
  rowIdx: number;
  colIdx: number;
  isDimmed: boolean;
  onHover: () => void;
}) {
  return (
    <div
      onMouseEnter={onHover}
      className={cn(
        "relative bg-background p-4 transition-all duration-300 hover:bg-surface/70",
        isDimmed && "opacity-35",
      )}
    >
      <motion.ul
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.4,
          delay: (rowIdx + colIdx) * 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="space-y-2"
      >
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-[13px] leading-snug"
          >
            <span className="mt-1.5 size-1 rounded-full bg-accent shrink-0" />
            <span className="text-foreground/80">{item}</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

// =============================================================
// Mobile accordion item
// =============================================================
function AccordionItem({
  discipline,
  isOpen,
  onToggle,
  index,
}: {
  discipline: HowIWorkDiscipline;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const Icon = ICON_MAP[discipline.iconName];
  const isLive = discipline.status === "live";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        "rounded-2xl border bg-background overflow-hidden transition-colors",
        isOpen ? "border-foreground" : "border-border",
      )}
    >
      {/* Header (tap to toggle) */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-xl",
              isLive
                ? "bg-accent-soft text-accent"
                : "bg-surface-elevated text-muted",
            )}
          >
            <Icon className="size-4" />
          </span>
          <div>
            <p className="font-medium tracking-tight">{discipline.label}</p>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em]">
              <span
                className={cn(
                  isLive ? "text-success" : "text-subtle",
                )}
              >
                {isLive ? "Taking clients" : "Coming soon"}
              </span>
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "size-5 text-muted transition-transform duration-300",
            isOpen && "rotate-180 text-accent",
          )}
        />
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {howIWork.stages.map((stage, i) => (
                <div key={stage}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-accent">
                      {`0${i + 1}`}
                    </span>
                    <span className="text-sm font-medium tracking-tight">
                      {stage}
                    </span>
                  </div>
                  <ul className="space-y-1.5 pl-4 border-l border-border">
                    {discipline.cells[stage].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[13px] leading-snug"
                      >
                        <span className="mt-1.5 size-1 rounded-full bg-accent shrink-0" />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
