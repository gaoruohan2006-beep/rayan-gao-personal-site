"use client";

import { useState } from "react";
import { Localized } from "./localized";

type CopyContactProps = {
  encodedValue: string;
  labelZh: string;
  labelEn: string;
};

function fallbackCopy(value: string) {
  const input = document.createElement("textarea");
  input.value = value;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

export function CopyContact({
  encodedValue,
  labelZh,
  labelEn,
}: CopyContactProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const value = window.atob(encodedValue);
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      fallbackCopy(value);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button className="contact-copy" type="button" onClick={copy} aria-live="polite">
      <span>
        {copied ? (
          <Localized zh="已复制" en="Copied" />
        ) : (
          <Localized zh={labelZh} en={labelEn} />
        )}
      </span>
      <i aria-hidden="true">{copied ? "✓" : "⧉"}</i>
    </button>
  );
}
