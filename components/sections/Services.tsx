"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  PenTool,
  Code2,
  TrendingUp,
  Database,
  Workflow,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { services, type Service } from "@/lib/data";
import StickyTabs from "@/components/ui/StickyTabs";
import { ServiceHero } from "@/components/ui/ServiceHero";
import { ServicesProgressRail } from "@/components/ui/ServicesProgressRail";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  "pen-tool": PenTool,
  code: Code2,
  "trending-up": TrendingUp,
  database: Database,
  workflow: Workflow,
} as const;

export function Services() {
  return (
    <section
      id="services"
      className="relative border-b border-border overflow-clip"
    >
      {/* Floating progress rail (right side, desktop only) */}
      <ServicesProgressRail
        services={services.map((s) => ({
          id: s.id,
          number: s.number,
          title: s.title,
        }))}
      />

      {/* Master header (not sticky) */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-24 md:pt-32 pb-12 md:pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-center md:text-left"
        >
          What I do<span className="text-accent">?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 text-sm md:text-base text-muted max-w-xl text-center md:text-left mx-auto md:mx-0"
        >
          Two services live and taking new clients. Three more in the works.
          Scroll through, each one sticks at the top while you read.
        </motion.p>
      </div>

      {/* Sticky service sections — body is full-bleed (bodyClassName empty) */}
      <StickyTabs bodyClassName="">
        {services.map((service) => (
          <StickyTabs.Item
            key={service.id}
            id={service.id}
            title={<ServiceTitle service={service} />}
            meta={<StatusBadge status={service.status} />}
            action={<ServiceAction service={service} />}
          >
            {/* 1) Cinema hero (full-bleed video/image + overlay tagline + CTA) */}
            <ServiceHero service={service} />

            {/* 2) Details container (max-width, normal padding) */}
            <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                {/* What you get */}
                <DetailBlock label="What you get" delay={0.05}>
                  <ul className="space-y-3">
                    {service.whatYouGet.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[15px] text-foreground/85 leading-snug"
                      >
                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-accent shrink-0">
                          <Check className="size-3" strokeWidth={2.5} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </DetailBlock>

                {/* Best for */}
                <DetailBlock label="Best for" delay={0.15}>
                  <ul className="space-y-2.5">
                    {service.bestFor.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[15px] text-foreground/80 leading-snug"
                      >
                        <span className="mt-2 size-1 rounded-full bg-accent shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </DetailBlock>

                {/* Tools */}
                <DetailBlock label="Tools and stack" delay={0.25}>
                  <div className="flex flex-wrap gap-2">
                    {service.tools.map((tool) => (
                      <span
                        key={tool}
                        className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-foreground/80"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </DetailBlock>
              </div>
            </div>
          </StickyTabs.Item>
        ))}
      </StickyTabs>
    </section>
  );
}

// =============================================================
// Sticky header pieces
// =============================================================

function ServiceTitle({ service }: { service: Service }) {
  const Icon = ICON_MAP[service.iconName];
  return (
    <div className="flex items-center gap-3 min-w-0">
      <span
        className={cn(
          "inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl shrink-0",
          service.status === "live"
            ? "bg-accent-soft text-accent"
            : "bg-surface-elevated text-muted",
        )}
      >
        <Icon className="size-4 md:size-5" />
      </span>
      <span className="flex items-baseline gap-2 min-w-0">
        <span className="font-mono text-xs md:text-sm text-muted shrink-0">
          {`{${service.number}}`}
        </span>
        <span className="truncate">{service.title}</span>
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: "live" | "soon" }) {
  return status === "live" ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 border border-success/20 px-2.5 py-1 text-[11px] font-medium text-success">
      <span className="size-1.5 rounded-full bg-success animate-pulse" />
      Taking clients
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface border border-border-strong px-2.5 py-1 text-[11px] font-medium text-muted">
      Coming soon
    </span>
  );
}

function ServiceAction({ service }: { service: Service }) {
  return (
    <Link
      href={service.cta.href}
      className={cn(
        "group/cta inline-flex items-center gap-2 rounded-full text-sm font-medium transition-all active:scale-[0.98]",
        service.status === "live"
          ? "bg-accent text-accent-foreground hover:bg-accent/90 h-9 pl-4 pr-1.5"
          : "border border-border-strong text-foreground hover:border-foreground h-9 px-4",
      )}
    >
      <span>{service.cta.label}</span>
      {service.status === "live" && (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-foreground text-accent">
          <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
        </span>
      )}
    </Link>
  );
}

// =============================================================
// Detail block (label + content)
// =============================================================

function DetailBlock({
  label,
  children,
  delay,
}: {
  label: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-[11px] md:text-xs font-medium uppercase tracking-[0.18em] text-subtle mb-4">
        {label}
      </p>
      {children}
    </motion.div>
  );
}
