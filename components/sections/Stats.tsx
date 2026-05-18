"use client";

import { useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Activity,
  Calendar,
  Code2,
  Briefcase,
  Layers,
  Languages,
  Rocket,
  Hammer,
  Globe,
  Pause,
  Play,
  type LucideIcon,
} from "lucide-react";
import { statsUpdatedOn } from "@/lib/data";
import { Counter } from "@/components/ui/Counter";
import { AreaChart } from "@/components/ui/AreaChart";
import { cn } from "@/lib/utils";

// =============================================================
// Time-range data for the interactive dashboard
// =============================================================
type RangeKey = "30D" | "90D" | "1Y" | "ALL";

interface RangeData {
  headline: {
    value: number;
    suffix: string;
    decimals?: number;
    label: string;
    trend: string;
    trendDirection: "up" | "down" | "flat";
  };
  chart: number[];
  chartYMax: number;
  chartYUnit: string;
  xLabels: string[];
  sub: {
    clicks: { value: number; suffix: string; decimals?: number; trend: string };
    articles: { value: number; suffix: string; trend: string };
    growth: { value: number; suffix: string; trend: string };
    ctr: { value: number; suffix: string; decimals: number; trend: string };
  };
}

const RANGES: Record<RangeKey, RangeData> = {
  "30D": {
    headline: {
      value: 350,
      suffix: "K",
      label: "Impressions, last 30 days",
      trend: "+12% WoW",
      trendDirection: "up",
    },
    chart: [
      8.2, 9.1, 8.5, 10.3, 11.8, 10.5, 12.1, 13.5, 12.8, 14.2, 15.0, 13.8,
      15.5, 16.8, 16.2, 17.5, 18.2, 17.8, 19.5, 20.1, 19.4, 21.2, 22.5, 21.8,
      23.5, 24.8, 24.2, 26.1, 27.5, 28.2,
    ],
    chartYMax: 35,
    chartYUnit: "K",
    xLabels: Array.from({ length: 30 }).map((_, i) => `D${i + 1}`),
    sub: {
      clicks: { value: 12.4, suffix: "K", decimals: 1, trend: "+8%" },
      articles: { value: 6, suffix: "", trend: "+2" },
      growth: { value: 12, suffix: "%", trend: "WoW" },
      ctr: { value: 3.5, suffix: "%", decimals: 1, trend: "+0.3" },
    },
  },
  "90D": {
    headline: {
      value: 1.05,
      suffix: "M+",
      decimals: 2,
      label: "Impressions, last 90 days",
      trend: "+18% QoQ",
      trendDirection: "up",
    },
    chart: [
      55, 62, 68, 72, 78, 82, 88, 95, 102, 108, 115, 122, 130,
    ],
    chartYMax: 150,
    chartYUnit: "K",
    xLabels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12", "W13"],
    sub: {
      clicks: { value: 36, suffix: "K+", trend: "+15%" },
      articles: { value: 18, suffix: "", trend: "+6" },
      growth: { value: 18, suffix: "%", trend: "QoQ" },
      ctr: { value: 3.4, suffix: "%", decimals: 1, trend: "+0.1" },
    },
  },
  "1Y": {
    headline: {
      value: 3.5,
      suffix: "M+",
      decimals: 1,
      label: "Impressions, last 12 months",
      trend: "+24% YoY",
      trendDirection: "up",
    },
    chart: [180, 195, 215, 230, 250, 265, 280, 295, 310, 325, 340, 355],
    chartYMax: 400,
    chartYUnit: "K",
    xLabels: [
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
    ],
    sub: {
      clicks: { value: 120, suffix: "K+", trend: "+24%" },
      articles: { value: 250, suffix: "+", trend: "+62" },
      growth: { value: 180, suffix: "%", trend: "YoY" },
      ctr: { value: 3.4, suffix: "%", decimals: 1, trend: "stable" },
    },
  },
  ALL: {
    headline: {
      value: 12,
      suffix: "M+",
      label: "Lifetime impressions",
      trend: "Since 2021",
      trendDirection: "up",
    },
    chart: [120, 180, 280, 420, 580, 740, 920, 1100, 1300, 1500, 1700, 1900],
    chartYMax: 2200,
    chartYUnit: "K",
    xLabels: [
      "2021Q3",
      "2021Q4",
      "2022Q1",
      "2022Q2",
      "2022Q3",
      "2022Q4",
      "2023Q1",
      "2023Q2",
      "2023Q3",
      "2023Q4",
      "2024Q1",
      "2024Q2",
    ],
    sub: {
      clicks: { value: 420, suffix: "K+", trend: "all time" },
      articles: { value: 250, suffix: "+", trend: "career" },
      growth: { value: 480, suffix: "%", trend: "5Y" },
      ctr: { value: 3.5, suffix: "%", decimals: 1, trend: "avg" },
    },
  },
};

