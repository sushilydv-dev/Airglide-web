import { AnimatePresence, animate, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Mark } from "./Logo";
import { lenisRef } from "../lib/scroll";

const KEY = "airglide-intro-seen";

// A short counter-and-curtain intro, once per browser session.
export default function Preloader() {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem(KEY) && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  });
  const count = useRef(null);

  useEffect(() => {
    if (!show) return;
    lenisRef.current?.stop();
    document.documentElement.style.overflow = "hidden";
    const controls = animate(0, 100, {
      duration: 1.5,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => { if (count.current) count.current.textContent = String(Math.round(v)).padStart(3, "0"); },
      onComplete: () => setTimeout(() => setShow(false), 180),
    });
    return () => controls.stop();
  }, [show]);

  useEffect(() => {
    if (show) return;
    try { sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    document.documentElement.style.overflow = "";
    lenisRef.current?.start();
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="noise fixed inset-0 z-[90] flex flex-col justify-between bg-navy p-6 text-white sm:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between">
            <span className="label text-white/60">Airglide</span>
            <span className="label text-white/60">Present hands-free</span>
          </div>
          <div className="flex items-end justify-between gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-[#4f86ff]">
              <Mark className="h-16 w-16 sm:h-24 sm:w-24" />
            </motion.div>
            <span ref={count} className="display text-[22vw] leading-[0.8] tabular-nums sm:text-[16vw]">000</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
