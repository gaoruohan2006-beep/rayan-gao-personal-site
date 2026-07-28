"use client";

import { useState } from "react";

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
      <span>{copied ? "Email copied" : "Copy email"}</span>
      <i aria-hidden="true">{copied ? "✓" : "↗"}</i>
    </button>
  );
}