const TAB_KEYS: RangeKey[] = ["30D", "90D", "1Y", "ALL"];
const TAB_LABELS: Record<RangeKey, string> = {
  "30D": "30 days",
  "90D": "90 days",
  "1Y": "12 months",
  ALL: "All time",
};

// =============================================================
// Career stats strip (separate from interactive dashboard)
// =============================================================
interface CareerStat {
  id: string;
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  caption: string;
  icon: LucideIcon;
}

const CAREER_STATS: CareerStat[] = [
  {
    id: "years-writing",
    value: 4,
    suffix: "+",
    label: "Years writing",
    caption: "B2B SaaS focus",
    icon: Calendar,
  },
  {
    id: "years-coding",
    value: 6,
    suffix: "+",
    label: "Years coding",
    caption: "Since B.Tech CSE",
    icon: Code2,
  },
  {
    id: "companies",
    value: 6,
    suffix: "",
    label: "Companies",
    caption: "Worked with",
    icon: Briefcase,
  },
  {
    id: "industries",
    value: 7,
    suffix: "",
    label: "Industries",
    caption: "HR tech to AI",
    icon: Layers,
  },
  {
    id: "languages",
    value: 3,
    suffix: "",
    label: "Languages",
    caption: "I write in",
    icon: Languages,
  },
  {
    id: "domains",
    value: 7,
    suffix: "",
    label: "Domains",
    caption: "Bylines live on",
    icon: Globe,
  },
  {
    id: "sites-live",
    value: 4,
    suffix: "",
    label: "Sites live",
    caption: "Shipped end-to-end",
    icon: Rocket,
  },
  {
    id: "sites-building",
    value: 2,
    suffix: "",
    label: "Building",
    caption: "Ship Q3",
    icon: Hammer,
  },
];

// =============================================================
// Main Section
// =============================================================
export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [range, setRange] = useState<RangeKey>("1Y");
  const [paused, setPaused] = useState(false);

  const data = RANGES[range];
  const animationKey = range;

  // Subtle scroll-tied parallax on background grid
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative py-24 md:py-32 border-b border-border bg-foreground text-background overflow-hidden"
    >
      {/* Background — terminal-style dot grid */}
      <motion.div
        style={{ y: gridY }}
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </motion.div>

      {/* Accent glows */}
      <div className="absolute -top-32 -right-40 h-[460px] w-[460px] rounded-full bg-accent/22 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <Header />

        {/* Analytics Console */}
        <Console
          range={range}
          data={data}
          paused={paused}
          onRangeChange={setRange}
          onTogglePause={() => setPaused((p) => !p)}
          animationKey={animationKey}
        />

        {/* Career strip */}
        <CareerStrip />
      </div>
    </section>
  );
}

