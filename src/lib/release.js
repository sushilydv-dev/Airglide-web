import { useEffect, useState } from "react";
import { REPO } from "./site";

// The site is static: it asks GitHub's public API about releases from the
// visitor's browser, caches the answer for an hour, and degrades gracefully.
const API = `https://api.github.com/repos/${REPO}`;
const TTL = 60 * 60 * 1000;

async function cached(key, url) {
  try {
    const hit = JSON.parse(sessionStorage.getItem(key) || "null");
    if (hit && Date.now() - hit.t < TTL) return hit.data;
  } catch {
    /* storage unavailable */
  }
  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (res.status === 404) return null;            // no release published yet
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  const data = await res.json();
  try {
    sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), data }));
  } catch {
    /* ignore */
  }
  return data;
}

function useGithub(key, path) {
  const [state, setState] = useState({ loading: true, data: null, error: null });
  useEffect(() => {
    let alive = true;
    cached(key, API + path)
      .then((data) => alive && setState({ loading: false, data, error: null }))
      .catch((error) => alive && setState({ loading: false, data: null, error }));
    return () => {
      alive = false;
    };
  }, [key, path]);
  return state;
}

export function useLatestRelease() {
  const { loading, data, error } = useGithub("ag-latest", "/releases/latest");
  const asset = (name) => data?.assets?.find((a) => a.name === name);
  return {
    loading,
    error,
    none: !loading && !error && !data,
    version: data?.tag_name?.replace(/^v/i, ""),
    date: data?.published_at,
    url: data?.html_url,
    size: (name) => asset(name)?.size,
  };
}

export const useReleases = () => useGithub("ag-releases", "/releases?per_page=20");

export function formatBytes(n) {
  if (!n) return "";
  return n > 1e9 ? `${(n / 1e9).toFixed(1)} GB` : `${Math.round(n / 1e6)} MB`;
}

export function formatDate(iso) {
  return iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "";
}
