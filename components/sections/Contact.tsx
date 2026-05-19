"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Mail,
  Calendar,
  Check,
  Loader2,
  ArrowUpRight,
  Send,
  Clock,
  AlertCircle,
} from "lucide-react";
import { site } from "@/lib/data";
import {
  LinkedinIcon,
  GithubIcon,
  XIcon,
} from "@/components/ui/BrandIcons";
import { cn } from "@/lib/utils";

// Replace with real Formspree ID once provisioned at formspree.io
const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id";

const PROJECT_TYPES = [
  { value: "writing", label: "Writing" },
  { value: "web", label: "Web build" },
  { value: "both", label: "Both" },
  { value: "other", label: "Something else" },
] as const;

type Status = "idle" | "submitting" | "success" | "error";

// =============================================================
// Main section
// =============================================================
export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [projectType, setProjectType] = useState<string>("writing");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 border-b border-border overflow-hidden"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-20 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[640px] rounded-full bg-accent/12 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Header />

        <ProjectTypeSelector value={projectType} onChange={setProjectType} />

        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <FormCard
            status={status}
            projectType={projectType}
            onSubmit={handleSubmit}
          />
          <SidePanel status={status} />
        </div>
      </div>
    </section>
  );
}

// =============================================================
// Header
// =============================================================
function Header() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/5 px-3 py-1.5 text-[11px] font-medium text-success mb-7"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
        </span>
        Currently taking clients
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05]"
      >
        Have a <span className="text-accent">SaaS story</span> to tell?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-5 text-sm md:text-base text-muted max-w-xl mx-auto"
      >
        Tell me what you are working on. I reply within one working day, most
        days.
      </motion.p>
    </div>
  );
}

// =============================================================
// Project type selector
// =============================================================
function ProjectTypeSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="mt-10 md:mt-12 flex justify-center"
    >
      <div className="overflow-x-auto no-scrollbar">
        <div className="inline-flex items-center gap-0.5 rounded-full border border-border-strong bg-background p-1">
          {PROJECT_TYPES.map((t) => {
            const isActive = value === t.value;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => onChange(t.value)}
                className={cn(
                  "relative inline-flex items-center px-4 py-2 text-[12px] md:text-[13px] font-medium rounded-full transition-colors z-10 whitespace-nowrap",
                  isActive
                    ? "text-background"
                    : "text-muted hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="contact-type-pill"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================
// Form card (left col)
// =============================================================
function FormCard({
  status,
  projectType,
  onSubmit,
}: {
  status: Status;
  projectType: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="lg:col-span-7"
    >
      <form
        onSubmit={onSubmit}
        className="relative rounded-2xl border border-border bg-background p-6 md:p-8 lg:p-9 space-y-5"
      >
        {/* Hidden field for project type (submitted along with form) */}
        <input type="hidden" name="project_type" value={projectType} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FloatingField label="Your name" name="name" required />
          <FloatingField label="Email" name="email" type="email" required />
        </div>

        <FloatingField label="Company or product" name="company" />

        <FloatingField
          label="What is the brief?"
          name="message"
          textarea
          required
        />

        <FloatingField
          label="Budget range (optional)"
          name="budget"
          placeholder="e.g. $1k - $3k per month"
        />

        <SubmitButton status={status} />

        <AnimatePresence mode="wait">
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-2 text-sm text-accent justify-center"
            >
              <AlertCircle className="size-4" />
              Something broke. Email me directly at{" "}
              <a href={`mailto:${site.email}`} className="underline">
                {site.email}
              </a>
              .
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}

// =============================================================
// Floating-label input field
// =============================================================
function FloatingField({
  label,
  name,
  type = "text",
  textarea = false,
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  placeholder?: string;
}) {
  const id = `f-${name}`;
  const baseInputClass = cn(
    "peer block w-full rounded-xl bg-surface border border-border px-4 pt-6 pb-2 text-foreground text-[15px]",
    "placeholder:text-transparent outline-none",
    "transition-colors duration-200",
    "focus:border-foreground focus:bg-background",
    "hover:border-border-strong",
  );

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          name={name}
          required={required}
          placeholder={placeholder ?? " "}
          rows={5}
          className={cn(baseInputClass, "resize-none min-h-[140px]")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder ?? " "}
          className={baseInputClass}
        />
      )}
      <label
        htmlFor={id}
        className={cn(
          "absolute left-4 pointer-events-none origin-left transition-all duration-200",
          "text-muted text-[15px]",
          "top-[15px]",
          // Float up when focused or has value (uses :placeholder-shown trick)
          "peer-focus:top-2 peer-focus:text-[10px] peer-focus:tracking-[0.18em] peer-focus:uppercase peer-focus:font-semibold peer-focus:text-accent",
          "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-subtle",
          "peer-focus:peer-[:not(:placeholder-shown)]:text-accent",
        )}
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
    </div>
  );
}

// =============================================================
// Submit button (magnetic + state-aware)
// =============================================================
function SubmitButton({ status }: { status: Status }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (status !== "idle") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 14);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 10);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      type="submit"
      disabled={status === "submitting" || status === "success"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn(
        "group relative inline-flex w-full items-center justify-center gap-2 rounded-full h-13 px-7 font-medium overflow-hidden transition-colors",
        status === "success"
          ? "bg-success text-white"
          : status === "error"
            ? "bg-accent text-accent-foreground"
            : "bg-foreground text-background hover:bg-foreground/95 active:scale-[0.99]",
        "disabled:cursor-not-allowed",
      )}
    >
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="inline-flex items-center gap-2"
          >
            <Send className="size-4" />
            Send brief
            <ArrowUpRight className="size-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </motion.span>
        )}
        {status === "submitting" && (
          <motion.span
            key="submitting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-2"
          >
            <Loader2 className="size-4 animate-spin" />
            Sending
          </motion.span>
        )}
        {status === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-2"
          >
            <Check className="size-4" />
            Got it. Replying soon.
          </motion.span>
        )}
        {status === "error" && (
          <motion.span
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-2"
          >
            <AlertCircle className="size-4" />
            Try again
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// =============================================================
// Side panel (right col)
// =============================================================
function SidePanel({ status }: { status: Status }) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
    >
      <EmailCard />
      <CalendarCard />
      <LocalTimeCard />
      <SocialsCard />
    </motion.aside>
  );
}

