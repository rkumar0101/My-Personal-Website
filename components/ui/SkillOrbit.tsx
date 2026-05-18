"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PenTool, Code2, Sparkles } from "lucide-react";
import type { SkillOrbitConfig, SkillItem } from "@/lib/data";
import { SKILL_ICON_MAP } from "./SkillIcons";
import { cn } from "@/lib/utils";

const CENTER_ICONS = {
  "pen-tool": PenTool,
  code: Code2,
  sparkles: Sparkles,
} as const;

interface SkillOrbitProps {
  config: SkillOrbitConfig;
  /** Total container size in px */
  size?: number;
  /** Innermost ring radius */
  innerRadius?: number;
  /** Middle ring radius */
  middleRadius?: number;
  /** Outermost ring radius */
  outerRadius?: number;
  /** Skill tile size in px */
  iconSize?: number;
}

export function SkillOrbit({
  config,
  size = 400,
  innerRadius = 70,
  middleRadius = 115,
  outerRadius = 165,
  iconSize = 50,
}: SkillOrbitProps) {
  const CenterIcon = CENTER_ICONS[config.centerIcon];

  // 3 rings × 2 items each = 6 items total
  const innerItems = config.items.slice(0, 2);
  const middleItems = config.items.slice(2, 4);
  const outerItems = config.items.slice(4, 6);

  // Different speeds — inner fastest, outer slowest (natural orbital feel)
  const innerDuration = Math.round(config.duration * 0.55);
  const middleDuration = Math.round(config.duration * 0.8);
  const outerDuration = config.duration;

  // Alternating directions for visual richness:
  // inner → direction
  // middle → opposite
  // outer → direction (same as inner)
  const innerReverse = config.direction === -1;
  const middleReverse = !innerReverse;
  const outerReverse = innerReverse;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="orbit-container group/orbit relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Soft halo behind everything */}
      <div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{
          width: outerRadius * 2 + 90,
          height: outerRadius * 2 + 90,
          background:
            "radial-gradient(circle, rgba(239,68,68,0.16) 0%, rgba(239,68,68,0.06) 45%, rgba(239,68,68,0) 70%)",
        }}
      />

      {/* Static ring visuals (3 concentric circles with glow) */}
      <StaticRing radius={outerRadius} strength="subtle" />
      <StaticRing radius={middleRadius} strength="medium" />
      <StaticRing radius={innerRadius} strength="strong" />

      {/* Rotating rings — outer first (z-stack), middle, inner on top */}
      <OrbitRing
        items={outerItems}
        radius={outerRadius}
        duration={outerDuration}
        reverse={outerReverse}
        iconSize={iconSize}
        angleOffset={120}
      />
      <OrbitRing
        items={middleItems}
        radius={middleRadius}
        duration={middleDuration}
        reverse={middleReverse}
        iconSize={iconSize - 2}
        angleOffset={60}
      />
      <OrbitRing
        items={innerItems}
        radius={innerRadius}
        duration={innerDuration}
        reverse={innerReverse}
        iconSize={iconSize - 4}
        angleOffset={0}
      />

      {/* Center tile */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground text-background shadow-[0_0_30px_-4px_rgba(239,68,68,0.45)] dark:shadow-[0_0_40px_-4px_rgba(239,68,68,0.6)]">
          <CenterIcon className="size-6" />
          <span className="absolute inset-0 rounded-2xl ring-1 ring-accent/40 ring-offset-2 ring-offset-background" />
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================
// StaticRing — visual circle that doesn't rotate
// =============================================================
function StaticRing({
  radius,
  strength,
}: {
  radius: number;
  strength: "strong" | "medium" | "subtle";
}) {
  const styles = {
    strong: {
      border: "border-accent/45 dark:border-accent/55",
      shadow:
        "inset 0 0 25px rgba(239,68,68,0.20), 0 0 30px rgba(239,68,68,0.14)",
    },
    medium: {
      border: "border-accent/35 dark:border-accent/45",
      shadow:
        "inset 0 0 25px rgba(239,68,68,0.13), 0 0 25px rgba(239,68,68,0.08)",
    },
    subtle: {
      border: "border-accent/25 dark:border-accent/35",
      shadow:
        "inset 0 0 28px rgba(239,68,68,0.08), 0 0 22px rgba(239,68,68,0.05)",
    },
  };
  const s = styles[strength];
  return (
    <div
      aria-hidden
      className={cn("absolute rounded-full border pointer-events-none", s.border)}
      style={{
        width: radius * 2,
        height: radius * 2,
        boxShadow: s.shadow,
      }}
    />
  );
}

// =============================================================
// OrbitRing — one rotating ring with N items spaced equally
// =============================================================
function OrbitRing({
  items,
  radius,
  duration,
  reverse,
  iconSize,
  angleOffset,
}: {
  items: SkillItem[];
  radius: number;
  duration: number;
  reverse: boolean;
  iconSize: number;
  angleOffset: number;
}) {
  return (
    <div
      className="absolute will-change-transform group-hover/orbit:[animation-play-state:paused]"
      style={{
        width: radius * 2,
        height: radius * 2,
        animation: `spin ${duration}s linear ${
          reverse ? "reverse" : "normal"
        } infinite`,
      }}
    >
      {items.map((item, i) => {
        const angle = (i / items.length) * 360 + angleOffset;
        return (
          <div
            key={item.id}
            className="absolute top-1/2 left-1/2"
            style={{
              width: iconSize,
              height: iconSize,
              marginLeft: -iconSize / 2,
              marginTop: -iconSize / 2,
              transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(${-angle}deg)`,
            }}
          >
            {/* Counter-rotate so icon stays upright as ring spins */}
            <div
              className="will-change-transform group-hover/orbit:[animation-play-state:paused] h-full w-full"
              style={{
                animation: `spin ${duration}s linear ${
                  reverse ? "normal" : "reverse"
                } infinite`,
              }}
            >
              <SkillTile item={item} size={iconSize} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// =============================================================
// SkillTile — single icon chip with hover tooltip
// =============================================================
function SkillTile({ item, size }: { item: SkillItem; size: number }) {
  const Icon = SKILL_ICON_MAP[item.id];
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative h-full w-full group/tile"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "relative h-full w-full rounded-2xl flex items-center justify-center",
          "bg-[#161616] border border-white/10",
          "shadow-[0_4px_18px_-6px_rgba(0,0,0,0.45)]",
          "transition-all duration-300",
          hovered && "scale-[1.18] shadow-[0_8px_30px_-6px_rgba(239,68,68,0.5)]",
        )}
      >
        {Icon ? (
          <Icon
            className="text-white"
            style={{ width: size * 0.55, height: size * 0.55 }}
          />
        ) : (
          <span className="text-white text-xs font-semibold">
            {item.label.charAt(0)}
          </span>
        )}
      </div>

      {hovered && (
        <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/90 backdrop-blur border border-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white shadow-xl z-30">
          {item.label}
        </div>
      )}
    </div>
  );
}
