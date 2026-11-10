import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import clsx from "clsx";
import { Lines } from "../components/TextReveal";

const VIEWS = [
  { id: "button", title: "A button that stays put", body: "While you present, a small Airglide button sits in the corner, even over a full-screen slideshow.", img: "/images/presenting.webp" },
  { id: "panel", title: "Camera and controls, one click away", body: "Check what the camera sees, pause, stop or switch to the virtual mouse without leaving the slideshow.", img: "/images/presenting-panel.webp" },
  { id: "gestures", title: "Your gestures, right there", body: "Forgot a gesture mid-talk? The panel lists them all and lights up the one you're making.", img: "/images/presenting-gestures.webp" },
];

export default function PresentingShowcase() {
  const [active, setActive] = useState(1);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const v = VIEWS[active];

  return (
    <section id="presenting" ref={ref} className="noise relative mt-32 overflow-hidden bg-navy py-24 text-white sm:mt-44 sm:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 bottom-0 h-[520px] w-[760px] rounded-full bg-[#2563eb]/35 blur-[140px]" />
      </div>
      <div className="container-page relative">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="label text-white/50">(05) On stage</p>
            <Lines className="section-title mt-5" lines={["Stays with you", <span key="f" className="serif-i text-[#8fb0f5]">in full screen</span>]} />
          </div>
          <p className="max-w-sm text-white/65">Shown here with Keynote. Airglide works the same way with PowerPoint, Google Slides, Impress and PDFs.</p>
        </div>

        <motion.div style={{ scale }} className="relative mt-16 overflow-hidden rounded-[24px] ring-1 ring-white/10" data-cursor="Keynote">
          <div className="relative bg-black" style={{ aspectRatio: "3456 / 2234" }}>
            <AnimatePresence initial={false}>
              <motion.img
                key={v.id}
                src={v.img}
                alt={`Airglide over a full-screen Keynote slideshow: ${v.title.toLowerCase()}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="mt-12 grid border-b border-white/15 md:grid-cols-3" role="tablist" aria-label="Presenting views">
          {VIEWS.map((x, i) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className="group relative border-t border-white/15 py-6 text-left md:pr-8"
            >
              <span className={clsx("absolute -top-px left-0 h-[2px] bg-[#4f86ff] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]", i === active ? "w-full" : "w-0")} />
              <span className="label text-white/45">0{i + 1}</span>
              <h3 className={clsx("mt-3 text-[1.25rem] font-medium transition-colors", i === active ? "text-white" : "text-white/60 group-hover:text-white")}>{x.title}</h3>
              <p className="mt-2 text-[0.95rem] text-white/55">{x.body}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
