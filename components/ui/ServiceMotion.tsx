"use client";

import { motion } from "framer-motion";

interface ServiceMotionProps {
  serviceId: string;
}

// Service-specific subtle motion overlays.
// Each returns a self-contained absolute-positioned layer.
export function ServiceMotion({ serviceId }: ServiceMotionProps) {
  if (serviceId === "content-writing") return <ContentWritingMotion />;
  if (serviceId === "website-development") return <WebDevMotion />;
  if (serviceId === "digital-marketing") return <MarketingMotion />;
  if (serviceId === "cms-setup") return <CmsMotion />;
  if (serviceId === "automation") return <AutomationMotion />;
  return null;
}

// =============================================================
// Content Writing — drifting text-line cards
// =============================================================
function ContentWritingMotion() {
  return (
    <div
      aria-hidden
      className="service-motion-layer absolute inset-0 pointer-events-none overflow-hidden"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ y: "60vh", opacity: 0 }}
          animate={{
            y: "-30vh",
            opacity: [0, 0.45, 0.45, 0],
          }}
          transition={{
            duration: 16 + i * 2,
            repeat: Infinity,
            delay: i * 5,
            ease: "linear",
            opacity: { times: [0, 0.15, 0.85, 1] },
          }}
          className="absolute w-28 rounded-lg border border-white/15 bg-white/[0.04] backdrop-blur-sm p-2 space-y-1.5"
          style={{
            right: `${8 + i * 12}%`,
            top: 0,
          }}
        >
          <div className="h-1 w-3/4 rounded bg-accent/45" />
          <div className="h-1 w-1/2 rounded bg-white/25" />
          <div className="h-1 w-2/3 rounded bg-white/25" />
        </motion.div>
      ))}
    </div>
  );
}

// =============================================================
// Web Development — scan-line sweep + floating code panel
// =============================================================
function WebDevMotion() {
  return (
    <div
      aria-hidden
      className="service-motion-layer absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* Horizontal scan line sweeping down */}
      <span
        className="absolute left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent will-change-transform"
        style={{
          top: 0,
          animation: "scan-sweep 9s linear infinite",
        }}
      />
      {/* Floating code panel */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{
          opacity: [0, 0.45, 0.45, 0],
          x: [30, 0, 0, -20],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          opacity: { times: [0, 0.18, 0.82, 1] },
        }}
        className="absolute right-[8%] top-[38%] w-36 rounded-lg border border-white/15 bg-black/40 backdrop-blur-md p-2.5 space-y-1.5"
      >
        <div className="flex items-center gap-1">
          <span className="size-1 rounded-full bg-accent/70" />
          <span className="size-1 rounded-full bg-white/30" />
          <span className="size-1 rounded-full bg-white/30" />
        </div>
        <div className="h-1 w-2/3 rounded bg-white/30 ml-2" />
        <div className="h-1 w-1/2 rounded bg-accent/45 ml-4" />
        <div className="h-1 w-3/5 rounded bg-white/25 ml-2" />
      </motion.div>
    </div>
  );
}

// =============================================================
// Digital Marketing — animated growth bar chart
// =============================================================
function MarketingMotion() {
  const heights = [40, 60, 50, 80, 65, 95];
  return (
    <div
      aria-hidden
      className="service-motion-layer absolute inset-0 pointer-events-none overflow-hidden"
    >
      <div className="absolute right-[7%] bottom-[18%] flex items-end gap-1.5 h-24">
        {heights.map((h, i) => (
          <motion.span
            key={i}
            animate={{
              scaleY: [0.2, h / 100, 0.2],
              opacity: [0.25, 0.65, 0.25],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
            className="w-2 origin-bottom rounded-t bg-accent/65"
            style={{ height: "100%" }}
          />
        ))}
      </div>
    </div>
  );
}

// =============================================================
// CMS Setup — counter-rotating data rings
// =============================================================
function CmsMotion() {
  return (
    <div
      aria-hidden
      className="service-motion-layer absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* Inner ring */}
      <div
        className="absolute right-[14%] top-[38%] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          animation: "ring-rotate 26s linear infinite",
        }}
      >
        <div className="relative size-48 rounded-full border border-accent/25">
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 size-2 rounded-full bg-accent shadow-[0_0_12px_3px_rgba(239,68,68,0.45)]" />
        </div>
      </div>
      {/* Outer ring — counter-rotation */}
      <div
        className="absolute right-[14%] top-[38%] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          animation: "ring-rotate 36s linear infinite reverse",
        }}
      >
        <div className="relative size-72 rounded-full border border-accent/12">
          <span className="absolute -bottom-1 right-1/4 size-1.5 rounded-full bg-accent/70" />
        </div>
      </div>
    </div>
  );
}

// =============================================================
// Automation — SVG paths with traveling light pulses
// =============================================================
function AutomationMotion() {
  const paths = [
    "M 100 380 Q 400 280, 700 380 T 1100 380",
    "M 100 480 Q 400 380, 700 480 T 1100 480",
    "M 100 280 Q 400 180, 700 280 T 1100 280",
  ];
  return (
    <div
      aria-hidden
      className="service-motion-layer absolute inset-0 pointer-events-none overflow-hidden"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="auto-pulse" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(239,68,68,0)" />
            <stop offset="50%" stopColor="rgba(239,68,68,0.85)" />
            <stop offset="100%" stopColor="rgba(239,68,68,0)" />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <g key={i}>
            <path
              d={d}
              fill="none"
              stroke="rgba(239,68,68,0.1)"
              strokeWidth="1"
            />
            <path
              d={d}
              fill="none"
              stroke="url(#auto-pulse)"
              strokeWidth="2"
              strokeDasharray="60 1140"
              style={{
                animation: `dash-flow ${9 + i * 2}s linear ${i * 1.8}s infinite`,
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
