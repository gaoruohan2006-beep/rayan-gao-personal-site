"use client";

import { useEffect, useRef } from "react";

const siteId = "0b8c6518-924c-4dbd-994f-afaec8192b5a";
const trackerOrigin = "https://visitor-tracker-129.emergent.host";

export function VisitorTracker() {
  const trackerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = trackerRef.current;
    if (!host) return;

    const tracker = document.createElement("script");
    tracker.async = true;
    tracker.src =
      `${trackerOrigin}/api/embed/traffic-feed.js?site_id=${siteId}` +
      "&rows=1&nobot=1";
    host.appendChild(tracker);

    return () => {
      host.replaceChildren();
    };
  }, []);

  return <div ref={trackerRef} className="visitor-map-tracker" aria-hidden="true" />;
}
