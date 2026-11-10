export const REPO = "sushilydv-dev/Airglide";
export const GITHUB_URL = `https://github.com/${REPO}`;
export const RELEASES_URL = `${GITHUB_URL}/releases`;
export const ISSUES_URL = `${GITHUB_URL}/issues`;

// Stable names (scripts/build.py copies each installer to these), so
// /releases/latest/download/<name> always serves the newest build.
export const DOWNLOADS = {
  mac: {
    id: "mac",
    label: "macOS",
    file: "Airglide-macos.dmg",
    url: `${GITHUB_URL}/releases/latest/download/Airglide-macos.dmg`,
    requirement: "macOS 11 Big Sur or later · Apple silicon",
    kind: "Disk image (.dmg)",
  },
  windows: {
    id: "windows",
    label: "Windows",
    file: "Airglide-windows-setup.exe",
    url: `${GITHUB_URL}/releases/latest/download/Airglide-windows-setup.exe`,
    requirement: "Windows 10 or 11 · 64-bit",
    kind: "Installer (.exe), no admin rights needed",
    portable: {
      file: "Airglide-windows.zip",
      url: `${GITHUB_URL}/releases/latest/download/Airglide-windows.zip`,
    },
  },
};

export const NAV = [
  { to: "/#features", label: "Features" },
  { to: "/#gestures", label: "Gestures" },
  { to: "/#how", label: "How it works" },
  { to: "/docs", label: "Docs" },
  { to: "/changelog", label: "Changelog" },
];
