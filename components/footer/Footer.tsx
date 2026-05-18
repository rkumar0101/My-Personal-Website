import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import {
  LinkedinIcon,
  GithubIcon,
  XIcon,
} from "@/components/ui/BrandIcons";
import { site } from "@/lib/data";

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
      { label: `Email`, href: `mailto:${site.email}` },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background overflow-hidden">
      {/* TOP: brand block + link columns */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand block (left, wide) */}
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
              Empowering B2B SaaS teams with search-friendly content and small
              web builds that actually ship. Based in Kolkata, working with
              brands worldwide.
            </p>

            {/* Email CTA */}
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
            <div className="flex items-center gap-2 pt-2">
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-muted hover:text-accent hover:border-foreground transition-colors"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-muted hover:text-accent hover:border-foreground transition-colors"
              >
                <GithubIcon className="size-4" />
              </a>
              <a
                href={site.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-muted hover:text-accent hover:border-foreground transition-colors"
              >
                <XIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Link columns (right) */}
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
        </div>
      </div>

      {/* MIDDLE: giant outlined wordmark (Rowena pattern) */}
      <div className="relative -mt-8 select-none pointer-events-none">
        <div
          aria-hidden
          className="font-medium leading-[0.85] tracking-[-0.05em] text-center whitespace-nowrap overflow-hidden"
          style={{
            fontSize: "clamp(80px, 22vw, 340px)",
            WebkitTextStroke: "1px var(--border-strong)",
            color: "transparent",
            letterSpacing: "-0.04em",
          }}
        >
          RISHAV KUMAR
        </div>
      </div>

      {/* BOTTOM: credits */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-subtle">
            © {year} Rishav Kumar. All rights reserved.
          </p>
          <p className="text-xs text-subtle">
            Designed and built by{" "}
            <span className="text-foreground">Rishav</span>. Powered by{" "}
            <span className="text-foreground">Next.js</span>,{" "}
            <span className="text-foreground">Tailwind</span>, and{" "}
            <span className="text-foreground">Framer Motion</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
