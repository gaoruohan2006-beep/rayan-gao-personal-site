"use client";

import { useState } from "react";
import { Localized } from "./localized";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button className="copy-button" type="button" onClick={copy} aria-live="polite">
      <span>
        {copied ? (
          <Localized zh="邮箱已复制" en="Email copied" />
        ) : (
          <Localized zh="复制邮箱" en="Copy email" />
        )}
      </span>
      <i aria-hidden="true">{copied ? "✓" : "↗"}</i>
    </button>
  );
}
