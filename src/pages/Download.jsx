import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Check, ChevronDown, Download as DownloadIcon, ExternalLink, FileDown, Laptop, Monitor } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Reveal, { item, Stagger } from "../components/Reveal";
import Spotlight from "../components/Spotlight";
import { detectPlatform } from "../lib/platform";
import { formatBytes, formatDate, useLatestRelease } from "../lib/release";
import { DOWNLOADS, GITHUB_URL, RELEASES_URL } from "../lib/site";

const STEPS = {
  mac: [
    ["Open the disk image", "Double-click Airglide-macos.dmg in your Downloads folder."],
    ["Drag Airglide to Applications", "Then eject the disk image."],
    ["Open Airglide", "The first time, macOS may say it can't verify the developer. See below for the one-time fix."],
    ["Allow the camera and Accessibility", "Airglide asks for both. Accessibility lets it press keys and move the mouse; reopen Airglide after allowing it."],
  ],
  windows: [
    ["Run the installer", "Double-click Airglide-windows-setup.exe. No administrator rights needed."],
    ["Get past SmartScreen if it appears", "Click “More info”, then “Run anyway”. See below for why."],
    ["Open Airglide from the Start menu", "Allow the camera when Windows asks."],
    ["Follow the one-minute setup", "Check the camera, optionally add the AI assistant, and calibrate your hand."],
  ],
};

function PlatformCard({ d, recommended, release }) {
  const Icon = d.id === "windows" ? Monitor : Laptop;
  const size = formatBytes(release.size(d.file));
  return (
    <motion.div variants={item}>
      <Spotlight className={clsx("card relative flex h-full flex-col p-7 sm:p-8", recommended && "ring-2 ring-primary")}>
        {recommended && <span className="chip chip-blue absolute right-6 top-6">Your system</span>}
        <span className="grid h-14 w-14 place-items-center rounded-[18px] bg-primary-soft text-primary">
          <Icon className="h-7 w-7" />
        </span>
        <h2 className="display mt-6 text-[1.9rem]">Airglide for {d.label}</h2>
        <p className="mt-1 text-ink-2">{d.requirement}</p>
        <ul className="mt-5 space-y-2 text-[0.95rem] text-ink-2">
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {d.kind}</li>
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Hand-tracking model included, works offline</li>
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Updates are announced inside the app</li>
        </ul>
        <div className="mt-auto pt-8">
          <a href={d.url} className={clsx("btn w-full", recommended ? "btn-primary btn-lg" : "btn-lg")}>
            <DownloadIcon className="h-[18px] w-[18px]" /> Download for {d.label}
          </a>
          <p className="mt-3 text-center text-[0.84rem] text-ink-3">
            {[release.version && `Version ${release.version}`, size].filter(Boolean).join(" · ") || d.file}
            {d.portable && (
              <>
                {" · "}
                <a href={d.portable.url} className="font-semibold text-ink-2 hover:text-primary">Portable .zip</a>
              </>
            )}
          </p>
        </div>
      </Spotlight>
    </motion.div>
  );
}

