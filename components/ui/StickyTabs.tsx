"use client";

import { Children, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

// =============================================================
// StickyTabs — Apple/Stripe-style sticky category sections.
// As you scroll, each section's header sticks to the top
// (just below the main nav) until the next section pushes it up.
// =============================================================

interface StickyTabItemProps {
  id: string;
  title: ReactNode;
  /** Optional badge/status shown next to the title in the sticky header */
  meta?: ReactNode;
  /** Optional action element (button, link) shown on the right of the sticky header */
  action?: ReactNode;
  children: ReactNode;
}

function StickyTabItem(_props: StickyTabItemProps) {
  // This is a marker component — actual rendering happens in <StickyTabs>
  return null;
}

interface StickyTabsProps {
  children: ReactNode;
  className?: string;
  /** Tailwind class string for the sticky top offset. Default accounts for our nav. */
  stickyTopClassName?: string;
  /** Wrapper class for the sticky header bar */
  headerClassName?: string;
  /** Wrapper class for the body content area */
  bodyClassName?: string;
}

function StickyTabs({
  children,
  className,
  stickyTopClassName = "top-16 md:top-20",
  headerClassName = "border-b border-border bg-background/85 backdrop-blur-xl",
  bodyClassName = "mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24",
}: StickyTabsProps) {
  return (
    <div className={cn("relative", className)}>
      {Children.map(children, (child) => {
        if (!isValidElement(child) || child.type !== StickyTabItem) {
          return null;
        }
        const el = child as ReactElement<StickyTabItemProps>;
        const { id, title, meta, action, children: content } = el.props;

        return (
          <section
            key={id}
            id={id}
            className="relative scroll-mt-24 md:scroll-mt-28"
          >
            <div
              className={cn(
                "sticky z-30",
                stickyTopClassName,
                headerClassName,
              )}
            >
              <div className="mx-auto max-w-7xl px-5 md:px-8 py-4 md:py-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight truncate">
                    {title}
                  </h3>
                  {meta && <div className="shrink-0">{meta}</div>}
                </div>
                {action && <div className="shrink-0 hidden sm:block">{action}</div>}
              </div>
            </div>

            <div className={bodyClassName}>{content}</div>
          </section>
        );
      })}
    </div>
  );
}

StickyTabs.Item = StickyTabItem;

export default StickyTabs;
export { StickyTabItem };
