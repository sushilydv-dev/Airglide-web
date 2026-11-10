import { lazy } from "react";
import { MotionConfig } from "motion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { ThemeProvider } from "./lib/theme";
import Home from "./pages/Home";
// Inner pages load on demand, so the home page ships less JavaScript.
const Download = lazy(() => import("./pages/Download"));
const Docs = lazy(() => import("./pages/Docs"));
const Changelog = lazy(() => import("./pages/Changelog"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="download" element={<Download />} />
              <Route path="docs" element={<Docs />} />
              <Route path="changelog" element={<Changelog />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </ThemeProvider>
  );
}
