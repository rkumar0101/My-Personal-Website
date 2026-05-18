"use client";

import { motion } from "framer-motion";
import { skillOrbits } from "@/lib/data";
import { SkillOrbit } from "@/components/ui/SkillOrbit";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 border-b border-border overflow-hidden"
    >
      {/* Subtle backdrop for depth */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-20 pointer-events-none" />
      {/* Soft accent halos */}
      <div className="absolute top-1/4 -left-40 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 h-[400px] w-[400px] rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Header (Bio / HowIWork convention) */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-center md:text-left"
        >
          What I work with<span className="text-accent">?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 text-sm md:text-base text-muted max-w-xl text-center md:text-left mx-auto md:mx-0"
        >
          Three orbits, eighteen tools. Hover any orbit to pause it. Hover any
          tile to see its name.
        </motion.p>

        {/* Orbits — 2 on top, 1 centered below (triangle) at xl+, stacked single col below */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 xl:grid-cols-2 gap-y-12 xl:gap-x-8 xl:gap-y-16 place-items-center">
          <OrbitCard config={skillOrbits[0]} />
          <OrbitCard config={skillOrbits[1]} />

          <div className="xl:col-span-2">
            <OrbitCard config={skillOrbits[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function OrbitCard({ config }: { config: (typeof skillOrbits)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-6"
    >
      {/* Orbit responsive sizes — bigger radii for more breathing room */}
      <div className="block xl:hidden">
        <SkillOrbit
          config={config}
          size={420}
          innerRadius={85}
          middleRadius={140}
          outerRadius={190}
          iconSize={48}
        />
      </div>
      <div className="hidden xl:block">
        <SkillOrbit
          config={config}
          size={540}
          innerRadius={105}
          middleRadius={170}
          outerRadius={235}
          iconSize={56}
        />
      </div>

      {/* Caption */}
      <div className="text-center">
        <p className="text-base md:text-lg font-medium tracking-tight">
          {config.title}
        </p>
        <p className="mt-1 text-xs md:text-sm text-muted">
          {config.subtitle}
        </p>
      </div>
    </motion.div>
  );
}
