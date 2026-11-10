// Convert the "website assets" folder into web-sized images in public/images.
//   npm run images -- "/path/to/website assets"
// (defaults to ~/Downloads/website assets)
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const SRC = process.argv[2] || path.join(os.homedir(), "Downloads", "website assets");
const OUT = path.resolve("public/images");
fs.mkdirSync(OUT, { recursive: true });

// [source file, output name, max width]
const jobs = [
  ["hero/hero-dashboard-and-panel.png", "hero-light", 2400],
  ["hero/hero-dark-mode.png", "hero-dark", 2400],
  ["hero/hero-gestures-live.png", "hero-gestures", 2400],
  ["screenshots/01-dashboard.png", "dashboard", 1800],
  ["screenshots/02-gestures-live-camera.png", "gestures", 1800],
  ["screenshots/03-virtual-mouse.png", "mouse", 1800],
  ["screenshots/04-assistant.png", "assistant", 1800],
  ["screenshots/05-presentations.png", "library", 1800],
  ["screenshots/06-settings.png", "settings", 1800],
  ["screenshots/07-dashboard-dark.png", "dashboard-dark", 1800],
  ["screenshots/08-gestures-dark.png", "gestures-dark", 1800],
  ["screenshots/09-presenting-in-keynote.png", "presenting", 2200],
  ["screenshots/11-presenting-quick-panel.png", "presenting-panel", 2200],
  ["screenshots/13-presenting-gesture-list.png", "presenting-gestures", 2200],
  ["screenshots/12-quick-panel-controls.png", "panel-controls", 820],
  ["screenshots/14-quick-panel-gestures.png", "panel-gestures", 820],
  ["screenshots/15-quick-panel-open-palm.png", "panel-palm", 820],
  ["screenshots/10-corner-button.png", "corner-button", 104],
];
for (const pose of ["shaka", "fist", "palm", "point", "peace", "l", "four", "pinky", "three", "rock", "mouse-move", "mouse-click"]) {
  jobs.push([`camera-illustrations/hand-${pose}-tracked.png`, `hand-${pose}`, 960]);
}

for (const [src, name, width] of jobs) {
  const file = path.join(SRC, src);
  if (!fs.existsSync(file)) { console.warn("missing", src); continue; }
  const img = sharp(file).resize({ width, withoutEnlargement: true });
  await img.clone().webp({ quality: 84, alphaQuality: 90, effort: 5 }).toFile(path.join(OUT, `${name}.webp`));
  console.log("images/" + name + ".webp");
}

// Icons and the social preview.
const pub = path.resolve("public");
await sharp(path.join(SRC, "brand/app-icon-1024.png")).resize(512).png().toFile(path.join(pub, "icon-512.png"));
await sharp(path.join(SRC, "brand/app-icon-1024.png")).resize(180).png().toFile(path.join(pub, "apple-touch-icon.png"));
fs.copyFileSync(path.join(SRC, "brand/logo-mark.svg"), path.join(pub, "favicon.svg"));
await sharp(path.join(SRC, "hero/hero-dashboard-and-panel.png")).resize(1200, 630, { fit: "cover", position: "left" })
  .jpeg({ quality: 86 }).toFile(path.join(pub, "og-image.jpg"));
fs.copyFileSync(path.join(SRC, "brand/Airglide-demo.pptx"), path.join(pub, "Airglide-demo.pptx"));
console.log("icons, og-image, demo deck");
