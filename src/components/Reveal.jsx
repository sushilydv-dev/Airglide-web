import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1];

// Fades and lifts its children into view once, as they scroll in.
export default function Reveal({ children, delay = 0, y = 24, className, as = "div", ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
export const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function Stagger({ children, className, as = "div" }) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
      {children}
    </Tag>
  );
}
