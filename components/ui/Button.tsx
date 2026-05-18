import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 ease-out group/btn whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]",
  secondary:
    "bg-transparent text-foreground border border-border-strong hover:border-foreground hover:bg-surface",
  ghost:
    "bg-transparent text-foreground hover:bg-surface",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-14 px-7 text-base",
};

type ButtonAsLink = {
  href: string;
  variant?: Variant;
  size?: Size;
  arrow?: "diagonal" | "right" | "none";
  external?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = "right",
  external = false,
  className,
  children,
}: ButtonAsLink) {
  const ArrowIcon = arrow === "diagonal" ? ArrowUpRight : ArrowRight;
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...linkProps}
    >
      <span>{children}</span>
      {arrow !== "none" && (
        <ArrowIcon
          className="size-4 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          aria-hidden
        />
      )}
    </Link>
  );
}
