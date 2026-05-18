"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "default" | "minimal" | "ghost";

export function ThemeToggle({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: Variant;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  const base =
    variant === "minimal"
      ? "relative inline-flex h-8 w-8 items-center justify-center rounded-xl text-muted hover:text-foreground hover:bg-surface transition-colors"
      : variant === "ghost"
        ? "relative inline-flex h-9 w-9 items-center justify-center rounded-full text-muted hover:text-foreground hover:bg-surface transition-colors"
        : "relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-foreground hover:bg-surface transition-colors";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(base, className)}
    >
      {mounted && (
        <>
          <Sun
            className={cn(
              "size-4 absolute transition-all duration-300",
              isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
            )}
          />
          <Moon
            className={cn(
              "size-4 absolute transition-all duration-300",
              isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0",
            )}
          />
        </>
      )}
    </button>
  );
}
