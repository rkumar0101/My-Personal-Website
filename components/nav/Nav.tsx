"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import {
  LinkedinIcon,
  GithubIcon,
  XIcon,
} from "@/components/ui/BrandIcons";
import { IndiaFlag } from "@/components/ui/IndiaFlag";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

// Section anchors on the home page. When the user is on a non-home route
// (e.g. /blog or /portfolio), prefix with "/" so the link navigates home
// first and then scrolls to the anchor. Otherwise plain "#anchor" scrolls
// within the current page.
const NAV_ANCHORS = [
  { label: "Portfolio", anchor: "portfolio" },
  { label: "Services", anchor: "services" },
  { label: "Blog", anchor: "blog" },
  { label: "About", anchor: "about" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Resolve anchor + CTA hrefs based on current route.
  // Home: "#anchor" (smooth scroll within page)
  // Anywhere else: "/#anchor" (navigate home then scroll)
  const { navLinks, contactHref } = useMemo(() => {
    const isHome = pathname === "/";
    return {
      navLinks: NAV_ANCHORS.map(({ label, anchor }) => ({
        label,
        href: isHome ? `#${anchor}` : `/#${anchor}`,
      })),
      contactHref: isHome ? "#contact" : "/#contact",
    };
  }, [pathname]);

  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        // Mobile gets a subtle bg on scroll so the compact bar reads on any underlying section
        scrolled && "bg-background/80 backdrop-blur-xl md:bg-transparent md:backdrop-blur-none",
      )}
    >
      <div className="relative mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo — fades on scroll only on desktop */}
        <div
          className={cn(
            "transition-all duration-350 ease-out",
            scrolled &&
              "md:opacity-0 md:-translate-x-5 md:pointer-events-none",
          )}
        >
          <Link
            href="/"
            className="group flex items-center gap-2 font-medium tracking-tight text-foreground"
          >
            <span className="inline-flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-xl bg-foreground text-background font-dev font-bold text-lg md:text-xl leading-none pb-0.5">
              ऋ
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-sm">
              <span>
                rishavkumarkarn<span className="text-accent">.in</span>
              </span>
              <IndiaFlag className="h-3 w-[18px] rounded-[1.5px] shrink-0" />
            </span>
          </Link>
        </div>

        {/* Centered nav pill — desktop only, with scroll bar inside */}
        <motion.div
          animate={{ scale: scrolled ? 1.02 : 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border-strong/70 bg-background/80 backdrop-blur-xl shadow-[0_4px_28px_-14px_rgba(0,0,0,0.25)]">
            <ul className="flex items-center gap-0.5 px-1.5 py-1.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium text-muted hover:text-foreground hover:bg-surface transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <AnimatePresence initial={false}>
                {scrolled && (
                  <motion.li
                    key="theme-in-pill"
                    initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                    animate={{ width: "auto", opacity: 1, marginLeft: 6 }}
                    exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden flex items-center"
                  >
                    <span className="h-6 w-px bg-border-strong mr-1.5" />
                    <ThemeToggle variant="minimal" />
                  </motion.li>
                )}
              </AnimatePresence>
            </ul>

            {/* Scroll progress INSIDE pill (desktop) */}
            <motion.div
              animate={{ opacity: scrolled ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-border/50"
            >
              <motion.div
                style={{ scaleX: smoothProgress }}
                className="h-full origin-left bg-accent"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Right cluster — desktop full, mobile minimal */}
        <div
          className={cn(
            "flex items-center gap-1 md:gap-2 transition-all duration-350 ease-out",
            scrolled && "md:opacity-0 md:translate-x-5 md:pointer-events-none",
          )}
        >
          {/* Socials (lg+ only) */}
          <div className="hidden lg:flex items-center gap-1 mr-1">
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted hover:text-foreground hover:bg-surface transition-colors"
            >
              <LinkedinIcon className="size-4" />
            </a>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted hover:text-foreground hover:bg-surface transition-colors"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={site.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted hover:text-foreground hover:bg-surface transition-colors"
            >
              <XIcon className="size-4" />
            </a>
          </div>

          {/* Theme toggle — now visible on all sizes (was hidden sm:) */}
          <ThemeToggle variant="ghost" />

          {/* Desktop CTA */}
          <Link
            href={contactHref}
            className="group/cta hidden md:inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground h-10 pl-5 pr-2 text-sm font-medium hover:bg-accent/90 transition-all active:scale-[0.98]"
          >
            <span>Get in touch</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent-foreground text-accent">
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
            </span>
          </Link>

          {/* Mobile menu trigger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-foreground"
          >
            <Menu className="size-4" />
          </button>
        </div>

        {/* Mobile-only: scroll progress bar at the bottom edge of the nav */}
        <motion.div
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden absolute bottom-0 left-0 right-0 h-[2px] bg-border/40"
        >
          <motion.div
            style={{ scaleX: smoothProgress }}
            className="h-full origin-left bg-accent"
          />
        </motion.div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-background md:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 font-medium tracking-tight"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-foreground text-background font-dev font-bold text-lg leading-none pb-0.5">
                ऋ
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm">
                <span>
                  rishavkumarkarn<span className="text-accent">.in</span>
                </span>
                <IndiaFlag className="h-3 w-[18px] rounded-[1.5px] shrink-0" />
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-strong"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
          <ul className="flex flex-col px-5 pt-6 divide-y divide-border">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                style={{ animationDelay: `${i * 60}ms` }}
                className="animate-fade-up"
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group/m flex items-center justify-between py-5 text-2xl md:text-3xl font-medium tracking-tight text-foreground hover:text-accent transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="size-5 text-muted group-hover/m:text-accent group-hover/m:-translate-y-0.5 group-hover/m:translate-x-0.5 transition-all" />
                </Link>
              </li>
            ))}
            <li
              className="animate-fade-up pt-6"
              style={{ animationDelay: "300ms" }}
            >
              <Link
                href={contactHref}
                onClick={() => setOpen(false)}
                className="group/cta inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground h-12 px-6 font-medium"
              >
                Get in touch
                <ArrowUpRight className="size-4" />
              </Link>
            </li>
            <li className="pt-6 flex items-center gap-3">
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong"
              >
                <GithubIcon className="size-4" />
              </a>
              <a
                href={site.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong"
              >
                <XIcon className="size-4" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
