import { Link } from "react-router-dom";
import clsx from "clsx";

// The glide mark from the app (views/icons.js BRAND_SVG).
export function Mark({ className }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <path d="M5 22.5C9 11 15 5.5 21.5 5.5c3.2 0 5.3 1.4 6 3.5-4.6-1.4-11.2 2-16.4 13.5z" fill="currentColor" />
      <path d="M9.5 26.5c5.8-9.2 11.3-12.6 17.5-11.4-1.6 5.8-7.6 11.4-17.5 11.4z" fill="currentColor" opacity=".55" />
    </svg>
  );
}

export function MarkTile({ className, size = "md" }) {
  const s = size === "lg" ? "h-16 w-16 rounded-[20px]" : size === "sm" ? "h-9 w-9 rounded-[11px]" : "h-11 w-11 rounded-[14px]";
  return (
    <span className={clsx("grid place-items-center border border-line bg-white text-[#2563eb]", s, className)}>
      <Mark className={size === "lg" ? "h-9 w-9" : size === "sm" ? "h-5 w-5" : "h-6 w-6"} />
    </span>
  );
}

export default function Logo({ className }) {
  return (
    <Link to="/" className={clsx("group relative z-[60] inline-flex items-center gap-2.5", className)} aria-label="Airglide home">
      <Mark className="h-7 w-7 text-primary transition-transform duration-500 group-hover:-rotate-12" />
      <span className="display text-[1.2rem] tracking-[-0.02em]">Airglide</span>
    </Link>
  );
}
