import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";

const ease = [0.22, 1, 0.36, 1];

// Each line slides up from behind a mask, one after another.
export function Lines({ lines, className, lineClassName, delay = 0, as = "h2", once = true, animateNow = false }) {
  const Tag = motion[as];
  const v = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: delay } },
  };
  const line = { hidden: { y: "108%" }, show: { y: "0%", transition: { duration: 1, ease } } };
  const trigger = animateNow ? { animate: "show" } : { whileInView: "show", viewport: { once, margin: "-80px" } };
  return (
    <Tag className={className} variants={v} initial="hidden" {...trigger}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span variants={line} className={clsx("block", lineClassName)}>
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// A paragraph whose words light up as it scrolls through the viewport.
export function ScrollWords({ text, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={clsx("flex flex-wrap", className)}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em]">
      {children}
    </motion.span>
  );
}
