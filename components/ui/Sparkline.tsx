"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SparklineProps {
  data: number[];
  className?: string;
  strokeWidth?: number;
  /** Show animated pulse dot at the last data point */
  showEndDot?: boolean;
  /** Show subtle area fill under the line */
  showArea?: boolean;
  /** Color override; defaults to currentColor */
  color?: string;
}

export function Sparkline({
  data,
  className,
  strokeWidth = 1.6,
  showEndDot = true,
  showArea = true,
  color = "currentColor",
}: SparklineProps) {
  if (data.length < 2) return null;

  const W = 100;
  const H = 28;
  const PAD = 2;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - PAD - ((v - min) / range) * (H - 2 * PAD),
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  const areaPath = `${linePath} L ${W} ${H} L 0 ${H} Z`;

  const last = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={cn("overflow-visible", className)}
      role="img"
      aria-label="Trend sparkline"
    >
      {/* Subtle area fill */}
      {showArea && (
        <motion.path
          d={areaPath}
          fill={color}
          opacity={0.12}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.12 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      )}

      {/* Line path with draw animation */}
      <motion.path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Pulsing end dot */}
      {showEndDot && (
        <>
          <motion.circle
            cx={last.x}
            cy={last.y}
            r={4}
            fill={color}
            opacity={0.25}
            initial={{ scale: 0 }}
            whileInView={{ scale: [0, 1.4, 1] }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.4, delay: 1.4 }}
            style={{ transformOrigin: `${last.x}px ${last.y}px` }}
          />
          <motion.circle
            cx={last.x}
            cy={last.y}
            r={2}
            fill={color}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.3, delay: 1.5 }}
            style={{ transformOrigin: `${last.x}px ${last.y}px` }}
          />
        </>
      )}
    </svg>
  );
}
