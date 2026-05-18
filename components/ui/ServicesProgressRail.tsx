"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServicesProgressRailProps {
  services: { id: string; number: string; title: string }[];
}

export function ServicesProgressRail({ services }: ServicesProgressRailProps) {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  // Show only when the Services section is in view
  useEffect(() => {
    const wrapper = document.getElementById("services");
    if (!wrapper) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(wrapper);
    return () => io.disconnect();
  }, []);

  // Track which service is currently active (closest to viewport top)
  useEffect(() => {
    const elements = services
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries.filter((e) => e.isIntersecting);
        if (inView.length === 0) return;
        // Prefer the one closest to the top
        const top = inView.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActive((top.target as HTMLElement).id);
      },
      { rootMargin: "-30% 0% -55% 0%", threshold: 0 },
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [services]);

  return (
    <motion.nav
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        x: visible ? 0 : 12,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3"
      aria-label="Services navigation"
    >
      {services.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group relative flex items-center py-1 pl-3"
            aria-label={`Jump to ${s.title}`}
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={cn(
                "absolute right-full mr-3 whitespace-nowrap rounded-full bg-background/90 backdrop-blur-md border border-border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em]",
                "transition-all duration-300",
                isActive
                  ? "opacity-100 translate-x-0 text-foreground"
                  : "opacity-0 -translate-x-1 text-muted group-hover:opacity-100 group-hover:translate-x-0",
              )}
            >
              <span className="text-accent font-mono mr-1.5">{s.number}</span>
              {s.title}
            </span>

            <span
              className={cn(
                "rounded-full transition-all duration-300",
                isActive
                  ? "size-2.5 bg-accent ring-4 ring-accent/15"
                  : "size-1.5 bg-border-strong group-hover:bg-foreground",
              )}
            />
          </a>
        );
      })}
    </motion.nav>
  );
}
