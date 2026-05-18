"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Calendar, Check, Loader2, ArrowRight } from "lucide-react";
import { site } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

// Replace with your real Formspree ID once you create one at formspree.io
const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 border-b border-border overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionLabel
            number="10"
            label="Get in touch"
            className="justify-center"
          />
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05]">
            Have a{" "}
            <span className="text-accent">SaaS story</span>{" "}
            to tell?
          </h2>
          <p className="mt-6 text-lg text-muted">
            Tell me what you are working on. I reply within one working day, most days.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-background p-6 md:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Name" name="name" type="text" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <Field label="Company" name="company" type="text" />
              <Field label="What is the brief?" name="message" textarea required />
              <Field
                label="Budget range (optional)"
                name="budget"
                type="text"
                placeholder="e.g. $1k - $3k per month"
              />

              <button
                type="submit"
                disabled={status === "submitting"}
                className={cn(
                  "group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground h-12 px-6 font-medium transition-all",
                  "hover:bg-primary/90 active:scale-[0.99]",
                  "disabled:opacity-60 disabled:cursor-not-allowed",
                )}
              >
                {status === "submitting" && <Loader2 className="size-4 animate-spin" />}
                {status === "success" && <Check className="size-4" />}
                {status !== "submitting" && status !== "success" && (
                  <>
                    Send brief
                    <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
                {status === "submitting" && "Sending..."}
                {status === "success" && "Sent! I will reply soon."}
              </button>

              {status === "error" && (
                <p className="text-sm text-accent text-center">
                  Hmm, something broke. Email me directly at{" "}
                  <a href={`mailto:${site.email}`} className="underline">
                    {site.email}
                  </a>
                  .
                </p>
              )}
            </form>
          </motion.div>

          {/* Side */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            <a
              href={`mailto:${site.email}`}
              className="group block rounded-2xl border border-border bg-background p-6 hover:border-foreground transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Mail className="size-4" />
                </span>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">
                  Email
                </p>
              </div>
              <p className="font-medium text-foreground group-hover:text-accent transition-colors break-all">
                {site.email}
              </p>
              <p className="mt-2 text-sm text-muted">
                Best for project briefs and quick questions.
              </p>
            </a>

            <a
              href={site.bookCall}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-border bg-background p-6 hover:border-foreground transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Calendar className="size-4" />
                </span>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">
                  Book a call
                </p>
              </div>
              <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                Thirty minute intro
              </p>
              <p className="mt-2 text-sm text-muted">
                We talk scope, fit, and what good looks like for your team.
              </p>
            </a>

            <div className="rounded-2xl border border-dashed border-border-strong bg-surface/40 p-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle mb-2">
                Response time
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                Within{" "}
                <span className="font-medium">one working day</span>, most days.
                Faster if it is urgent and you say so.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function Field({
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
  const Comp = textarea ? "textarea" : "input";
  return (
    <label className="block">
      <span className="block text-xs font-medium uppercase tracking-[0.18em] text-subtle mb-2">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      <Comp
        name={name}
        type={textarea ? undefined : type}
        required={required}
        placeholder={placeholder}
        rows={textarea ? 5 : undefined}
        className={cn(
          "w-full rounded-xl bg-surface border border-border px-4 py-3 text-foreground",
          "placeholder:text-subtle outline-none",
          "focus:border-foreground focus:bg-background transition-colors",
          textarea && "resize-none min-h-[120px]",
        )}
      />
    </label>
  );
}
