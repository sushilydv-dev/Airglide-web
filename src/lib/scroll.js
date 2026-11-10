// One Lenis instance for the whole site (set by SmoothScroll). Falls back to native scrolling.
export const lenisRef = { current: null };

export function scrollToTarget(target, opts = {}) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (lenisRef.current) {
    lenisRef.current.scrollTo(el ?? 0, { offset: el ? -88 : 0, duration: 1.2, ...opts });
  } else if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior: opts.immediate ? "auto" : "smooth" });
  }
}