// ---------- Email card ----------
function EmailCard() {
  return (
    <a
      href={`mailto:${site.email}`}
      className="group relative block rounded-2xl border border-border bg-background p-6 hover:border-foreground hover:-translate-y-0.5 transition-all overflow-hidden"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Mail className="size-4" />
        </span>
        <ArrowUpRight className="size-4 text-muted group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
      </div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-subtle mb-1.5">
        Email
      </p>
      <p className="font-medium text-foreground group-hover:text-accent transition-colors break-all">
        {site.email}
      </p>
      <p className="mt-2 text-sm text-muted">
        Best for project briefs and quick questions.
      </p>
      <span className="absolute bottom-0 left-6 right-6 h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
    </a>
  );
}

// ---------- Calendar card ----------
function CalendarCard() {
  return (
    <a
      href={site.bookCall}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-2xl border border-border bg-background p-6 hover:border-foreground hover:-translate-y-0.5 transition-all overflow-hidden"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Calendar className="size-4" />
        </span>
        <ArrowUpRight className="size-4 text-muted group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
      </div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-subtle mb-1.5">
        Book a call
      </p>
      <p className="font-medium text-foreground group-hover:text-accent transition-colors">
        Thirty-minute intro
      </p>
      <p className="mt-2 text-sm text-muted">
        Scope, fit, and what good looks like for your team.
      </p>

      {/* Decorative mini-calendar of next 5 weekdays */}
      <div className="mt-4 flex items-center gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const isOpen = i === 1 || i === 3;
          return (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                isOpen
                  ? "bg-success/70 group-hover:bg-success"
                  : "bg-border",
              )}
              title={isOpen ? "Slots open" : "Booked"}
            />
          );
        })}
      </div>
      <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.14em] text-subtle">
        2 of 5 days open this week
      </p>

      <span className="absolute bottom-0 left-6 right-6 h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
    </a>
  );
}

// ---------- Local time card ----------
function LocalTimeCard() {
  const [time, setTime] = useState<string>("");
  const [period, setPeriod] = useState<string>("");

  useEffect(() => {
    function update() {
      try {
        const now = new Date();
        const t = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(now);
        setTime(t);

        const hour = parseInt(
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            hour12: false,
            timeZone: "Asia/Kolkata",
          }).format(now),
          10,
        );
        if (hour < 5) setPeriod("Late night");
        else if (hour < 12) setPeriod("Morning");
        else if (hour < 17) setPeriod("Afternoon");
        else if (hour < 21) setPeriod("Evening");
        else setPeriod("Late night");
      } catch {
        setTime("");
        setPeriod("");
      }
    }
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative rounded-2xl border border-border bg-background p-6 overflow-hidden">
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Clock className="size-4" />
        </span>
        <span className="relative flex h-2 w-2 mt-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
      </div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-subtle mb-1.5">
        Local time
      </p>
      <p className="font-mono text-3xl md:text-4xl font-medium tabular-nums tracking-tight text-foreground inline-flex items-baseline gap-2">
        {time || "--:--"}
        <span className="text-[11px] text-muted tracking-[0.14em]">IST</span>
      </p>
      <p className="mt-2 text-sm text-muted">
        {period ? `${period} in Kolkata.` : "Loading…"} I reply within one
        working day.
      </p>
    </div>
  );
}

// ---------- Socials card ----------
function SocialsCard() {
  const links = [
    {
      href: site.socials.linkedin,
      icon: LinkedinIcon,
      label: "LinkedIn",
    },
    {
      href: site.socials.github,
      icon: GithubIcon,
      label: "GitHub",
    },
    {
      href: site.socials.x,
      icon: XIcon,
      label: "X / Twitter",
    },
    {
      href: site.socials.medium,
      icon: () => (
        <span className="font-serif italic text-base leading-none">M</span>
      ),
      label: "Medium",
    },
  ];

  return (
    <div className="relative rounded-2xl border border-dashed border-border-strong bg-surface/40 p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-subtle mb-3">
        Elsewhere
      </p>
      <div className="grid grid-cols-4 gap-2">
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.label}
              className="group/social inline-flex aspect-square items-center justify-center rounded-xl border border-border bg-background text-muted hover:text-accent hover:border-foreground hover:-translate-y-0.5 transition-all"
            >
              <Icon className="size-4" />
              <span className="sr-only">{l.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
