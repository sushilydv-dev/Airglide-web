import { ShieldCheck } from "lucide-react";
import Reveal from "../components/Reveal";
import { ISSUES_URL } from "../lib/site";

export default function Privacy() {
  return (
    <div id="privacy-page" className="container-page pt-32 sm:pt-40">
      <Reveal className="mx-auto max-w-3xl">
        <span className="grid h-14 w-14 place-items-center rounded-[18px] bg-success-soft text-brand-green">
          <ShieldCheck className="h-7 w-7" />
        </span>
        <h1 className="display mt-6 text-[clamp(3rem,9vw,6.5rem)]">Privacy</h1>
        <p className="section-lead">The short version: Airglide does its work on your computer, and neither the app nor this website tracks you.</p>
      </Reveal>

      <Reveal delay={0.1} className="prose-ag mx-auto mt-10 max-w-3xl">
        <h2>The Airglide app</h2>
        <h3>Camera</h3>
        <p>Video from your camera is processed in memory on your computer to find your hand, then discarded. It is never recorded, saved or uploaded.</p>
        <h3>Your presentations</h3>
        <p>Airglide reads the text of the presentations you add so it can plan your talk timeline and answer questions about them. That text stays in Airglide's folder on your computer.</p>
        <h3>AI assistant</h3>
        <p>
          By default the assistant is a language model running on your computer, and your slides and questions never leave it. If you choose
          to switch the engine to Google Gemini and enter an API key, your questions and the relevant slide text are sent to Google to
          generate answers, under Google's terms.
        </p>
        <h3>When the app uses the internet</h3>
        <ul>
          <li><strong>Update check</strong>: on start-up, Airglide asks GitHub whether a newer version exists. You can turn this off in Settings.</li>
          <li><strong>Adding the chatbot</strong>: a one-time download of the model from Hugging Face.</li>
          <li><strong>Google Slides links</strong>: if you add one, Airglide downloads that deck from Google to read its slides.</li>
          <li><strong>Gemini</strong>: only if you turn it on, as described above.</li>
        </ul>
        <p>
          <strong>Offline mode</strong> in Settings stops the update check, the chatbot download and Gemini. A Google Slides link is only
          fetched when you add one yourself. Airglide has no accounts, analytics or advertising.
        </p>

        <h2>This website</h2>
        <ul>
          <li>No cookies, analytics or trackers.</li>
          <li>Your theme choice is remembered in your browser's local storage, and nowhere else.</li>
          <li>To show the latest version and release notes, your browser asks GitHub's public API directly.</li>
          <li>Downloads are served by GitHub Releases. The site is hosted on Vercel, which, like any web host, processes standard request logs.</li>
        </ul>

        <h2>Questions</h2>
        <p>
          Something unclear? <a href={ISSUES_URL} target="_blank" rel="noreferrer">Open an issue on GitHub</a>.
        </p>
      </Reveal>
    </div>
  );
}
