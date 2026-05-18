"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";

interface HeroParticlesProps {
  /** Number of particles. Default 22 for subtle intensity. */
  count?: number;
  /** Seed for deterministic random (avoids hydration mismatch) */
  seed?: number;
  className?: string;
}

// Cheap deterministic pseudo-random so client + server agree
function pseudoRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function HeroParticles({
  count = 22,
  seed = 42,
  className = "",
}: HeroParticlesProps) {
  const particles = useMemo(() => {
    const rng = pseudoRandom(seed);
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: rng() * 100,
      size: 1 + rng() * 2.2,
      duration: 10 + rng() * 9,
      delay: rng() * 14,
      opacity: 0.25 + rng() * 0.3,
      xDrift: (rng() - 0.5) * 100,
    }));
  }, [count, seed]);

  return (
    <div
      aria-hidden
      className={`service-motion-layer absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-accent will-change-transform"
          style={
            {
              left: `${p.left}%`,
              bottom: -10,
              width: p.size,
              height: p.size,
              "--particle-opacity": p.opacity,
              "--particle-x": `${p.xDrift}px`,
              animation: `particle-drift ${p.duration}s linear ${p.delay}s infinite`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
