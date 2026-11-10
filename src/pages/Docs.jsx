import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Reveal from "../components/Reveal";
import Screenshot from "../components/Screenshot";
import { GESTURES, MOUSE_GESTURES } from "../data/gestures";
import { ISSUES_URL } from "../lib/site";
import { useTheme } from "../lib/theme";

const SECTIONS = [
  ["getting-started", "Getting started"],
  ["permissions", "Permissions"],
  ["gestures", "Gestures"],
  ["virtual-mouse", "Virtual mouse"],
  ["pointer", "Laser, pen and zoom"],
  ["quick-panel", "Corner quick panel"],
  ["shortcuts", "Keyboard shortcuts"],
  ["assistant", "AI assistant"],
  ["apps", "Presentation apps"],
  ["troubleshooting", "Troubleshooting"],
];

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

const Kbd = ({ children }) => <kbd>{children}</kbd>;

function Section({ id, title, children }) {
  return (
    <section id={id} className="border-b border-line pb-12 pt-2 last:border-0">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function Docs() {
  const ids = SECTIONS.map((s) => s[0]);
  const active = useScrollSpy(ids);
  const { theme } = useTheme();

  return (
    <div id="docs-page" className="container-page pt-32 sm:pt-40">
      <Reveal className="max-w-3xl">
        <span className="eyebrow">Documentation</span>
        <h1 className="display mt-6 text-[clamp(3rem,9vw,6.5rem)]">Using Airglide</h1>
        <p className="section-lead">Everything from the first launch to fine-tuning gestures and fixing the camera.</p>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[230px_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-28 space-y-0.5 border-l border-line">
            {SECTIONS.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                    history.replaceState(null, "", `#${id}`);
                  }}
                  className={clsx(
                    "-ml-px block border-l-2 py-1.5 pl-4 text-[0.92rem] transition-colors",
                    active === id ? "border-primary font-semibold text-primary" : "border-transparent text-ink-2 hover:text-ink",
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="prose-ag min-w-0 max-w-3xl [&_h2]:mt-8">
          <Section id="getting-started" title="Getting started">
            <ol>
              <li><Link to="/download">Download Airglide</Link> and install it (drag to Applications on a Mac, run the installer on Windows).</li>
              <li>Open it. A short setup checks your camera and permissions, offers the AI assistant, and calibrates your hand.</li>
              <li>Click <strong>Add presentation</strong> and choose a PowerPoint (.pptx), PDF or Word file, or paste a Google Slides link.</li>
              <li>Click <strong>Start presenting</strong>. Airglide opens your deck, starts the slideshow and begins watching for gestures.</li>
            </ol>
            <p>The dashboard shows a <strong>talk timeline</strong> with how long each slide should take, and a <strong>pre-flight check</strong> that confirms everything is ready.</p>
            <Screenshot src={theme === "dark" ? "/images/dashboard-dark.webp" : "/images/dashboard.webp"} alt="The Airglide dashboard" className="my-6 overflow-hidden rounded-[18px] border border-line shadow-[var(--shadow)]" />
          </Section>

          <Section id="permissions" title="Permissions">
            <h3>macOS</h3>
            <ul>
              <li><strong>Camera</strong>: to see your hand. Allow it when asked, or under System Settings → Privacy &amp; Security → Camera.</li>
              <li><strong>Accessibility</strong>: to press keys in your presentation app and move the mouse. Without it, gestures are recognised but nothing happens. Airglide asks for it when you first start presenting; switch Airglide on under System Settings → Privacy &amp; Security → Accessibility, then quit and reopen Airglide.</li>
            </ul>
            <p>If Accessibility shows Airglide as allowed but gestures still do nothing (this can happen after updating), remove Airglide from the list with the <strong>–</strong> button and allow it again.</p>
            <h3>Windows</h3>
            <p>Allow camera access when Windows asks, or under Settings → Privacy &amp; security → Camera. No other permissions are needed.</p>
          </Section>

          <Section id="gestures" title="Gestures">
            <p>Hold a gesture steady for a moment and it fires; a ring in the camera view fills as it's about to. These are the defaults; change any of them on the <strong>Gestures</strong> page.</p>
            <div className="not-prose my-6 overflow-hidden rounded-[18px] border border-line">
              <table className="w-full text-left text-[0.95rem]">
                <thead className="bg-surface-2 text-[0.8rem] uppercase tracking-wide text-ink-3">
                  <tr><th className="px-5 py-3 font-bold">Gesture</th><th className="px-5 py-3 font-bold">Action</th></tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {GESTURES.map((g) => (
                    <tr key={g.id} className="bg-surface">
                      <td className="px-5 py-3"><span className="font-semibold text-ink">{g.name}</span> <span className="text-ink-3">· {g.hint}</span></td>
                      <td className="px-5 py-3 font-semibold text-primary">{g.action}</td>
                    </tr>
                  ))}
                  <tr className="bg-surface"><td className="px-5 py-3"><span className="font-semibold text-ink">Both index fingers</span> <span className="text-ink-3">· move apart or together</span></td><td className="px-5 py-3 font-semibold text-primary">Zoom in / out</td></tr>
                </tbody>
              </table>
            </div>
            <p><strong>Calibrate</strong> (Gestures → Calibrate, about 10 seconds) if gestures are missed or confused. You can also tune hold time, cooldown and detection confidence.</p>
          </Section>

          <Section id="virtual-mouse" title="Virtual mouse">
            <p>Switch to the virtual mouse to click links, play videos or demo software mid-talk.</p>
            <ul>{MOUSE_GESTURES.map((m) => <li key={m.name}><strong>{m.name}</strong>: {m.action}</li>)}</ul>
            <p>Smoothing and the active area of the camera can be adjusted on the Virtual mouse page.</p>
          </Section>

          <Section id="pointer" title="Laser, pen and zoom">
            <p>Show an <strong>open palm</strong> to cycle the pointer: laser, pen, then off. Your index finger moves the pointer; in pen mode, <strong>pinch thumb and index</strong> to draw. While a pointer is active only the pointer, pause and exit gestures work.</p>
            <p>Point with <strong>both index fingers</strong> and move your hands apart to zoom in, or together to zoom out (in apps that support zoom).</p>
          </Section>

          <Section id="quick-panel" title="Corner quick panel">
            <p>While you present, an Airglide button sits in the top-right corner of the screen, even over a full-screen slideshow. Click it for the live camera, presenting controls and your gesture list. Drag it anywhere. Turn it off on the Gestures page, under Presentation app → Corner button.</p>
            <Screenshot src="/images/presenting-panel.webp" alt="The quick panel open over a full-screen slideshow" className="my-6 overflow-hidden rounded-[18px] border border-line shadow-[var(--shadow)]" />
          </Section>

          <Section id="shortcuts" title="Keyboard shortcuts">
            <p>These work even when Airglide is in the background.</p>
            <div className="not-prose my-6 grid gap-2 sm:grid-cols-2">
              {[["P", "Presenter on / off"], ["H", "Pause / resume gestures"], ["M", "Virtual mouse on / off"], ["A", "Show Airglide"]].map(([k, a]) => (
                <div key={k} className="flex items-center justify-between rounded-[14px] border border-line bg-surface px-4 py-3">
                  <span className="text-ink-2">{a}</span>
                  <span className="flex gap-1.5 text-[0.85rem]"><Kbd>⌃⌥{k}</Kbd><span className="text-ink-3">or</span><Kbd>Ctrl+Alt+{k}</Kbd></span>
                </div>
              ))}
            </div>
          </Section>

          <Section id="assistant" title="AI assistant">
            <p>Open the Assistant page and click <strong>Add chatbot</strong>. A small language model (about 400 MB, downloaded once) then runs on your computer: no account, no key, and it works offline.</p>
            <p>Ask about your deck, get <strong>talking points</strong> for the current slide, or have it predict <strong>audience questions</strong>. Prefer Google Gemini? Switch the engine in Settings → Assistant and paste a free API key; questions and slide text are then sent to Google.</p>
          </Section>

          <Section id="apps" title="Presentation apps">
            <ul>
              <li><strong>PowerPoint</strong> and <strong>Keynote</strong>: Airglide opens your .pptx in your presentation app and starts the slideshow for you.</li>
              <li><strong>Google Slides</strong>: paste the link; it opens in present mode in your browser. Share it as “Anyone with the link” so the timeline and assistant can read the slides.</li>
              <li><strong>LibreOffice Impress</strong> and <strong>PDF viewers</strong>: supported with their own shortcuts.</li>
              <li><strong>Word documents</strong>: gestures page up and down.</li>
            </ul>
            <p>Airglide picks the right shortcuts automatically; override it on the Gestures page, under Presentation app.</p>
          </Section>

          <Section id="troubleshooting" title="Troubleshooting">
            <h3>Gestures are recognised but nothing happens (macOS)</h3>
            <p>Accessibility permission is missing or stale. See <a href="#permissions">Permissions</a>, then quit and reopen Airglide.</p>
            <h3>The camera doesn't start</h3>
            <p>Close other apps using the camera (video calls), check camera permission, and choose the right camera in Settings → Camera.</p>
            <h3>Gestures fire by accident, or not at all</h3>
            <p>Run calibration, sit about an arm's length from the camera with your hand well lit, and raise the hold time on the Gestures page.</p>
            <h3>Still stuck?</h3>
            <p>Copy the diagnostics from Settings → About and <a href={ISSUES_URL} target="_blank" rel="noreferrer">open an issue on GitHub</a>.</p>
          </Section>
        </article>
      </div>
    </div>
  );
}
