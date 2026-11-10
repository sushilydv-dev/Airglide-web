import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DownloadButton from "../components/DownloadButton";
import Magnetic from "../components/Magnetic";
import { Lines } from "../components/TextReveal";
import { useTheme } from "../lib/theme";

const PHRASES = ["hands-free.", "with a wave.", "from the stage.", "like magic."];
const ease = [0.22, 1, 0.36, 1];

// 21 hand landmarks (an open palm) and the bones between them, as line art.
const PTS = [[50, 92], [36, 84], [27, 72], [20, 62], [13, 53], [38, 52], [35, 36], [33, 26], [32, 17], [49, 49], [49, 31], [49, 20], [49, 10], [59, 51], [61, 34], [62, 24], [63, 15], [68, 56], [73, 43], [76, 35], [79, 27]];
const BONES = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [17, 18], [18, 19], [19, 20], [0, 17]];

function HandArt({ mx, my }) {
  const x = useTransform(mx, [-1, 1], [-18, 18]);
  const y = useTransform(my, [-1, 1], [-12, 12]);
  return (
    <motion.svg style={{ x, y }} viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      {BONES.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={PTS[a][0]} y1={PTS[a][1]} x2={PTS[b][0]} y2={PTS[b][1]}
          stroke="var(--primary)" strokeWidth="0.35" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.55 }}
          transition={{ duration: 1.2, ease, delay: 0.9 + i * 0.04 }}
        />
      ))}
      {PTS.map(([cx, cy], i) => (
        <motion.circle
          key={i} cx={cx} cy={cy} r="0.9" fill="var(--bg)" stroke="var(--primary)" strokeWidth="0.35"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 1.2 + i * 0.035 }}
        />
      ))}
    </motion.svg>
  );
}

function RotatingPhrase() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % PHRASES.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative block h-[1.12em] overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={PHRASES[i]}
          className="serif-i absolute left-0 top-0 block whitespace-nowrap text-primary"
          initial={{ y: "130%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-130%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          {PHRASES[i]}
        </motion.span>
      </AnimatePresence>
      <span className="serif-i invisible">{PHRASES[2]}</span>
    </span>
  );
}

export default function Hero() {
  const { theme } = useTheme();
  const shot = useRef(null);
  const { scrollYProgress } = useScroll({ target: shot, offset: ["start end", "start 0.25"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const inset = useTransform(p, [0, 1], [14, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v}% 0% ${v}% round 28px)`);
  const imgScale = useTransform(p, [0, 1], [1.25, 1]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const onMove = (e) => {
    mx.set((e.clientX / innerWidth) * 2 - 1);
    my.set((e.clientY / innerHeight) * 2 - 1);
  };

  return (
    <section id="hero" onPointerMove={onMove} className="relative">
      <div className="container-page relative flex min-h-[100svh] flex-col justify-end pb-12 pt-32">
        <div aria-hidden="true" className="pointer-events-none absolute right-[-9%] top-[4%] h-[58%] w-[40%] opacity-60 max-lg:hidden">
          <HandArt mx={mx} my={my} />
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-wrap items-center justify-between gap-3 border-b border-line-strong pb-4">
          <span className="label text-ink-2">(Airglide) — Gesture control for presenters</span>
          <span className="label text-ink-2">macOS · Windows</span>
        </motion.div>

        <h1 className="display relative mt-8 text-[clamp(3rem,19vw,17rem)]">
          <Lines as="span" animateNow delay={0.35} lines={["Present"]} />
          <motion.span className="block text-[0.6em]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.65 }}>
            <RotatingPhrase />
          </motion.span>
        </h1>

        <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.9 }} className="max-w-xl text-[1.15rem] leading-relaxed text-ink-2 sm:text-[1.3rem]">
            Your webcam becomes the remote. Change slides, point, draw and click with simple hand gestures, with an AI that has
            read your deck and <span className="serif-i text-[1.15em] text-ink">never leaves your computer</span>.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 1.05 }} className="flex flex-wrap items-end gap-6">
            <Magnetic>
              <DownloadButton />
            </Magnetic>
            <Link to="/#statement" className="label group hidden items-center gap-3 pb-5 text-ink-2 hover:text-ink sm:inline-flex">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-ink">
                <ArrowDown className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-1" />
              </span>
              Scroll
            </Link>
          </motion.div>
        </div>
      </div>

      {/* product shot, unmasked as it scrolls in */}
      <div ref={shot} className="px-3 sm:px-5">
        <motion.div style={{ clipPath }} className="relative mx-auto max-w-[1560px] overflow-hidden bg-navy" data-cursor="Airglide">
          <motion.img
            key={theme}
            style={{ scale: imgScale }}
            src={theme === "dark" ? "/images/hero-dark.webp" : "/images/hero-light.webp"}
            alt="The Airglide dashboard with its talk timeline, and the quick panel showing a live hand gesture"
            width={2400}
            height={1551}
            className="block h-auto w-full"
            fetchPriority="high"
          />
        </motion.div>
      </div>
    </section>
  );
}
