import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

// Counts from 0 to `to` the first time it scrolls into view.
export default function CountUp({ to, suffix = "", duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, duration]);
  return <span ref={ref}>0{suffix}</span>;
}
