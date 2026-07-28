import type { ReactNode } from "react";

export function Localized({
  zh,
  en,
}: {
  zh: ReactNode;
  en: ReactNode;
}) {
  return (
    <>
      <span className="lang lang-zh">{zh}</span>
      <span className="lang lang-en">{en}</span>
    </>
  );
}
