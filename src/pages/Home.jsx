import Hero from "../sections/Hero";
import Statement from "../sections/Statement";
import Features from "../sections/Features";
import HowItWorks from "../sections/HowItWorks";
import GestureShowcase from "../sections/GestureShowcase";
import PresentingShowcase from "../sections/PresentingShowcase";
import Facts from "../sections/Facts";
import Privacy from "../sections/Privacy";
import FAQ from "../sections/FAQ";
import CTA from "../sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Features />
      <HowItWorks />
      <GestureShowcase />
      <PresentingShowcase />
      <Facts />
      <Privacy />
      <FAQ />
      <CTA />
    </>
  );
}
