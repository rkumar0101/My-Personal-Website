"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { hero } from "@/lib/data";
import { Counter } from "@/components/ui/Counter";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border min-h-[640px] sm:min-h-[640px] md:min-h-[660px]"
    >
      {/* Hero images — art-directed per viewport + theme-swapped via CSS dark: variants */}
      <div className="absolute inset-0">
        {/* MOBILE wrapper */}
        <div className="md:hidden absolute inset-0">
          {/* Mobile light */}
          <div className="absolute inset-0 block dark:hidden">
            <Image
              src={hero.imageMobileLight}
              alt="Rishav Kumar, writer and digital builder"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: "center 20%" }}
              sizes="100vw"
            />
          </div>
          {/* Mobile dark */}
          <div className="absolute inset-0 hidden dark:block">
            <Image
              src={hero.imageMobile}
              alt="Rishav Kumar, writer and digital builder"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: "center 20%" }}
              sizes="100vw"
            />
          </div>
        </div>

        {/* DESKTOP wrapper */}
        <div className="hidden md:block absolute inset-0">
          {/* Desktop light */}
          <div className="absolute inset-0 block dark:hidden">
            <Image
              src={hero.imageLight}
              alt="Rishav Kumar, writer and digital builder"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
              sizes="100vw"
            />
          </div>
          {/* Desktop dark */}
          <div className="absolute inset-0 hidden dark:block">
            <Image
              src={hero.image}
              alt="Rishav Kumar, writer and digital builder"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
              sizes="100vw"
            />
          </div>
        </div>

        {/* Mobile: bottom-up overlay (white in light mode, black in dark mode) */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent pointer-events-none" />
        {/* Desktop: left-side dim (white in light mode, black in dark mode) */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-white/95 via-white/55 to-transparent dark:from-black/95 dark:via-black/55 dark:to-transparent pointer-events-none" />
        {/* Universal soft bottom fade for counter pill clearance */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/60 to-transparent dark:from-black/55 dark:to-transparent pointer-events-none" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 pt-12 md:pt-16 pb-24 md:pb-28 min-h-[640px] sm:min-h-[640px] md:min-h-[660px] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="lg:max-w-[55%] xl:max-w-[50%] flex flex-col gap-5 md:gap-6 mt-auto md:mt-0 mb-16 md:mb-0"
        >
          {/* Eyebrow — theme-aware via foreground/background tokens */}
          <div className="self-start inline-flex items-center gap-2.5 rounded-full border border-foreground/20 bg-foreground/10 backdrop-blur-md px-3.5 py-1.5 md:px-4 md:py-2 text-[11px] md:text-xs font-medium text-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {hero.eyebrow}
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.25rem,8vw,5rem)] font-medium tracking-[-0.035em] leading-[0.95] text-foreground">
            <span className="block">{hero.headline[0]}</span>
            <span className="block">
              <span className="text-accent">digital</span>{" "}
              builder.
            </span>
          </h1>

          {/* Tiny subline (location tag) */}
          <p className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-foreground/55">
            {hero.subline}
          </p>

          {/* CTA — bg-foreground flips dark/light automatically */}
          <div className="pt-2 flex justify-center md:justify-start">
            <a
              href={hero.primaryCta.href}
              className="group/cta inline-flex items-center gap-2.5 rounded-full bg-foreground text-background pl-7 pr-2 text-base md:text-[17px] font-medium hover:bg-foreground/95 transition-all active:scale-[0.98] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)]"
              style={{ height: "3.5rem" }}
            >
              <span>{hero.primaryCta.label}</span>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-background text-foreground">
                <ArrowUpRight className="size-[18px] transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Counter pill — theme-aware glass */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-4 md:bottom-7 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] sm:w-auto max-w-[420px] sm:max-w-none flex justify-center"
      >
        <div className="relative overflow-hidden rounded-full border border-foreground/15 bg-foreground/10 backdrop-blur-xl shadow-[0_8px_24px_-10px_rgba(0,0,0,0.4)]">
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
          <div className="relative flex items-center gap-3 sm:gap-4 md:gap-6 px-4 sm:px-5 md:px-6 py-2 md:py-3">
            {hero.highlights.map((h, i) => (
              <div
                key={h.label}
                className="flex items-center gap-3 sm:gap-4 md:gap-6"
              >
                <div className="flex items-baseline gap-1.5 md:gap-2">
                  <span className="text-base sm:text-lg md:text-xl font-semibold tracking-[-0.02em] leading-none text-foreground">
                    <Counter
                      value={h.value}
                      suffix={h.suffix}
                      immediate
                      delay={500 + i * 150}
                    />
                  </span>
                  <span className="text-[9px] sm:text-[10px] md:text-[11px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em] text-foreground/70 whitespace-nowrap">
                    {h.label}
                  </span>
                </div>
                {i < hero.highlights.length - 1 && (
                  <span className="h-4 w-px bg-foreground/15" />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
