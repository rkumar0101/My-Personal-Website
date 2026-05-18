"use client";

import { motion } from "framer-motion";
import { PenTool, Code2 } from "lucide-react";
import { bio } from "@/lib/data";

export function Bio() {
  return (
    <section
      id="bio"
      className="relative py-24 md:py-32 border-b border-border overflow-hidden"
    >
      {/* Subtle background grid for depth */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-center md:text-left"
        >
          Who I am<span className="text-accent">?</span>
        </motion.h2>

        {/* Intro line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 md:mt-10 text-2xl md:text-3xl text-foreground/85 tracking-[-0.01em] text-center md:text-left"
        >
          {bio.intro}
        </motion.p>

        {/* Twin columns */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <HalfCard
            icon={<PenTool className="size-5" />}
            label={bio.writer.label}
            body={bio.writer.body}
            tags={bio.writer.tags}
            delay={0}
          />
          <HalfCard
            icon={<Code2 className="size-5" />}
            label={bio.builder.label}
            body={bio.builder.body}
            tags={bio.builder.tags}
            delay={0.12}
          />
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12 md:mt-14 text-lg md:text-xl text-muted leading-relaxed text-center md:text-left max-w-3xl md:mx-0 mx-auto"
        >
          {bio.closing}
        </motion.p>
      </div>
    </section>
  );
}

function HalfCard({
  icon,
  label,
  body,
  tags,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  body: string;
  tags: string[];
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-border bg-background p-7 md:p-9 transition-all duration-300 hover:border-foreground hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_12px_40px_-12px_rgba(239,68,68,0.15)]"
    >
      {/* Accent rail (left edge) */}
      <div className="absolute top-7 left-0 h-12 w-[3px] rounded-r-full bg-accent scale-y-50 group-hover:scale-y-100 transition-transform duration-500 origin-center" />

      {/* Label row */}
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
          {icon}
        </span>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          {label}
        </p>
      </div>

      {/* Body */}
      <p className="text-xl md:text-2xl leading-[1.35] tracking-[-0.005em] text-foreground">
        {body}
      </p>

      {/* Tags */}
      <ul className="mt-7 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted group-hover:border-border-strong transition-colors"
          >
            {tag}
          </li>
        ))}
      </ul>

      {/* Bottom hover line */}
      <div className="absolute bottom-0 left-7 right-7 h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
    </motion.article>
  );
}
