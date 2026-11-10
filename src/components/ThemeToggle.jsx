import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import clsx from "clsx";
import { useTheme } from "../lib/theme";

const OPTIONS = [
  { id: "light", icon: Sun, label: "Light theme" },
  { id: "system", icon: Monitor, label: "Match system" },
  { id: "dark", icon: Moon, label: "Dark theme" },
];

export default function ThemeToggle({ className }) {
  const { choice, setChoice } = useTheme();
  return (
    <div role="radiogroup" aria-label="Theme" className={clsx("flex items-center gap-0.5 rounded-full border border-line bg-surface p-1", className)}>
      {OPTIONS.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          role="radio"
          aria-checked={choice === id}
          aria-label={label}
          title={label}
          onClick={() => setChoice(id)}
          className={clsx("relative grid h-7 w-7 place-items-center rounded-full transition-colors", choice === id ? "text-primary" : "text-ink-3 hover:text-ink")}
        >
          {choice === id && <motion.span layoutId="theme-pill" className="absolute inset-0 rounded-full bg-primary-soft" transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
          <Icon className="relative h-[15px] w-[15px]" />
        </button>
      ))}
    </div>
  );
}
