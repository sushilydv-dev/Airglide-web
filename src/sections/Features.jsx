import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../lib/theme";

const PANELS = (dark) => [
  { n: "01", title: "Gesture", accent: "control", body: "Next, back, first, last, black screen and exit, all by hand. A live camera view shows the skeleton Airglide sees and which action is about to fire.", img: dark ? "/images/gestures-dark.webp" : "/images/gestures.webp", alt: "The gesture control page with a live camera" },
  { n: "02", title: "Virtual", accent: "mouse", body: "Point to move the cursor, pinch to click, three fingers to scroll. Made for links, videos and live demos mid-talk.", img: "/images/mouse.webp", alt: "The virtual mouse page with a camera view" },
  { n: "03", title: "An AI that", accent: "knows your deck", body: "Talking points, likely audience questions and instant answers, from a small model that runs on your own computer.", img: "/images/assistant.webp", alt: "The slide assistant page" },
  { n: "04", title: "Talk", accent: "timeline", body: "Airglide estimates how long each slide should take, or fits your target length, and tells you live whether you're on track.", img: dark ? "/images/dashboard-dark.webp" : "/images/dashboard.webp", alt: "The dashboard with the talk timeline" },
  { n: "05", title: "Quick", accent: "panel", body: "A small button stays on screen while you present, even over a full-screen slideshow, with the camera and controls one click away.", img: "/images/presenting-panel.webp", alt: "The quick panel over a full-screen slideshow" },
];

function Panel({ p, className = "" }) {
  return (
    <article className={`group flex shrink-0 flex-col ${className}`}>
      <div className="flex items-baseline justify-between border-t border-line-strong pt-4">
        <span className="label text-ink-3">({p.n})</span>
        <span className="label text-ink-3">Feature</span>
      </div>
      <h3 className="display mt-6 text-[2.8rem] sm:text-[3.8rem]">
        {p.title} <span className="serif-i text-primary">{p.accent}</span>
      </h3>
      <p className="mt-4 max-w-md text-ink-2">{p.body}</p>
      <div className="mt-8 overflow-hidden rounded-[20px] border border-line bg-surface" data-cursor="View">
        <img src={p.img} alt={p.alt} loading="lazy" className="block aspect-[16/10] w-full object-cover object-left-top transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" />
      </div>
    </article>
  );
}

export default function Features() {
  const { theme } = useTheme();
  const panels = PANELS(theme === "dark");
  const target = useRef(null);
  const track = useRef(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - innerWidth));
    };
    measure();
    addEventListener("resize", measure);
    return () => removeEventListener("resize", measure);
  }, []);

  return (
    <section id="features" className="pt-32 sm:pt-44">
      <div className="container-page flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="label text-ink-3">(02) What it does</p>
          <h2 className="section-title mt-5">
            Five tools, <span className="serif-i text-primary">one</span> hand
          </h2>
        </div>
        <p className="max-w-sm text-ink-2">Everything a presenter reaches for, driven by a normal webcam. Keep scrolling to move through them.</p>
      </div>

      {/* desktop: pinned, scrolls sideways */}
      <div ref={target} className="relative mt-16 hidden lg:block" style={{ height: `calc(100vh + ${distance}px)` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.div ref={track} style={{ x }} className="flex gap-16 pl-[max(3rem,calc((100vw-1320px)/2+3rem))] pr-24">
            {panels.map((p) => (
              <Panel key={p.n} p={p} className="w-[44vw] min-w-[520px] max-w-[620px] overflow-hidden" />
            ))}
          </motion.div>
          <div className="container-page mt-10">
            <div className="h-px w-full bg-line">
              <motion.div style={{ width: progress }} className="h-px bg-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* phones and tablets: stacked */}
      <div className="container-page mt-14 grid gap-16 lg:hidden">
        {panels.map((p) => (
          <Panel key={p.n} p={p} />
        ))}
      </div>
    </section>
  );
}
