import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { CopyEmail } from "./copy-email";
import { LanguageToggle } from "./language-toggle";
import { Localized } from "./localized";
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
      default: "Rayan Gao — 学术主页",
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
    <html lang="zh-CN" data-language="zh" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var l=localStorage.getItem('rayan-language');var v=l==='en'?'en':'zh';document.documentElement.dataset.language=v;document.documentElement.lang=v==='zh'?'zh-CN':'en'}catch(e){}",
          }}
        />
      </head>
      <body>
        <header className="masthead">
          <div className="masthead-inner">
            <Link className="site-title" href={withBasePath("/")}>
              Rayan Gao{" "}
              <span>
                / <Localized zh="学术主页" en="Academic Portfolio" />
              </span>
            </Link>
            <div className="masthead-actions">
              <SiteNav />
              <LanguageToggle />
            </div>
          </div>
        </header>

        <div className="academic-shell">
          <aside className="author-profile">
            <div className="avatar" aria-label="Rayan Gao initials">RG</div>
            <div className="author-content">
              <h2>{profile.name}</h2>
              <p className="author-role">
                <Localized zh="学生" en={profile.role} />
              </p>
              <p className="author-bio">
                <Localized
                  zh="用真实的项目与经历，逐步建立个人学术档案。"
                  en="Building a truthful academic record, one project at a time."
                />
              </p>
            </div>

            <dl className="author-details">
              <div>
                <dt aria-hidden="true">◎</dt>
                <dd><Localized zh="中国武汉" en={profile.location} /></dd>
              </div>
              <div>
                <dt aria-hidden="true">⌂</dt>
                <dd><Localized zh={profile.schoolZh} en={profile.school} /></dd>
              </div>
              <div>
                <dt aria-hidden="true">@</dt>
                <dd>
                  <a href={`mailto:${profile.email}`}>
                    <Localized zh="邮箱" en="Email" />
                  </a>
                </dd>
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
            <p>
              <Localized
                zh="基于 Academic Pages 信息架构构建的现代学术主页。"
                en="A modern academic portfolio inspired by Academic Pages."
              />
            </p>
          </div>
          <div className="footer-links">
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={`mailto:${profile.email}`}><Localized zh="邮箱" en="Email" /></a>
            <a href="#top"><Localized zh="返回顶部 ↑" en="Top ↑" /></a>
          </div>
          <small>
            <Localized
              zh="© 2026 Rayan Gao · 最后更新于 2026 年 7 月"
              en="© 2026 Rayan Gao · Last updated July 2026"
            />
          </small>
        </footer>
      </body>
    </html>
  );
}
