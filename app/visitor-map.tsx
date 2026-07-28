"use client";

import { geoNaturalEarth1, geoPath } from "d3-geo";
import { useEffect, useMemo, useState } from "react";
import { feature } from "topojson-client";
import world from "world-atlas/countries-110m.json";
import type { FeatureCollection, Geometry } from "geojson";
import { Localized } from "./localized";

const API_ORIGIN = "https://rayan-gao-space.gaoruohan2006.chatgpt.site";
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
  city?: string | null;
  country?: string | null;
};

type VisitorResponse = {
  count?: number;
  points?: VisitorPoint[];
};

export function VisitorMap() {
  const [points, setPoints] = useState<VisitorPoint[]>([]);
  const [count, setCount] = useState(0);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadPoints() {
      try {
        const apiOrigin = window.location.hostname.endsWith("github.io")
          ? API_ORIGIN
          : "";
        const response = await fetch(`${apiOrigin}/api/visitors?hours=24&limit=400`);
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
            zh="红点表示匿名访客所在城市的近似位置，不保存 IP 或精确地址。"
            en="Red markers show approximate cities for anonymous visitors; IPs and precise addresses are not stored."
          />
        </p>
      </div>
    </div>
  );
}
