import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";

// Giant scrolling text that speeds up (and reverses) with the page's scroll velocity.
export default function VelocityMarquee({ children, baseVelocity = -2.5, className }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const dir = useRef(1);
  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });
  return (
    <div className={clsx("overflow-hidden whitespace-nowrap", className)} aria-hidden="true">
      <motion.div className="flex w-max" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex shrink-0 items-center">{children}</span>
        ))}
      </motion.div>
    </div>
  );
}
