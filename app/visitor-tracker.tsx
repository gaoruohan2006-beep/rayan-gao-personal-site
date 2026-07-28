"use client";

import { useEffect } from "react";

const API_ORIGIN = "https://rayan-gao-space.gaoruohan2006.chatgpt.site";
const GEOLOCATION_URL = "https://get.geojs.io/v1/ip/geo.json";
const VISITOR_ID_KEY = "rayan-gao-anonymous-visitor-id";

function getApiOrigin() {
  return window.location.hostname.endsWith("github.io") ? API_ORIGIN : "";
}

function getAnonymousVisitorId() {
  const existing = window.localStorage.getItem(VISITOR_ID_KEY);
  if (existing) return existing;

  const id = window.crypto.randomUUID();
  window.localStorage.setItem(VISITOR_ID_KEY, id);
  return id;
}

export function VisitorTracker() {
  useEffect(() => {
    async function recordVisit() {
      const visitorId = getAnonymousVisitorId();
      const path = window.location.pathname.replace(
        /^\/rayan-gao-personal-site(?=\/|$)/,
        "",
      ) || "/";
      const locationResponse = await fetch(GEOLOCATION_URL);
      if (!locationResponse.ok) throw new Error("Location unavailable");
      const location = (await locationResponse.json()) as {
        latitude?: string;
        longitude?: string;
        city?: string;
        country_code?: string;
      };

      await fetch(`${getApiOrigin()}/api/visitors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          path,
          latitude: Number(location.latitude),
          longitude: Number(location.longitude),
          city: location.city,
          country: location.country_code,
        }),
        keepalive: true,
      });
    }

    void recordVisit().catch(() => {
      // Visitor analytics must never affect the browsing experience.
    });
  }, []);

  return null;
}
