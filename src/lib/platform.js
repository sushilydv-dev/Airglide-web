// Which installer to offer first. Falls back to macOS when unsure.
export function detectPlatform() {
  if (typeof navigator === "undefined") return "mac";
  const ua = navigator.userAgent || "";
  const platform = navigator.userAgentData?.platform || navigator.platform || "";
  if (/win/i.test(platform) || /Windows/i.test(ua)) return "windows";
  if (/mac/i.test(platform) || /Mac OS X/i.test(ua)) return "mac";
  if (/Android|iPhone|iPad|iPod/i.test(ua)) return "mobile";
  if (/Linux/i.test(ua)) return "linux";
  return "mac";
}