function Collapsible({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center gap-3 px-6 py-5 text-left font-bold hover:bg-surface-2">
        <span className="flex-1">{title}</span>
        <ChevronDown className={clsx("h-5 w-5 text-ink-3 transition-transform duration-300", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <div className="prose-ag px-6 pb-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Download() {
  const os = detectPlatform();
  const release = useLatestRelease();
  const [tab, setTab] = useState(os === "windows" ? "windows" : "mac");
  const order = os === "windows" ? [DOWNLOADS.windows, DOWNLOADS.mac] : [DOWNLOADS.mac, DOWNLOADS.windows];

  return (
    <div id="download-page" className="container-page pt-32 sm:pt-40">
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="eyebrow">Download</span>
        <h1 className="display mt-6 text-[clamp(3rem,9vw,6.5rem)]">Get Airglide</h1>
        <p className="section-lead mx-auto">One download, about a minute of setup, and your webcam becomes a remote.</p>
        <div className="mt-6 flex justify-center">
          {release.loading ? (
            <span className="chip"><span className="h-2 w-2 animate-pulse rounded-full bg-ink-3" /> Checking the latest version…</span>
          ) : release.version ? (
            <a href={release.url} target="_blank" rel="noreferrer" className="chip chip-green hover:opacity-90">
              <span className="h-2 w-2 animate-pulse-ring rounded-full bg-brand-green" /> Version {release.version}
              {release.date ? ` · released ${formatDate(release.date)}` : ""}
            </a>
          ) : (
            <a href={RELEASES_URL} target="_blank" rel="noreferrer" className="chip hover:text-ink">
              {release.none ? "The first public release is on its way" : "See all releases on GitHub"} <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </Reveal>

      <Stagger className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
        {order.map((d) => (
          <PlatformCard key={d.id} d={d} recommended={d.id === os} release={release} />
        ))}
      </Stagger>

      {/* install steps */}
      <Reveal className="mx-auto mt-24 max-w-5xl">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Install</span>
            <h2 className="display mt-5 text-[2.4rem] sm:text-[3.4rem]">Up and running in four steps</h2>
          </div>
          <div role="tablist" aria-label="Operating system" className="flex rounded-full border border-line bg-surface p-1">
            {[["mac", "macOS"], ["windows", "Windows"]].map(([id, label]) => (
              <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={clsx("relative rounded-full px-5 py-2 text-[0.92rem] font-semibold transition-colors", tab === id ? "text-white" : "text-ink-2 hover:text-ink")}>
                {tab === id && <motion.span layoutId="os-tab" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 450, damping: 35 }} />}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.ol key={tab} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="mt-8 grid gap-4 md:grid-cols-4">
            {STEPS[tab].map(([t, b], i) => (
              <li key={t} className="card p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-[0.95rem] font-extrabold text-white">{i + 1}</span>
                <h3 className="mt-4 font-bold">{t}</h3>
                <p className="mt-1.5 text-[0.93rem] text-ink-2">{b}</p>
              </li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </Reveal>

      {/* first-launch help */}
      <div className="mx-auto mt-16 grid max-w-5xl gap-4">
        <Reveal>
          <div className="flex items-start gap-4 rounded-[18px] border border-line bg-warn-soft p-5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brand-amber" />
            <p className="text-ink-2">
              <strong className="text-ink">Seeing a security warning the first time?</strong> Airglide isn't yet signed by Apple or Microsoft, so
              your computer asks you to confirm once. It's safe to continue, and you won't be asked again.
            </p>
          </div>
        </Reveal>
        <Reveal><Collapsible title="macOS: “Airglide can't be opened because Apple cannot check it”" defaultOpen={os !== "windows"}>
          <ol>
            <li>Click <strong>Done</strong> on the warning.</li>
            <li>Open <strong>System Settings → Privacy &amp; Security</strong> and scroll down.</li>
            <li>Next to “Airglide was blocked”, click <strong>Open Anyway</strong>, then confirm.</li>
          </ol>
          <p>Alternatively, right-click Airglide in Applications and choose <strong>Open</strong>.</p>
        </Collapsible></Reveal>
        <Reveal><Collapsible title="Windows: “Windows protected your PC”" defaultOpen={os === "windows"}>
          <p>Microsoft SmartScreen shows this for new apps it hasn't seen many times yet. Click <strong>More info</strong>, then <strong>Run anyway</strong>.</p>
        </Collapsible></Reveal>
        <Reveal><Collapsible title="Run Airglide from source (Python 3.10+)">
          <p>Developers can run Airglide straight from the repository:</p>
          <p><code>git clone {GITHUB_URL}.git</code></p>
          <p>Then on macOS run <code>bash scripts/setup_mac.sh</code> once and <code>bash scripts/run_mac.sh</code>; on Windows run <code>scripts\setup_windows.ps1</code> once and <code>scripts\run_windows.bat</code>. Full details are in the <a href={GITHUB_URL} target="_blank" rel="noreferrer">README</a>.</p>
        </Collapsible></Reveal>
      </div>

      <Reveal className="mx-auto mt-16 flex max-w-5xl flex-col items-center justify-between gap-5 rounded-[22px] border border-line bg-surface p-7 sm:flex-row">
        <div>
          <h3 className="text-[1.15rem] font-bold">Want something to practise on?</h3>
          <p className="mt-1 text-ink-2">Our 10-slide demo deck explains Airglide, and is perfect for trying every gesture.</p>
        </div>
        <a href="/Airglide-demo.pptx" download className="btn btn-soft shrink-0">
          <FileDown className="h-[18px] w-[18px]" /> Demo deck (.pptx)
        </a>
      </Reveal>

      <p className="mt-10 text-center text-[0.9rem] text-ink-3">
        Looking for an older version? <a href={RELEASES_URL} target="_blank" rel="noreferrer" className="font-semibold text-ink-2 hover:text-primary">All releases on GitHub</a> ·{" "}
        <Link to="/changelog" className="font-semibold text-ink-2 hover:text-primary">What's new</Link>
      </p>
    </div>
  );
}
