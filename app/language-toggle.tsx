"use client";

import { useSyncExternalStore } from "react";

type Language = "zh" | "en";

function applyLanguage(language: Language) {
  document.documentElement.dataset.language = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title =
    language === "zh"
      ? "高若寒 — 学术主页"
      : "Rayan Gao — Academic Portfolio";
  localStorage.setItem("rayan-language", language);
  window.dispatchEvent(new Event("rayan-language-change"));
}

function subscribe(callback: () => void) {
  window.addEventListener("rayan-language-change", callback);
  return () => window.removeEventListener("rayan-language-change", callback);
}

function getLanguage(): Language {
  return document.documentElement.dataset.language === "en" ? "en" : "zh";
}

export function LanguageToggle() {
  const language = useSyncExternalStore(subscribe, getLanguage, () => "zh");

  function select(next: Language) {
    applyLanguage(next);
  }

  return (
    <div className="language-toggle" aria-label="Language switch">
      <button
        aria-label="中文"
        aria-pressed={language === "zh"}
        className={language === "zh" ? "active" : undefined}
        onClick={() => select("zh")}
        type="button"
      >
        中
      </button>
      <span aria-hidden="true">/</span>
      <button
        aria-label="English"
        aria-pressed={language === "en"}
        className={language === "en" ? "active" : undefined}
        onClick={() => select("en")}
        type="button"
      >
        EN
      </button>
    </div>
  );
}
