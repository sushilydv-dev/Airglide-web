import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Lines } from "../components/TextReveal";
import { GESTURES } from "../data/gestures";

const CYCLE_MS = 3200;

export default function GestureShowcase() {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-25%" });
  const g = GESTURES[index];

  useEffect(() => {
    if (!auto || !inView) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % GESTURES.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [index, auto, inView]);

  const pick = (i) => {
    setAuto(false);
    setIndex(i);
  };

  return (
    <section id="gestures" ref={ref} className="container-page pt-32 sm:pt-44">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="label text-ink-3">(04) The gestures</p>
          <Lines className="section-title mt-5" lines={["Ten shapes.", <span key="n" className="serif-i text-primary">No clicker.</span>]} />
        </div>
        <p className="max-w-sm text-ink-2">Learn them in a minute. Remap any of them, and calibrate Airglide to your own hand in about ten seconds.</p>
      </div>

      <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <ol role="tablist" aria-label="Gestures" className="border-b border-line-strong">
          {GESTURES.map((x, i) => {
            const active = i === index;
            return (
              <li key={x.id} className="relative border-t border-line-strong">
                <button
                  role="tab"
                  aria-selected={active}
                  aria-controls="gesture-camera"
                  onClick={() => pick(i)}
                  className="group grid w-full grid-cols-[44px_1fr_auto] items-baseline gap-4 py-4 text-left"
                >
                  <span className={clsx("label transition-colors", active ? "text-primary" : "text-ink-3")}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={clsx("text-[1.15rem] font-medium transition-all duration-500 sm:text-[1.35rem]", active ? "translate-x-2 text-ink" : "text-ink-2 group-hover:translate-x-1 group-hover:text-ink")}>
                    {x.name}
                  </span>
                  <span className={clsx("serif-i text-[1.25rem] transition-colors sm:text-[1.45rem]", active ? "text-primary" : "text-ink-3")}>{x.action}</span>
                </button>
                {active && (
                  <motion.span layoutId="gesture-line" className="absolute -top-px left-0 h-[2px] w-full origin-left bg-primary/25" transition={{ type: "spring", stiffness: 380, damping: 36 }}>
                    {auto && inView && (
                      <motion.span key={index} className="absolute inset-y-0 left-0 bg-primary" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: CYCLE_MS / 1000, ease: "linear" }} />
                    )}
                  </motion.span>
                )}
              </li>
            );
          })}
        </ol>

        <div className="lg:sticky lg:top-28">
          <div id="gesture-camera" role="tabpanel" data-cursor="Live" className="relative overflow-hidden rounded-[24px] bg-navy" style={{ aspectRatio: "4 / 3" }}>
            <AnimatePresence initial={false}>
              <motion.img
                key={g.id}
                src={g.img}
                alt={`Camera view of the ${g.name} gesture with the hand-tracking skeleton`}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ clipPath: "inset(0 0 0 100%)" }}
                animate={{ clipPath: "inset(0 0 0 0%)" }}
                exit={{ opacity: 0.6 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              />
            </AnimatePresence>
            <span className="label absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-white backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ef4444]" /> Live
            </span>
          </div>
          <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-line-strong pt-4">
            <AnimatePresence mode="wait">
              <motion.p key={g.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="text-[1.1rem]">
                {g.name} <span className="text-ink-3">·</span> <span className="text-ink-2">{g.hint}</span>
              </motion.p>
            </AnimatePresence>
            <span className="label shrink-0 text-ink-3">{auto ? "Auto" : "Paused"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
