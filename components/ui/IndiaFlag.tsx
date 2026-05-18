import type { SVGProps } from "react";

// Simplified inline India flag — three horizontal stripes + a tiny chakra dot.
// Designed for inline use next to text (recommended 12-16px height).
export function IndiaFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 30 20"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="India"
      {...props}
    >
      <rect width="30" height="6.67" fill="#FF9933" />
      <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
      <rect y="13.33" width="30" height="6.67" fill="#138808" />
      {/* Tiny Ashoka chakra */}
      <circle
        cx="15"
        cy="10"
        r="2"
        fill="none"
        stroke="#000080"
        strokeWidth="0.5"
      />
      <circle cx="15" cy="10" r="0.45" fill="#000080" />
      {/* Subtle border for visibility on any background */}
      <rect
        width="30"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth="0.6"
      />
    </svg>
  );
}
