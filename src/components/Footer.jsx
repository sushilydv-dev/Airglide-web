import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { GITHUB_URL, ISSUES_URL } from "../lib/site";

const COLS = [
  { title: "Product", links: [["Features", "/#features"], ["Gestures", "/#gestures"], ["How it works", "/#how"], ["Download", "/download"]] },
  { title: "Help", links: [["Getting started", "/docs"], ["Permissions", "/docs#permissions"], ["Troubleshooting", "/docs#troubleshooting"], ["FAQ", "/#faq"]] },
  { title: "Project", links: [["Changelog", "/changelog"], ["Privacy", "/privacy"], ["GitHub ↗", GITHUB_URL], ["Report a bug ↗", ISSUES_URL]] },
];

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["35%", "0%"]);

  return (
    <footer ref={ref} className="relative mt-32 overflow-hidden border-t border-line-strong">
      <div className="container-page grid gap-12 pb-10 pt-16 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <p className="label text-ink-3">(Airglide)</p>
          <p className="mt-4 max-w-sm text-[1.35rem] leading-snug">
            Gesture control, a virtual mouse and an on-device AI for your slides. <span className="serif-i text-[1.5rem] text-primary">Present hands-free.</span>
          </p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <h3 className="label text-ink-3">{c.title}</h3>
            <ul className="mt-5 space-y-2.5">
              {c.links.map(([label, to]) => (
                <li key={label}>
                  {to.startsWith("http") ? (
                    <a href={to} target="_blank" rel="noreferrer" className="link-underline text-ink-2 hover:text-ink">{label}</a>
                  ) : (
                    <Link to={to} className="link-underline text-ink-2 hover:text-ink">{label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-page flex flex-col justify-between gap-2 border-t border-line py-5 sm:flex-row">
        <p className="label text-ink-3">© {new Date().getFullYear()} Airglide</p>
        <p className="label text-ink-3">Video and AI stay on your computer</p>
      </div>
      <motion.p style={{ y }} aria-hidden="true" className="display select-none whitespace-nowrap px-3 pb-3 text-center text-[20.8vw] leading-[0.78] text-ink">
        Airglide
      </motion.p>
    </footer>
  );
}
