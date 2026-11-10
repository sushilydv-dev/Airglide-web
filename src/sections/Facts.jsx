import { motion } from "motion/react";
import CountUp from "../components/CountUp";

const FACTS = [
  { n: 21, label: "Points tracked on your hand" },
  { n: 10, label: "Gestures out of the box" },
  { n: 0, label: "Accounts, keys or sign-ups" },
  { n: 2, label: "Platforms, macOS and Windows" },
];

export default function Facts() {
  return (
    <section aria-label="Airglide in numbers" className="container-page pt-32 sm:pt-44">
      <p className="label text-ink-3">(06) In numbers</p>
      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4">
        {FACTS.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            className="border-t border-line-strong py-8 pr-6 lg:border-l lg:border-t-0 lg:px-8 lg:first:border-l-0 lg:first:pl-0"
          >
            <p className="display text-[5rem] tabular-nums sm:text-[7rem] lg:text-[9rem]">
              <CountUp to={f.n} />
            </p>
            <p className="label mt-4 max-w-[14rem] leading-relaxed text-ink-2">{f.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
