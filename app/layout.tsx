import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { CopyContact } from "./copy-contact";
import { LanguageToggle } from "./language-toggle";
import { Localized } from "./localized";
import { profile, withBasePath } from "./site-data";
import { SiteNav } from "./site-nav";
import { VisitorTracker } from "./visitor-tracker";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const base = host ? `${protocol}://${host}` : "https://rayan-gao-space.gaoruohan2006.chatgpt.site";
  const ogImage = `${base}/og-academic.png`;

  return {
    title: {
      default: "高若寒 — 学术主页",
      template: "%s | Rayan Gao",
    },
    description:
      "高若寒（Rayan Gao）的学术个人主页。武汉科技大学统计学本科生，研究碳排放时滞性，关注数学建模与数学竞赛。",
    openGraph: {
      title: "Rayan Gao — Academic Portfolio",
      description: "Statistics undergraduate researching temporal lag effects in carbon emissions.",
      type: "website",
      url: base,
      images: [{ url: ogImage, width: 1734, height: 907, alt: "Rayan Gao academic portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rayan Gao — Academic Portfolio",
      description: "Statistics undergraduate researching temporal lag effects in carbon emissions.",
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
              <Localized zh={profile.nameZh} en={profile.nameEn} />{" "}
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
            <Image
              className="avatar"
              src={withBasePath("/avatar-rayan.jpg")}
              width={174}
              height={174}
              alt="高若寒 / Rayan Gao profile avatar"
              priority
              unoptimized
            />
            <div className="author-content">
              <h2><Localized zh={profile.nameZh} en={profile.nameEn} /></h2>
              <p className="author-role">
                <Localized zh="统计学本科生" en={profile.role} />
              </p>
              <p className="author-bio">
                <Localized
                  zh="研究碳排放时滞性，关注数学建模与数学竞赛。"
                  en="Studying temporal lag effects in carbon emissions, with interests in mathematical modeling and competitions."
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
                  <CopyContact
                    encodedValue={profile.emailEncoded}
                    labelZh="复制邮箱"
                    labelEn="Copy email"
                  />
                </dd>
              </div>
              <div>
                <dt aria-hidden="true">☎</dt>
                <dd>
                  <CopyContact
                    encodedValue={profile.phoneEncoded}
                    labelZh="复制手机号"
                    labelEn="Copy phone number"
                  />
                </dd>
              </div>
              <div>
                <dt aria-hidden="true">小</dt>
                <dd>
                  <CopyContact
                    encodedValue={profile.xiaohongshuEncoded}
                    labelZh="复制小红书号"
                    labelEn="Copy RedNote ID"
                  />
                </dd>
              </div>
              <div>
                <dt aria-hidden="true">♪</dt>
                <dd>
                  <CopyContact
                    encodedValue={profile.tiktokEncoded}
                    labelZh="复制抖音号"
                    labelEn="Copy TikTok ID"
                  />
                </dd>
              </div>
              <div>
                <dt aria-hidden="true">⌘</dt>
                <dd><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></dd>
              </div>
            </dl>
          </aside>

          <main className="academic-main">{children}</main>
        </div>
        <VisitorTracker />

        <footer className="page-footer">
          <div>
            <strong><Localized zh={profile.nameZh} en={profile.nameEn} /></strong>
            <p>
              <Localized
                zh="基于 Academic Pages 信息架构构建的现代学术主页。"
                en="A modern academic portfolio inspired by Academic Pages."
              />
            </p>
          </div>
          <div className="footer-links">
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href="#top"><Localized zh="返回顶部 ↑" en="Top ↑" /></a>
          </div>
          <small>
            <Localized
              zh="© 2026 高若寒 · 最后更新于 2026 年 7 月"
              en="© 2026 Rayan Gao · Last updated July 2026"
            />
          </small>
        </footer>
      </body>
    </html>
  );
}
