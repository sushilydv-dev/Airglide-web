import { Download, Laptop, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { detectPlatform } from "../lib/platform";
import { DOWNLOADS } from "../lib/site";
import { useLatestRelease } from "../lib/release";

export const PlatformIcon = ({ id, className }) => (id === "windows" ? <Monitor className={className} /> : <Laptop className={className} />);

// Big primary download button for the visitor's OS, plus a link to the other one.
export default function DownloadButton({ size = "lg", showAlt = true, className }) {
  const os = detectPlatform();
  const primary = os === "windows" ? DOWNLOADS.windows : DOWNLOADS.mac;
  const other = primary.id === "mac" ? DOWNLOADS.windows : DOWNLOADS.mac;
  const release = useLatestRelease();
  const desktop = os === "mac" || os === "windows";

  return (
    <div className={clsx("flex flex-col items-start gap-2.5", className)}>
      {desktop ? (
        <a href={primary.url} className={clsx("btn btn-primary group", size === "lg" && "btn-lg")}>
          <Download className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-y-0.5" />
          Download for {primary.label}
        </a>
      ) : (
        <Link to="/download" className={clsx("btn btn-primary", size === "lg" && "btn-lg")}>
          <Download className="h-[18px] w-[18px]" /> Get Airglide for Mac or PC
        </Link>
      )}
      {showAlt && (
        <p className="text-[0.84rem] text-ink-3">
          {release.version ? `Version ${release.version} · ` : ""}
          {desktop ? (
            <>
              Also for{" "}
              <a href={other.url} className="font-semibold text-ink-2 underline-offset-4 hover:text-primary hover:underline">
                {other.label}
              </a>{" "}
              ·{" "}
            </>
          ) : null}
          <Link to="/download" className="font-semibold text-ink-2 underline-offset-4 hover:text-primary hover:underline">
            All downloads
          </Link>
        </p>
      )}
    </div>
  );
}
