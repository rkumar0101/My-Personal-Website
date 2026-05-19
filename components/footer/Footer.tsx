"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Calendar,
  ArrowUpRight,
  ArrowUp,
  Code2,
  Rss,
} from "lucide-react";
import {
  LinkedinIcon,
  GithubIcon,
  XIcon,
} from "@/components/ui/BrandIcons";
import { ThemeToggle } from "@/components/nav/ThemeToggle";
import { site } from "@/lib/data";

const REPO_URL = "https://github.com/rkumar0101/My-Personal-Website";

const FOOTER_NAV = [
  {
    title: "Main",
    links: [
      { label: "Portfolio", href: "#portfolio" },
      { label: "Services", href: "#services" },
      { label: "Blog", href: "#blog" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Writing",
    links: [
      { label: "Geekflare articles", href: site.authorPages.geekflare, external: true },
      { label: "Testlify articles", href: site.authorPages.testlify, external: true },
      { label: "Medium", href: site.socials.medium, external: true },
      { label: "Personal journal", href: "/journal" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "LinkedIn", href: site.socials.linkedin, external: true },
      { label: "GitHub", href: site.socials.github, external: true },
      { label: "X / Twitter", href: site.socials.x, external: true },
      { label: "View source", href: REPO_URL, external: true },
    ],
  },
];

// =============================================================
// Main footer
// =============================================================
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background overflow-hidden">
      {/* Final CTA block */}
      <FinalCta />

      {/* Brand + Link columns */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <BrandColumn />
          <LinksColumn />
        </div>
      </div>

      {/* Giant animated wordmark */}
      <Wordmark />

      {/* Credits row */}
      <CreditsRow year={year} />
    </footer>
  );
}

// =============================================================
// FINAL CTA — last chance "let's talk" block above all footer chrome
// =============================================================
function FinalCta() {
  return (
    <div className="relative overflow-hidden">
      {/* Backdrop glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[680px] rounded-full bg-accent/12 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: heading + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <h3 className="text-3xl md:text-5xl lg:text-[3.5rem] font-medium tracking-[-0.025em] leading-[1.05]">
              Got something to <span className="text-accent">ship?</span>
            </h3>
            <p className="mt-5 text-base md:text-lg text-muted max-w-lg">
              Two services live and taking new clients. Three more in the works.
              Drop a brief or grab a slot.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="group/cta inline-flex items-center gap-2 rounded-full border border-border-strong px-5 h-12 text-sm font-medium hover:border-foreground hover:text-accent transition-colors"
              >
                <Mail className="size-4" />
                Email me
              </a>
              <a
                href={site.bookCall}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta inline-flex items-center gap-2 rounded-full bg-foreground text-background h-12 pl-5 pr-2 text-sm font-medium hover:bg-foreground/90 transition-all active:scale-[0.99]"
              >
                <Calendar className="size-4" />
                <span>Book a call</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-background text-foreground">
                  <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
                </span>
              </a>
            </div>
          </motion.div>

          {/* Right: status panel */}
          <StatusPanel />
        </div>
      </div>
    </div>
  );
}

// =============================================================
// Status panel (right side of CTA) — availability + live IST
// =============================================================
function StatusPanel() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    function tick() {
      try {
        const t = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date());
        setTime(t);
      } catch {
        setTime("");
      }
    }
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="lg:col-span-5 rounded-2xl border border-border bg-surface/50 backdrop-blur-md p-5 md:p-6"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 border border-success/20 px-2.5 py-1 text-[11px] font-medium text-success">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          Available for work
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-subtle">
          Status
        </span>
      </div>

      <div className="grid grid-cols-2 gap-px bg-border rounded-xl overflow-hidden">
        <div className="bg-background px-4 py-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-subtle">
            Local time
          </p>
          <p className="mt-1 font-mono text-xl font-medium tabular-nums tracking-tight text-foreground inline-flex items-baseline gap-1.5">
            {time || "--:--"}
            <span className="text-[10px] text-muted tracking-[0.14em]">
              IST
            </span>
          </p>
        </div>
        <div className="bg-background px-4 py-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-subtle">
            Next slot
          </p>
          <p className="mt-1 text-xl font-medium tracking-tight text-foreground">
            This week
          </p>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-muted leading-snug">
        Reply within one working day. Faster if you say it is urgent.
      </p>
    </motion.div>
  );
}

