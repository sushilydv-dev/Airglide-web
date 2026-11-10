import { ScrollWords } from "../components/TextReveal";
import VelocityMarquee from "../components/VelocityMarquee";
import { Mark } from "../components/Logo";

const WORDS = ["Next slide", "Laser", "Pen", "Zoom", "Click", "Scroll", "Black screen", "Pause"];

export default function Statement() {
  return (
    <>
      <section id="statement" className="container-page pt-32 sm:pt-44">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <p className="label pt-3 text-ink-3">(01) What it is</p>
          <ScrollWords
            className="text-[1.9rem] font-medium leading-[1.18] tracking-[-0.02em] sm:text-[2.8rem] lg:text-[3.6rem]"
            text="Airglide is a small desktop app that watches your hand through the webcam and turns simple gestures into the keys your slides understand. No clicker, no gloves, no account. Just you, your deck and your audience."
          />
        </div>
      </section>

      <div className="mt-28 border-y border-line-strong py-6 sm:mt-36">
        <VelocityMarquee>
          {WORDS.map((w, i) => (
            <span key={w} className="flex items-center">
              <span className={i % 2 ? "serif-i px-8 text-[15vw] leading-none text-primary sm:text-[10vw]" : "display px-8 text-[15vw] leading-none sm:text-[10vw]"}>{w}</span>
              <Mark className="h-[5vw] w-[5vw] shrink-0 text-primary sm:h-[3.4vw] sm:w-[3.4vw]" />
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </>
  );
}
