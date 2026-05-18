"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AreaChartProps {
  /** Data points (numbers) */
  data: number[];
  /** X-axis labels (one per data point) */
  xLabels: string[];
  /** Y-axis unit suffix (e.g. "K", "M") */
  yUnit?: string;
  /** Y-axis max override; auto if omitted */
  yMax?: number;
  /** Color for line + fill (default accent) */
  color?: string;
  className?: string;
  /** Animation key — change this to re-trigger draw animation */
  animationKey?: string | number;
}

const VIEW_W = 820;
const VIEW_H = 260;
const PAD_L = 56;
const PAD_R = 24;
const PAD_T = 18;
const PAD_B = 36;

export function AreaChart({
  data,
  xLabels,
  yUnit = "",
  yMax,
  color = "rgb(239 68 68)",
  className,
  animationKey,
}: AreaChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // Compute chart dimensions and helpers
  const { points, areaPath, linePath, yTicks, chartW, chartH } = useMemo(() => {
    const chartW = VIEW_W - PAD_L - PAD_R;
    const chartH = VIEW_H - PAD_T - PAD_B;
    const min = 0;
    const computedMax = yMax ?? Math.ceil((Math.max(...data) * 1.15) / 50) * 50;
    const max = computedMax;
    const range = max - min || 1;

    const pts = data.map((v, i) => ({
      x: PAD_L + (i / (data.length - 1)) * chartW,
      y: PAD_T + chartH - ((v - min) / range) * chartH,
      value: v,
    }));

    // Build smooth bezier curve through points
    let lineD = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const midX = (p0.x + p1.x) / 2;
      lineD += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    const areaD = `${lineD} L ${pts[pts.length - 1].x} ${PAD_T + chartH} L ${pts[0].x} ${PAD_T + chartH} Z`;

    // Y-axis ticks (5 levels: 0, 25%, 50%, 75%, 100%)
    const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
      value: min + range * t,
      y: PAD_T + chartH - t * chartH,
    }));

    return {
      points: pts,
      areaPath: areaD,
      linePath: lineD,
      yTicks: ticks,
      chartW,
      chartH,
    };
  }, [data, yMax]);

  // Mouse interaction for crosshair
  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const xInView = xRatio * VIEW_W;
    if (xInView < PAD_L || xInView > VIEW_W - PAD_R) {
      setHoverIdx(null);
      return;
    }
    const t = (xInView - PAD_L) / chartW;
    const idx = Math.round(t * (data.length - 1));
    setHoverIdx(Math.max(0, Math.min(data.length - 1, idx)));
  }

  function handleMouseLeave() {
    setHoverIdx(null);
  }

  const gradientId = `area-chart-grad-${animationKey ?? "default"}`;
  const last = points[points.length - 1];
  const hovered = hoverIdx !== null ? points[hoverIdx] : null;

  function formatValue(v: number) {
    if (yUnit === "K" && v >= 1000) return `${(v / 1000).toFixed(1)}M`;
    if (Number.isInteger(v)) return `${v}${yUnit}`;
    return `${v.toFixed(1)}${yUnit}`;
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      className={cn("w-full h-auto", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="img"
      aria-label="Analytics trend chart"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Horizontal gridlines */}
      {yTicks.map((tick, i) => (
        <line
          key={i}
          x1={PAD_L}
          x2={VIEW_W - PAD_R}
          y1={tick.y}
          y2={tick.y}
          stroke="currentColor"
          strokeOpacity={i === 0 ? 0.2 : 0.08}
          strokeWidth={0.5}
          strokeDasharray={i === 0 ? "0" : "3 3"}
        />
      ))}

      {/* Y-axis labels */}
      {yTicks.map((tick, i) => (
        <text
          key={`yl-${i}`}
          x={PAD_L - 10}
          y={tick.y + 3}
          fontSize="10"
          textAnchor="end"
          fill="currentColor"
          opacity={0.5}
          fontFamily="ui-monospace, monospace"
        >
          {formatValue(tick.value)}
        </text>
      ))}

      {/* X-axis labels */}
      {points.map((p, i) => {
        // Show every other label on mobile-ish for breathing room
        const show = data.length <= 12 || i % 2 === 0;
        if (!show) return null;
        return (
          <text
            key={`xl-${i}`}
            x={p.x}
            y={VIEW_H - PAD_B + 18}
            fontSize="10"
            textAnchor="middle"
            fill="currentColor"
            opacity={0.55}
            fontFamily="ui-monospace, monospace"
          >
            {xLabels[i]}
          </text>
        );
      })}

      {/* Area fill */}
      <motion.path
        key={`area-${animationKey}`}
        d={areaPath}
        fill={`url(#${gradientId})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />

      {/* Line (animated draw) */}
      <motion.path
        key={`line-${animationKey}`}
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Data point dots */}
      {points.map((p, i) => {
        const isLast = i === points.length - 1;
        const isHovered = hoverIdx === i;
        return (
          <motion.circle
            key={`pt-${animationKey}-${i}`}
            cx={p.x}
            cy={p.y}
            r={isLast || isHovered ? 4 : 2.5}
            fill={isLast || isHovered ? color : "currentColor"}
            stroke={isLast || isHovered ? "currentColor" : "none"}
            strokeWidth={isLast || isHovered ? 1.5 : 0}
            opacity={isLast || isHovered ? 1 : 0.55}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.6 + (i / points.length) * 0.6,
            }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
        );
      })}

      {/* Pulsing halo on last point */}
      <motion.circle
        cx={last.x}
        cy={last.y}
        r={6}
        fill={color}
        opacity={0.3}
        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        style={{ transformOrigin: `${last.x}px ${last.y}px` }}
      />

      {/* Hover crosshair + tooltip */}
      {hovered && (
        <g>
          <line
            x1={hovered.x}
            x2={hovered.x}
            y1={PAD_T}
            y2={VIEW_H - PAD_B}
            stroke={color}
            strokeOpacity={0.4}
            strokeWidth={1}
            strokeDasharray="3 3"
          />
          <circle
            cx={hovered.x}
            cy={hovered.y}
            r={6}
            fill={color}
            stroke="currentColor"
            strokeWidth={2}
          />
          <g
            transform={`translate(${Math.min(VIEW_W - PAD_R - 80, Math.max(PAD_L, hovered.x - 40))}, ${Math.max(PAD_T + 4, hovered.y - 42)})`}
          >
            <rect
              x={0}
              y={0}
              width={80}
              height={32}
              rx={6}
              fill="currentColor"
              opacity={0.95}
            />
            <text
              x={40}
              y={13}
              fontSize="9"
              textAnchor="middle"
              fill={color}
              opacity={0.8}
              fontFamily="ui-monospace, monospace"
            >
              {xLabels[hoverIdx!]}
            </text>
            <text
              x={40}
              y={26}
              fontSize="11"
              textAnchor="middle"
              fontWeight="600"
              fill="white"
              style={{ mixBlendMode: "difference" }}
              fontFamily="ui-monospace, monospace"
            >
              {formatValue(hovered.value)}
            </text>
          </g>
        </g>
      )}
    </svg>
  );
}
