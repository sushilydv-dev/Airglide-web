import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import Magnetic from "./Magnetic";
import { GITHUB_URL, NAV } from "../lib/site";
import { lenisRef } from "../lib/scroll";

const ease = [0.76, 0, 0.24, 1];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 24);
    setHidden(v > 400 && v > prev && !open); // tuck away while scrolling down
  });
  useEffect(() => setOpen(false), [location.pathname, location.hash]);
  useEffect(() => {
    if (open) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={clsx("transition-[background-color,border-color] duration-500", scrolled && !open ? "glass border-b border-line" : "border-b border-transparent")}>
          <nav className="container-page flex h-[72px] items-center gap-6" aria-label="Main">
            <Logo />
            <ul className="ml-auto hidden items-center gap-8 lg:flex">
              {NAV.map((n, i) => (
                <li key={n.to}>
                  <Link to={n.to} className="group relative inline-flex items-baseline gap-1.5 py-2 text-[0.95rem] text-ink-2 transition-colors hover:text-ink">
                    <span className="label text-[0.62rem] text-ink-3">0{i + 1}</span>
                    {n.label}
                    <span className="absolute inset-x-0 bottom-1 h-px origin-right scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:origin-left group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="ml-auto flex items-center gap-3 lg:ml-6">
              <ThemeToggle className="hidden sm:flex" />
              <Magnetic className="hidden sm:block">
                <Link to="/download" className="btn btn-primary h-11 px-5 text-[0.92rem]">Download</Link>
              </Magnetic>
              <button
                onClick={() => setOpen((o) => !o)}
                className="label relative z-[60] flex h-11 items-center gap-3 rounded-full border border-line-strong px-4 text-ink lg:hidden"
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? "Close" : "Menu"}
                <span className="relative block h-2.5 w-4">
                  <span className={clsx("absolute left-0 h-px w-4 bg-current transition-all duration-300", open ? "top-1 rotate-45" : "top-0")} />
                  <span className={clsx("absolute left-0 h-px w-4 bg-current transition-all duration-300", open ? "top-1 -rotate-45" : "top-2")} />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="noise fixed inset-0 z-[45] flex flex-col bg-bg px-5 pb-8 pt-28 sm:px-8 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
          >
            <ul className="flex flex-col gap-1">
              {[...NAV, { to: "/download", label: "Download" }].map((n, i) => (
                <li key={n.to} className="overflow-hidden">
                  <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} exit={{ y: "110%" }} transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.05 }}>
                    <Link to={n.to} className="flex items-baseline gap-4 py-1">
                      <span className="label text-ink-3">0{i + 1}</span>
                      <span className="display text-[3rem] sm:text-[4rem]">{n.label}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-auto flex items-center justify-between border-t border-line pt-6">
              <ThemeToggle />
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="label text-ink-2">GitHub ↗</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
