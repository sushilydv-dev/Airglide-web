import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { Lines } from "../components/TextReveal";

const STEPS = [
  { word: "See", body: "Your webcam sees your hand. Any built-in or USB camera works, with no gloves, sensors or extra hardware.", img: "/images/hand-palm.webp" },
  { word: "Read", body: "On-device hand tracking follows 21 points on your hand, many times a second, and recognises the shape.", img: "/images/hand-shaka.webp" },
  { word: "Hold", body: "Keep the gesture steady for a moment and a ring fills. Nothing fires from a passing wave.", img: "/images/hand-four.webp" },
  { word: "Act", body: "Airglide presses the right key in PowerPoint, Keynote, Google Slides, Impress or your PDF viewer.", img: "/images/presenting.webp" },
  { word: "Pause", body: "Hold an L-shape to pause everything, so talking with your hands never changes a slide.", img: "/images/hand-l.webp" },
];

export default function HowItWorks() {
  const [hover, setHover] = useState(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 28 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 28 });
  const move = (e) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <section id="how" className="container-page pt-32 sm:pt-44" onPointerMove={move}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="label text-ink-3">(03) How it works</p>
          <Lines className="section-title mt-5" lines={["From hand", <span key="s" className="serif-i text-primary">to slide</span>]} />
          <p className="section-lead">Five steps, in a fraction of a second. You only ever do two of them.</p>
        </div>

        <ol className="border-b border-line-strong">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.word}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className="group relative grid gap-3 border-t border-line-strong py-8 sm:grid-cols-[140px_1fr] sm:gap-8 sm:py-10"
            >
              <span className="label pt-2 text-ink-3">Step no.{i + 1}</span>
              <div>
                <h3 className="display text-[3.6rem] transition-[color,transform] duration-500 group-hover:translate-x-3 group-hover:text-primary sm:text-[6rem]">{s.word}</h3>
                <p className="mt-3 max-w-lg text-ink-2">{s.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* image that follows the pointer while a step is hovered */}
      <motion.div aria-hidden="true" style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block">
        <AnimatePresence>
          {hover !== null && (
            <motion.div
              key={hover}
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="-translate-x-1/2 -translate-y-[115%] overflow-hidden rounded-[18px] shadow-[var(--shadow-lg)]"
            >
              <img src={STEPS[hover].img} alt="" className="h-[200px] w-[280px] object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
