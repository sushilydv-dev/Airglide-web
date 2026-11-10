import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Lines } from "../components/TextReveal";

const POINTS = [
  { title: "Video never leaves your computer", body: "Hand tracking runs on-device. Frames are analysed in memory and thrown away. Nothing is recorded or uploaded." },
  { title: "The AI runs on-device too", body: "The assistant is a small language model on your own machine. Your slides only go to a server if you choose Gemini." },
  { title: "Offline mode", body: "One switch stops update checks, model downloads and Gemini. Gestures, the mouse and the on-device AI keep working." },
];

export default function Privacy() {
  return (
    <section id="privacy" className="container-page pt-32 sm:pt-44">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <p className="label text-ink-3">(07) Privacy</p>
          <Lines
            as="h2"
            className="mt-5 text-[2.6rem] font-medium leading-[1.02] tracking-[-0.03em] sm:text-[4rem] lg:text-[4.6rem]"
            lines={["Your camera,", "your slides,", <span key="c" className="serif-i text-primary">your computer.</span>]}
          />
          <Link to="/privacy" className="btn mt-10">Read the privacy policy →</Link>
        </div>
        <ul className="self-end border-b border-line-strong">
          {POINTS.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="grid grid-cols-[44px_1fr] gap-4 border-t border-line-strong py-7"
            >
              <span className="label pt-1.5 text-primary">0{i + 1}</span>
              <div>
                <h3 className="text-[1.3rem] font-medium">{p.title}</h3>
                <p className="mt-2 text-ink-2">{p.body}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
