import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Mark } from "../components/Logo";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[70vh] place-items-center pt-32 text-center">
      <div>
        <motion.div
          className="mx-auto w-28 text-primary"
          animate={{ x: [0, 18, 0], y: [0, -10, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Mark className="h-28 w-28" />
        </motion.div>
        <p className="mt-6 text-[0.85rem] font-bold uppercase tracking-[0.14em] text-ink-3">404</p>
        <h1 className="display mt-4 text-[clamp(2.6rem,7vw,5rem)]">This page <span className="serif-i text-primary">glided away</span></h1>
        <p className="mx-auto mt-3 max-w-md text-ink-2">The link may be old, or the page has moved.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="btn btn-primary">Back home</Link>
          <Link to="/docs" className="btn">Read the docs</Link>
        </div>
      </div>
    </div>
  );
}
