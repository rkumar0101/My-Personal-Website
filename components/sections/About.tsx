"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 border-b border-border">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="md:sticky md:top-24"
            >
              <SectionLabel number="09" label="About" />
              <h2 className="mt-6 text-4xl md:text-5xl font-medium tracking-[-0.02em] leading-[1.05]">
                The{" "}
                <span className="text-accent">long</span>{" "}
                version.
              </h2>
            </motion.div>
          </div>

          <div className="md:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl md:text-2xl leading-[1.5] text-foreground"
            >
              {about}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden"
            >
              {[
                { label: "Based in", value: "Kolkata" },
                { label: "Education", value: "B.Tech CSE" },
                { label: "Writing since", value: "2020" },
                { label: "Languages", value: "EN, HI, MAI" },
                { label: "Stack", value: "Next, Tailwind" },
                { label: "Open to", value: "Remote work" },
              ].map((kv) => (
                <div
                  key={kv.label}
                  className="bg-background px-5 py-4"
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
                    {kv.label}
                  </p>
                  <p className="mt-1.5 font-medium text-foreground">
                    {kv.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
