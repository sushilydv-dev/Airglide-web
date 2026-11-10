import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Pre-bundle everything up front so the dev server never re-optimises mid-session
  // (which reloads the page and can briefly load two copies of React).
  optimizeDeps: {
    include: [
      "react", "react-dom", "react-dom/client", "react-router-dom", "motion/react", "lucide-react", "clsx",
      "@radix-ui/react-accordion", "@radix-ui/react-dialog", "react-markdown",
    ],
  },
});
