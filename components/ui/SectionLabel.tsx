import { cn } from "@/lib/utils";

export function SectionLabel({
  number,
  label,
  className,
}: {
  number?: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-muted",
        className,
      )}
    >
      {number && (
        <span className="font-mono text-accent">{number}</span>
      )}
      <span className="h-px w-8 bg-border-strong" />
      <span>{label}</span>
    </div>
  );
}
