"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PenTool, GraduationCap, Briefcase } from "lucide-react";
import { companies } from "@/lib/data";

const ICON_MAP = {
  "pen-tool": PenTool,
  "graduation-cap": GraduationCap,
  briefcase: Briefcase,
} as const;

// Fixed visual height for every item — keeps all logos on one baseline
const ITEM_HEIGHT = "h-11"; // 44px (was 40, +10%)

export function LogoStripe() {
  // Duplicate the list so the marquee loops seamlessly
  const loop = [...companies, ...companies];

  return (
    <section className="py-14 md:py-20 border-b border-border bg-surface/40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8 mb-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-medium uppercase tracking-[0.18em] text-subtle"
        >
          Trusted by teams I have written and built for
        </motion.p>
      </div>

      <div className="relative">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 z-10 h-full w-24 md:w-40 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-10 h-full w-24 md:w-40 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none" />

        <div className="flex w-max animate-marquee items-center gap-16 md:gap-20">
          {loop.map((c, i) => (
            <LogoItem key={`${c.name}-${i}`} company={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoItem({ company }: { company: (typeof companies)[number] }) {
  if (company.logo) {
    return (
      <div
        className={`group relative inline-flex items-center justify-center ${ITEM_HEIGHT} shrink-0`}
      >
        <Image
          src={company.logo}
          alt={company.name}
          width={company.width ?? 154}
          height={64}
          className="object-contain
                     saturate-0 opacity-70 transition-all duration-300 ease-out
                     group-hover:saturate-100 group-hover:opacity-100 group-hover:scale-[1.04]
                     dark:invert dark:opacity-80
                     dark:group-hover:opacity-100 dark:group-hover:hue-rotate-180 dark:group-hover:brightness-110"
          style={{
            width: "auto",
            height: "2.75rem",
            maxWidth: `${company.width ?? 154}px`,
          }}
          unoptimized
        />
      </div>
    );
  }

  // Icon fallback — sized to match logo height for baseline alignment
  const Icon = company.iconName ? ICON_MAP[company.iconName] : Briefcase;
  return (
    <div
      className={`group inline-flex items-center gap-3 shrink-0 ${ITEM_HEIGHT}`}
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border-strong bg-background text-muted group-hover:text-accent group-hover:border-foreground group-hover:scale-[1.04] transition-all duration-300 ease-out">
        <Icon className="size-[22px]" />
      </span>
      <span className="text-base md:text-lg font-medium tracking-tight text-muted group-hover:text-foreground transition-colors whitespace-nowrap">
        {company.name}
      </span>
    </div>
  );
}
