"use client";

import { useEffect } from "react";

const API_ORIGIN = "https://rayan-gao-space.gaoruohan2006.chatgpt.site";
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
    const visitorId = getAnonymousVisitorId();
    const path = window.location.pathname.replace(
      /^\/rayan-gao-personal-site(?=\/|$)/,
      "",
    ) || "/";

    void fetch(`${getApiOrigin()}/api/visitors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId, path }),
      keepalive: true,
    }).catch(() => {
      // Visitor analytics must never affect the browsing experience.
    });
  }, []);

  return null;
}
