import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { CopyEmail } from "./copy-email";
import { profile, withBasePath } from "./site-data";
import { SiteNav } from "./site-nav";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const base = host ? `${protocol}://${host}` : "https://rayan-gao-space.gaoruohan2006.chatgpt.site";
  const ogImage = `${base}/og-academic.png`;

  return {
    title: {
      default: "Rayan Gao — Academic Portfolio",
      template: "%s | Rayan Gao",
    },
    description:
      "Rayan Gao 的学术个人主页。武汉科技大学在读，记录研究、项目、教学、文章与个人履历。",
    openGraph: {
      title: "Rayan Gao — Academic Portfolio",
      description: "Student at Wuhan University of Science and Technology.",
      type: "website",
      url: base,
      images: [{ url: ogImage, width: 1734, height: 907, alt: "Rayan Gao academic portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rayan Gao — Academic Portfolio",
      description: "Student at Wuhan University of Science and Technology.",
      images: [ogImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="masthead">
          <div className="masthead-inner">
            <Link className="site-title" href={withBasePath("/")}>
              Rayan Gao <span>/ Academic Portfolio</span>
            </Link>
            <SiteNav />
          </div>
        </header>

        <div className="academic-shell">
          <aside className="author-profile">
            <div className="avatar" aria-label="Rayan Gao initials">RG</div>
            <div className="author-content">
              <h2>{profile.name}</h2>
              <p className="author-role">{profile.role}</p>
              <p className="author-bio">
                Building a truthful academic record, one project at a time.
              </p>
            </div>

            <dl className="author-details">
              <div>
                <dt aria-hidden="true">◎</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt aria-hidden="true">⌂</dt>
                <dd>{profile.schoolZh}</dd>
              </div>
              <div>
                <dt aria-hidden="true">@</dt>
                <dd><a href={`mailto:${profile.email}`}>Email</a></dd>
              </div>
              <div>
                <dt aria-hidden="true">⌘</dt>
                <dd><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></dd>
              </div>
            </dl>

            <CopyEmail email={profile.email} />
          </aside>

          <main className="academic-main">{children}</main>
        </div>

        <footer className="page-footer">
          <div>
            <strong>Rayan Gao</strong>
            <p>Academic portfolio powered by a modern Academic Pages-inspired system.</p>
          </div>
          <div className="footer-links">
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href="#top">Top ↑</a>
          </div>
          <small>© 2026 Rayan Gao · Last updated July 2026</small>
        </footer>
      </body>
    </html>
  );
}