// =============================================================
// Brand column (left of links)
// =============================================================
function BrandColumn() {
  return (
    <div className="md:col-span-5 space-y-7">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background font-dev font-bold text-2xl leading-none pb-1">
          ऋ
        </span>
        <div>
          <p className="font-medium tracking-tight text-base">
            rishavkumarkarn<span className="text-accent">.in</span>
          </p>
          <p className="text-sm text-muted">Writer and digital builder</p>
        </div>
      </div>

      <p className="text-muted text-[15px] leading-relaxed max-w-md">
        Search-friendly content for B2B SaaS, and small web builds that
        actually ship. Working with brands from Kolkata, India.
      </p>

      {/* Email pill */}
      <a
        href={`mailto:${site.email}`}
        className="group inline-flex items-center gap-3 rounded-full border border-border-strong bg-surface hover:border-foreground transition-colors px-1.5 py-1.5 pr-5 max-w-full"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Mail className="size-4" />
        </span>
        <span className="text-sm font-medium truncate">{site.email}</span>
        <ArrowUpRight className="size-4 text-muted group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" />
      </a>

      {/* Social icons */}
      <div className="flex items-center gap-2 pt-1">
        <SocialButton href={site.socials.linkedin} label="LinkedIn">
          <LinkedinIcon className="size-4" />
        </SocialButton>
        <SocialButton href={site.socials.github} label="GitHub">
          <GithubIcon className="size-4" />
        </SocialButton>
        <SocialButton href={site.socials.x} label="X / Twitter">
          <XIcon className="size-4" />
        </SocialButton>
        <SocialButton href="/feed.xml" label="RSS feed" internal>
          <Rss className="size-4" />
        </SocialButton>
      </div>
    </div>
  );
}

function SocialButton({
  href,
  label,
  internal = false,
  children,
}: {
  href: string;
  label: string;
  internal?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(!internal && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-muted hover:text-accent hover:border-foreground hover:-translate-y-0.5 transition-all"
    >
      {children}
    </a>
  );
}

// =============================================================
// Link columns (right of brand)
// =============================================================
function LinksColumn() {
  return (
    <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
      {FOOTER_NAV.map((col) => (
        <div key={col.title}>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle mb-5">
            {col.title}
          </p>
          <ul className="space-y-3.5">
            {col.links.map((link) => (
              <li key={`${col.title}-${link.label}`}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-[15px] text-muted hover:text-foreground transition-colors"
                  {...("external" in link && link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span>{link.label}</span>
                  {"external" in link && link.external && (
                    <ArrowUpRight className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// =============================================================
// Giant animated wordmark (letters stagger reveal on scroll)
// =============================================================
function Wordmark() {
  // Split into chars so each animates independently
  const text = "RISHAV KUMAR";
  const chars = text.split("");

  return (
    <div className="relative -mt-6 md:-mt-10 select-none pointer-events-none">
      <div
        className="font-medium leading-[0.85] tracking-[-0.05em] text-center whitespace-nowrap overflow-hidden"
        style={{
          fontSize: "clamp(80px, 22vw, 340px)",
          letterSpacing: "-0.04em",
        }}
      >
        {chars.map((c, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: Math.min(i * 0.04, 0.36),
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
            style={{
              WebkitTextStroke: "1px var(--border-strong)",
              color: "transparent",
            }}
          >
            {c === " " ? " " : c}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

// =============================================================
// Credits row (bottom)
// =============================================================
function CreditsRow({ year }: { year: number }) {
  function scrollTop() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-subtle">
          © {year} Rishav Kumar. All rights reserved.
        </p>

        <p className="text-xs text-subtle text-center md:text-right inline-flex items-center gap-1.5 flex-wrap justify-center">
          <span>Designed and built by</span>
          <span className="text-foreground">Rishav</span>
          <span>·</span>
          <span>Source on</span>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-foreground hover:text-accent transition-colors"
          >
            <Code2 className="size-3" />
            <span>GitHub</span>
            <ArrowUpRight className="size-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </p>

        <div className="flex items-center gap-2">
          <ThemeToggle variant="ghost" />
          <button
            type="button"
            onClick={scrollTop}
            aria-label="Back to top"
            className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-muted hover:text-accent hover:border-foreground hover:-translate-y-0.5 transition-all"
          >
            <ArrowUp className="size-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
