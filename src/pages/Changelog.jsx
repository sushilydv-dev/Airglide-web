import { motion } from "motion/react";
import { ExternalLink, Rocket } from "lucide-react";
import Markdown from "react-markdown";
import Reveal from "../components/Reveal";
import { formatDate, useReleases } from "../lib/release";
import { RELEASES_URL } from "../lib/site";

function Skeleton() {
  return (
    <div className="space-y-6">
      {[0, 1].map((i) => (
        <div key={i} className="card animate-pulse p-7">
          <div className="h-5 w-40 rounded bg-surface-3" />
          <div className="mt-5 h-3 w-full rounded bg-surface-3" />
          <div className="mt-3 h-3 w-4/5 rounded bg-surface-3" />
          <div className="mt-3 h-3 w-2/3 rounded bg-surface-3" />
        </div>
      ))}
    </div>
  );
}

export default function Changelog() {
  const { loading, data, error } = useReleases();
  const releases = (data || []).filter((r) => !r.draft);

  return (
    <div id="changelog-page" className="container-page pt-32 sm:pt-40">
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="eyebrow">Changelog</span>
        <h1 className="display mt-6 text-[clamp(3rem,9vw,6.5rem)]">What's new in Airglide</h1>
        <p className="section-lead mx-auto">Every release, straight from GitHub.</p>
      </Reveal>

      <div className="mx-auto mt-14 max-w-3xl">
        {loading ? (
          <Skeleton />
        ) : error || !releases.length ? (
          <Reveal className="card p-10 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-[18px] bg-primary-soft text-primary">
              <Rocket className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-[1.4rem] font-bold">{error ? "Couldn't reach GitHub" : "The first release is on its way"}</h2>
            <p className="mx-auto mt-2 max-w-md text-ink-2">
              {error ? "Release notes load from GitHub. Try again in a moment, or read them there." : "Release notes will appear here as soon as Airglide's first version is published."}
            </p>
            <a href={RELEASES_URL} target="_blank" rel="noreferrer" className="btn mt-6">
              Releases on GitHub <ExternalLink className="h-4 w-4" />
            </a>
          </Reveal>
        ) : (
          <ol className="relative space-y-8 border-l border-line pl-8">
            {releases.map((r, i) => (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.05 }}
                className="relative"
              >
                <span className={`absolute -left-[41px] top-7 h-4 w-4 rounded-full border-4 border-bg ${i === 0 ? "bg-primary" : "bg-line-strong"}`} />
                <article className="card p-7">
                  <header className="flex flex-wrap items-center gap-3">
                    <h2 className="text-[1.35rem] font-extrabold">{r.name || r.tag_name}</h2>
                    {i === 0 && <span className="chip chip-green">Latest</span>}
                    {r.prerelease && <span className="chip">Pre-release</span>}
                    <time className="ml-auto text-[0.88rem] text-ink-3" dateTime={r.published_at}>{formatDate(r.published_at)}</time>
                  </header>
                  <div className="prose-ag mt-3">
                    {r.body ? <Markdown>{r.body}</Markdown> : <p>No notes for this release.</p>}
                  </div>
                  <a href={r.html_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-primary hover:underline">
                    Downloads for {r.tag_name} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </article>
              </motion.li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
