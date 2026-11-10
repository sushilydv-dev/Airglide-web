import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

// A dot that follows the pointer and a ring that trails it. Over links and buttons the ring grows;
// over anything with data-cursor="Label" it becomes a filled disc with that label.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState({ hover: false, label: "", down: false });
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target instanceof Element ? e.target : null;
      const labelled = t?.closest("[data-cursor]");
      const interactive = t?.closest("a, button, [role=tab], input, select, textarea, label");
      setState((s) => {
        const next = { ...s, hover: !!(labelled || interactive), label: labelled?.getAttribute("data-cursor") || "" };
        return next.hover === s.hover && next.label === s.label ? s : next;
      });
    };
    const down = () => setState((s) => ({ ...s, down: true }));
    const up = () => setState((s) => ({ ...s, down: false }));
    const leave = () => { x.set(-100); y.set(-100); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = state.label ? 92 : state.hover ? 54 : 34;
  return (
    <>
      <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100]" style={{ x: rx, y: ry }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            width: size, height: size,
            scale: state.down ? 0.85 : 1,
            backgroundColor: state.label ? "rgba(37,99,235,1)" : "rgba(37,99,235,0)",
            borderColor: state.label ? "rgba(37,99,235,1)" : state.hover ? "rgba(37,99,235,0.9)" : "rgba(37,99,235,0.45)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          style={{ borderWidth: 1.5, borderStyle: "solid" }}
        >
          {state.label && (
            <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} className="label grid h-full w-full place-items-center text-[0.68rem] text-white">
              {state.label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
      <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100]" style={{ x, y }}>
        <div className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-[width,height,opacity] duration-200 ${state.label ? "h-0 w-0 opacity-0" : "h-1.5 w-1.5"}`} />
      </motion.div>
    </>
  );
}
