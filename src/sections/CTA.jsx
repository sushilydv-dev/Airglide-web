import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Magnetic from "../components/Magnetic";
import { detectPlatform } from "../lib/platform";
import { DOWNLOADS } from "../lib/site";

export default function CTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["-5%", "0%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["5%", "0%"]);
  const os = detectPlatform();
  const d = os === "windows" ? DOWNLOADS.windows : DOWNLOADS.mac;
  const desktop = os === "mac" || os === "windows";

  return (
    <section ref={ref} className="container-page overflow-hidden pt-32 sm:pt-44">
      <p className="label text-ink-3">(09) Ready?</p>
      <div className="relative mt-8">
        <motion.p style={{ x: x1 }} className="display text-[clamp(4rem,22vw,19rem)]">Let's</motion.p>
        <motion.p style={{ x: x2 }} className="serif-i -mt-[0.12em] pr-[0.1em] text-right text-[clamp(3.6rem,20vw,19rem)] leading-[0.85] text-primary">
          present.
        </motion.p>
        <Magnetic strength={0.4} className="absolute left-[38%] top-[34%] hidden sm:block">
          <a
            href={desktop ? d.url : "/download"}
            data-cursor="Get it"
            className="group grid h-40 w-40 place-items-center rounded-full bg-primary text-white shadow-[0_30px_60px_-20px_rgba(37,99,235,0.7)] transition-transform duration-500 hover:scale-105 lg:h-48 lg:w-48"
          >
            <span className="text-center">
              <ArrowDown className="mx-auto h-6 w-6 transition-transform duration-500 group-hover:translate-y-1" />
              <span className="label mt-2 block">Download</span>
            </span>
          </a>
        </Magnetic>
      </div>
      <div className="mt-10 flex flex-col justify-between gap-6 border-t border-line-strong pt-6 sm:flex-row sm:items-center">
        <p className="max-w-md text-ink-2">Download Airglide, allow the camera, add a deck and start presenting. Setup takes about a minute.</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/download" className="btn btn-primary sm:hidden">Download Airglide</Link>
          <a href="/Airglide-demo.pptx" download className="btn">Demo deck (.pptx)</a>
          <Link to="/download" className="label link-underline text-ink-2 hover:text-ink">All downloads →</Link>
        </div>
      </div>
    </section>
  );
}
