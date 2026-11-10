import { AnimatePresence, motion } from "motion/react";
import { Suspense, useEffect } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import Backdrop from "./Backdrop";
import Cursor from "./Cursor";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Preloader from "./Preloader";
import SmoothScroll from "./SmoothScroll";
import { lenisRef, scrollToTarget } from "../lib/scroll";

// Scroll to the #section in the URL, or to the top on a new page.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      const t = setInterval(() => {
        const el = document.getElementById(id);
        if (el || ++tries > 30) {
          clearInterval(t);
          if (el) scrollToTarget(el);
        }
      }, 60);
      return () => clearInterval(t);
    }
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

const ease = [0.76, 0, 0.24, 1];
const curtain = {
  initial: { scaleY: 1, transformOrigin: "50% 0%" },
  enter: { scaleY: 0, transformOrigin: "50% 0%", transition: { duration: 0.75, ease, delay: 0.05 } },
  exit: { scaleY: 1, transformOrigin: "50% 100%", transition: { duration: 0.6, ease } },
};

export default function Layout() {
  const location = useLocation();
  const outlet = useOutlet(); // captured per render, so the exiting page keeps its own content
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2">
        Skip to content
      </a>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Backdrop />
      <ScrollManager />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main id="main" key={location.pathname} initial="initial" animate="enter" exit="exit">
          <Suspense fallback={<div className="min-h-screen" />}>{outlet}</Suspense>
          <motion.div aria-hidden="true" variants={curtain} className="noise pointer-events-none fixed inset-0 z-[70] bg-navy" />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
