import * as Accordion from "@radix-ui/react-accordion";
import { Link } from "react-router-dom";
import { Lines } from "../components/TextReveal";
import { FAQ as ITEMS } from "../data/faq";

export default function FAQ() {
  return (
    <section id="faq" className="container-page pt-32 sm:pt-44">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="label text-ink-3">(08) FAQ</p>
          <Lines className="section-title mt-5" lines={["Good", <span key="q" className="serif-i text-primary">questions</span>]} />
          <p className="section-lead">
            More in the <Link to="/docs" className="link-underline text-ink">docs</Link>: setup, permissions and troubleshooting.
          </p>
        </div>
        <Accordion.Root type="single" collapsible defaultValue="item-0" className="border-b border-line-strong">
          {ITEMS.map((f, i) => (
            <Accordion.Item key={f.q} value={`item-${i}`} className="group border-t border-line-strong">
              <Accordion.Header>
                <Accordion.Trigger className="grid w-full grid-cols-[44px_1fr_auto] items-baseline gap-4 py-6 text-left">
                  <span className="label text-ink-3 group-data-[state=open]:text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[1.15rem] font-medium transition-colors group-hover:text-primary sm:text-[1.3rem]">{f.q}</span>
                  <span className="relative mt-1 h-4 w-4 shrink-0">
                    <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                    <span className="absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-500 group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0" />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="accordion-content">
                <p className="pb-7 pl-[60px] pr-10 text-ink-2">{f.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
