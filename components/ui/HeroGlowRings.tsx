"use client";

export interface GlowSpot {
  /** Horizontal position as CSS percentage string, e.g. "55%" */
  x: string;
  /** Vertical position as CSS percentage string, e.g. "45%" */
  y: string;
  /** Diameter in px */
  size: number;
  /** Optional start delay in seconds */
  delay?: number;
  /** Optional pulse duration override in seconds (default 4) */
  duration?: number;
}

interface HeroGlowRingsProps {
  spots: GlowSpot[];
  className?: string;
}

export function HeroGlowRings({ spots, className = "" }: HeroGlowRingsProps) {
  if (spots.length === 0) return null;

  return (
    <div
      aria-hidden
      className={`service-motion-layer absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {spots.map((s, i) => {
        const duration = s.duration ?? 4 + i * 0.6;
        const delay = s.delay ?? i * 1.3;
        return (
          <span
            key={i}
            className="absolute rounded-full will-change-transform"
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              background:
                "radial-gradient(circle, rgba(239,68,68,0.55) 0%, rgba(239,68,68,0) 60%)",
              animation: `glow-pulse ${duration}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
