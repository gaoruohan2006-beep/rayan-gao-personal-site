"use client";

import { geoNaturalEarth1, geoPath } from "d3-geo";
import { useEffect, useMemo, useRef, useState } from "react";
import { feature } from "topojson-client";
import world from "world-atlas/countries-110m.json";
import type { FeatureCollection, Geometry } from "geojson";
import { Localized } from "./localized";

const siteId = "0b8c6518-924c-4dbd-994f-afaec8192b5a";
const trackerOrigin = "https://visitor-tracker-129.emergent.host";
const projection = geoNaturalEarth1().fitExtent(
  [[22, 20], [778, 400]],
  { type: "Sphere" },
);
const drawPath = geoPath(projection);
const countries = feature(
  world as never,
  world.objects.countries as never,
) as unknown as FeatureCollection<Geometry>;

type VisitorPoint = {
  lat: number;
  lng: number;
};

type VisitorResponse = {
  count?: number;
  points?: VisitorPoint[];
};

export function VisitorMap() {
  const trackerRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<VisitorPoint[]>([]);
  const [count, setCount] = useState(0);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const host = trackerRef.current;
    if (!host) return;

    const tracker = document.createElement("script");
    tracker.async = true;
    tracker.src =
      `${trackerOrigin}/api/embed/visitor-globe.js?site_id=${siteId}` +
      "&map=flat&w=1&h=1&theme=ivory&speed=off";
    host.appendChild(tracker);

    let active = true;
    async function loadPoints() {
      try {
        const response = await fetch(
          `${trackerOrigin}/api/visitor-map/${siteId}?hours=24&limit=400`,
        );
        if (!response.ok) throw new Error("Visitor map unavailable");
        const data = (await response.json()) as VisitorResponse;
        if (!active) return;
        const validPoints = (data.points ?? []).filter(
          (point) =>
            Number.isFinite(point.lat) &&
            Number.isFinite(point.lng) &&
            point.lat >= -90 &&
            point.lat <= 90 &&
            point.lng >= -180 &&
            point.lng <= 180,
        );
        setPoints(validPoints);
        setCount(data.count ?? validPoints.length);
        setAvailable(true);
      } catch {
        if (active) setAvailable(false);
      }
    }

    void loadPoints();
    const refresh = window.setInterval(loadPoints, 30_000);
    return () => {
      active = false;
      window.clearInterval(refresh);
      host.replaceChildren();
    };
  }, []);

  const markers = useMemo(
    () =>
      points.flatMap((point, index) => {
        const position = projection([point.lng, point.lat]);
        if (!position) return [];
        return [{ point, index, x: position[0], y: position[1] }];
      }),
    [points],
  );

  return (
    <div className="visitor-map-card">
      <div className="visitor-map-canvas">
        <svg
          viewBox="0 0 800 420"
          role="img"
          aria-label="World map showing recent visitor locations"
        >
          <path className="visitor-map-ocean" d={drawPath({ type: "Sphere" }) ?? undefined} />
          <g className="visitor-map-land">
            {countries.features.map((country, index) => (
              <path key={country.id ?? index} d={drawPath(country) ?? undefined} />
            ))}
          </g>
          <g className="visitor-map-points">
            {markers.map(({ point, index, x, y }) => (
              <g key={`${point.lat}-${point.lng}-${index}`} transform={`translate(${x} ${y})`}>
                <circle className="visitor-map-pulse" r="7" />
                <circle className="visitor-map-dot" r="3.2" />
              </g>
            ))}
          </g>
        </svg>
      </div>

      <div className="visitor-map-summary" aria-live="polite">
        <div>
          <strong>{available ? count : "—"}</strong>
          <span>
            <Localized zh="最近 24 小时访客" en="visitors in the last 24 hours" />
          </span>
        </div>
        <p>
          <Localized
            zh="红点表示访客所在城市的近似位置，不记录精确地址。"
            en="Red markers show approximate city locations; precise addresses are not collected."
          />
        </p>
        <a
          href="https://feed-pulse.com"
          target="_blank"
          rel="noreferrer"
        >
          <Localized zh="访客数据由 FeedPulse 提供 ↗" en="Visitor data by FeedPulse ↗" />
        </a>
      </div>

      <div ref={trackerRef} className="visitor-map-tracker" aria-hidden="true" />
    </div>
  );
}
