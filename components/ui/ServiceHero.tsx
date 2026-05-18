"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Service } from "@/lib/data";
import { HeroParticles } from "./HeroParticles";
import { HeroGlowRings, type GlowSpot } from "./HeroGlowRings";
import { ServiceMotion } from "./ServiceMotion";
import { cn } from "@/lib/utils";

// Per-service glow ring positions (visual focal points for each scene)
const GLOW_SPOTS: Record<string, GlowSpot[]> = {
  "content-writing": [
    { x: "55%", y: "48%", size: 220 },
    { x: "75%", y: "62%", size: 150, delay: 1.8 },
  ],
  "website-development": [
    { x: "50%", y: "50%", size: 260 },
    { x: "78%", y: "32%", size: 140, delay: 2.1 },
  ],
  "digital-marketing": [
    { x: "55%", y: "52%", size: 240 },
    { x: "20%", y: "65%", size: 160, delay: 1.5 },
  ],
  "cms-setup": [
    { x: "45%", y: "50%", size: 220 },
    { x: "72%", y: "40%", size: 170, delay: 2.4 },
  ],
  automation: [
    { x: "50%", y: "50%", size: 280 },
    { x: "30%", y: "35%", size: 150, delay: 1.7 },
    { x: "75%", y: "62%", size: 130, delay: 3.0 },
  ],
};

interface ServiceHeroProps {
  service: Service;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Parallax: background drifts slower than content as you scroll
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // Play video only when visible
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const isLive = service.status === "live";
  const spots = GLOW_SPOTS[service.id] ?? [];

  return (
    <div
      ref={rootRef}
      className="relative w-full overflow-hidden bg-foreground"
    >
      {/* Background media (parallax wrapper, scale to hide edge gaps) */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 scale-[1.12] z-0"
      >
        {service.video ? (
          <video
            ref={videoRef}
            src={service.video}
            poster={service.image}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          // Ken Burns subtle zoom on the static image
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative h-full w-full will-change-transform"
          >
            <Image
              src={service.image}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Dark gradient overlays for content legibility */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/35 via-black/45 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/20 to-transparent pointer-events-none" />

      {/* Motion overlay stack (subtle layers) */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <HeroGlowRings spots={spots} />
      </div>
      <div className="absolute inset-0 z-[3] pointer-events-none">
        <HeroParticles count={22} seed={service.id.length * 7 + 11} />
      </div>
      <div className="absolute inset-0 z-[4] pointer-events-none">
        <ServiceMotion serviceId={service.id} />
      </div>

      {/* Large section number watermark (bottom-right) */}
      <span
        aria-hidden
        className="absolute z-[5] pointer-events-none select-none font-medium leading-none -bottom-8 -right-4 md:-bottom-14 md:-right-8 text-[180px] md:text-[280px] lg:text-[360px]"
        style={{
          WebkitTextStroke: "1.5px rgba(255,255,255,0.18)",
          color: "transparent",
        }}
      >
        {service.number}
      </span>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28 lg:py-32 min-h-[62vh] md:min-h-[72vh] lg:min-h-[78vh] flex flex-col justify-end">
        <div className="max-w-3xl">
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1.5 text-[11px] font-medium text-white mb-6 md:mb-7"
          >
            {isLive ? (
              <>
                <span className="size-1.5 rounded-full bg-success animate-pulse" />
                Taking clients
              </>
            ) : (
              <>
                <span className="size-1.5 rounded-full bg-white/40" />
                Coming soon
              </>
            )}
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.75,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-3xl md:text-5xl lg:text-[3.5rem] font-medium tracking-[-0.025em] leading-[1.05] text-white"
          >
            {service.tagline}
          </motion.p>

          {/* CTA + Timeline row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 md:mt-10 flex flex-wrap items-center gap-4 md:gap-6"
          >
            <Link
              href={service.cta.href}
              className={cn(
                "group/cta inline-flex items-center gap-2 rounded-full text-sm md:text-base font-medium transition-all active:scale-[0.98]",
                isLive
                  ? "bg-white hover:bg-white/95 h-12 md:h-13 pl-6 pr-1.5"
                  : "border border-white/30 text-white hover:bg-white/10 h-12 md:h-13 px-6",
              )}
              style={isLive ? { color: "#0a0a0a" } : undefined}
            >
              <span>{service.cta.label}</span>
              {isLive && (
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
                </span>
              )}
            </Link>

            <span className="inline-flex items-center gap-2 text-sm text-white/70">
              <Clock className="size-4 text-white/55" />
              {service.timeline}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