// =============================================================
// Section Header
// =============================================================
function Header() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-12 md:mb-14">
      <div className="max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-center lg:text-left"
        >
          Numbers I can defend<span className="text-accent">?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 text-sm md:text-base text-background/65 max-w-xl text-center lg:text-left mx-auto lg:mx-0"
        >
          Real data, pulled from Google Search Console, Semrush, and project
          dashboards. Toggle the time range to scrub through history.
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="self-center lg:self-end inline-flex items-center gap-2 rounded-full border border-background/15 bg-background/[0.04] backdrop-blur px-3 py-1.5 text-[11px] font-medium text-background/75"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        Synced {statsUpdatedOn}
      </motion.div>
    </div>
  );
}

// =============================================================
// Analytics Console (the dashboard card)
// =============================================================
function Console({
  range,
  data,
  paused,
  onRangeChange,
  onTogglePause,
  animationKey,
}: {
  range: RangeKey;
  data: RangeData;
  paused: boolean;
  onRangeChange: (k: RangeKey) => void;
  onTogglePause: () => void;
  animationKey: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl border border-background/15 bg-background/[0.04] backdrop-blur-md overflow-hidden"
    >
      {/* Console top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-background/10 px-5 md:px-7 py-4">
        {/* Left: traffic dots + title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-background/20" />
            <span className="size-2.5 rounded-full bg-background/20" />
            <span className="size-2.5 rounded-full bg-background/20" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-background/55">
            search-console.live
          </span>
        </div>

        {/* Right: tabs + pause toggle */}
        <div className="flex items-center gap-2">
          <TimeRangeTabs active={range} onChange={onRangeChange} />
          <button
            type="button"
            onClick={onTogglePause}
            aria-label={paused ? "Resume" : "Pause"}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-background/15 bg-background/[0.04] text-background/70 hover:text-background hover:border-background/30 transition-colors"
          >
            {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
          </button>
        </div>
      </div>

      {/* Hero metric row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 px-5 md:px-7 lg:px-9 pt-7 md:pt-9">
        {/* Left: massive number + trend */}
        <div className="lg:col-span-5">
          <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-background/55 mb-3 flex items-center gap-2">
            <Activity className="size-3 text-accent" />
            Headline metric
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={animationKey}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-[-0.04em] leading-none">
                <Counter
                  value={data.headline.value}
                  suffix={data.headline.suffix}
                  decimals={data.headline.decimals}
                  immediate
                  duration={1800}
                />
              </p>
              <p className="mt-3 text-sm text-background/60">
                {data.headline.label}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-success/15 border border-success/25 px-2.5 py-1 text-[11px] font-medium text-success">
            <ArrowUpRight className="size-3" />
            {data.headline.trend}
          </div>
        </div>

        {/* Right: live source meta */}
        <div className="lg:col-span-7 flex flex-col gap-3 lg:items-end justify-start">
          <div className="grid grid-cols-3 gap-3 w-full lg:max-w-md">
            <MetaPill label="Source" value="GSC" />
            <MetaPill label="Updated" value={statsUpdatedOn.split(" ")[0]} />
            <MetaPill
              label="Status"
              value={paused ? "paused" : "live"}
              accent={!paused}
            />
          </div>
        </div>
      </div>

      {/* Big chart */}
      <div className="px-3 md:px-5 lg:px-7 pt-8 pb-2 text-background/85">
        <AnimatePresence mode="wait">
          <motion.div
            key={`chart-${animationKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AreaChart
              data={data.chart}
              xLabels={data.xLabels}
              yUnit={data.chartYUnit}
              yMax={data.chartYMax}
              animationKey={animationKey}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sub-metric strip inside console */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-background/10 border-t border-background/10">
        <SubMetric
          label="Clicks"
          value={data.sub.clicks.value}
          suffix={data.sub.clicks.suffix}
          decimals={data.sub.clicks.decimals}
          trend={data.sub.clicks.trend}
          animationKey={animationKey}
        />
        <SubMetric
          label="Articles"
          value={data.sub.articles.value}
          suffix={data.sub.articles.suffix}
          trend={data.sub.articles.trend}
          animationKey={animationKey}
        />
        <SubMetric
          label="Growth"
          value={data.sub.growth.value}
          suffix={data.sub.growth.suffix}
          trend={data.sub.growth.trend}
          animationKey={animationKey}
        />
        <SubMetric
          label="CTR"
          value={data.sub.ctr.value}
          suffix={data.sub.ctr.suffix}
          decimals={data.sub.ctr.decimals}
          trend={data.sub.ctr.trend}
          animationKey={animationKey}
        />
      </div>
    </motion.div>
  );
}

// =============================================================
// Time range segmented control
// =============================================================
function TimeRangeTabs({
  active,
  onChange,
}: {
  active: RangeKey;
  onChange: (k: RangeKey) => void;
}) {
  return (
    <div className="relative inline-flex items-center gap-0.5 rounded-full border border-background/15 bg-background/[0.06] p-1">
      {TAB_KEYS.map((k) => {
        const isActive = active === k;
        return (
          <button
            key={k}
            type="button"
            onClick={() => onChange(k)}
            className={cn(
              "relative inline-flex items-center px-3 py-1 text-[11px] font-mono uppercase tracking-[0.12em] rounded-full transition-colors z-10",
              isActive
                ? "text-foreground"
                : "text-background/65 hover:text-background",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="range-pill"
                className="absolute inset-0 rounded-full bg-background"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{k}</span>
          </button>
        );
      })}
    </div>
  );
}

// =============================================================
// Meta pill (Source, Updated, Status)
// =============================================================
function MetaPill({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-background/12 bg-background/[0.03] px-3 py-2">
      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-background/45">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-[13px] font-mono tracking-tight flex items-center gap-1.5",
          accent ? "text-success" : "text-background/85",
        )}
      >
        {accent && (
          <span className="size-1.5 rounded-full bg-success animate-pulse" />
        )}
        {value}
      </p>
    </div>
  );
}

// =============================================================
// Sub-metric tile (inside console bottom strip)
// =============================================================
function SubMetric({
  label,
  value,
  suffix,
  decimals,
  trend,
  animationKey,
}: {
  label: string;
  value: number;
  suffix: string;
  decimals?: number;
  trend: string;
  animationKey: string;
}) {
  return (
    <div className="bg-foreground p-5 md:p-6 relative group/sub hover:bg-background/[0.03] transition-colors">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-background/55 mb-3">
        {label}
      </p>
      <AnimatePresence mode="wait">
        <motion.p
          key={`${label}-${animationKey}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-[-0.03em] leading-none"
        >
          <Counter
            value={value}
            suffix={suffix}
            decimals={decimals}
            immediate
            duration={1400}
          />
        </motion.p>
      </AnimatePresence>
      <p className="mt-2 text-[11px] text-background/55 font-mono">
        <ArrowRight className="inline size-2.5 mr-1 text-accent" />
        {trend}
      </p>
    </div>
  );
}

// =============================================================
// Career strip — separate horizontal row of compact stats
// =============================================================
function CareerStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 md:mt-12"
    >
      <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-background/55 mb-5">
        Career snapshot
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-px bg-background/10 rounded-2xl border border-background/15 overflow-hidden">
        {CAREER_STATS.map((s, i) => (
          <CareerCell stat={s} index={i} key={s.id} />
        ))}
      </div>
    </motion.div>
  );
}

function CareerCell({ stat, index }: { stat: CareerStat; index: number }) {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-foreground hover:bg-background/[0.03] transition-colors group/cell p-5 relative"
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-background/10 text-background/75 group-hover/cell:bg-accent/20 group-hover/cell:text-accent transition-colors mb-3">
        <Icon className="size-3.5" />
      </span>
      <p className="text-2xl md:text-3xl font-medium tracking-[-0.03em] leading-none">
        <Counter
          value={stat.value}
          suffix={stat.suffix}
          decimals={stat.decimals}
          duration={1400}
        />
      </p>
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-background/65 leading-snug">
        {stat.label}
      </p>
      <p className="mt-1 text-[10px] text-background/40 leading-snug">
        {stat.caption}
      </p>
    </motion.div>
  );
}
