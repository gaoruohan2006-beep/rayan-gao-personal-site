import { notFound } from "next/navigation";
import { CopyContact } from "../copy-contact";
import { DocumentCard } from "../document-card";
import { Localized } from "../localized";
import { profile } from "../site-data";

type LocalizedValue = { zh: string; en: string };

type SectionContent = {
  kicker: LocalizedValue;
  title: LocalizedValue;
  lead: LocalizedValue;
  description: LocalizedValue;
  requirements: LocalizedValue[];
};

const sections: Record<string, SectionContent> = {
  publications: {
    kicker: { zh: "研究成果", en: "Research Output" },
    title: { zh: "论文成果", en: "Publications" },
    lead: {
      zh: "期刊论文、会议论文、预印本及其他学术成果。",
      en: "Journal articles, conference papers, preprints, and other scholarly work.",
    },
    description: {
      zh: "目前没有已确认的正式发表论文。竞赛论文已收录在项目作品页面，不会与学术出版物混淆。",
      en: "No formal publications have been confirmed. Competition papers are listed under Portfolio and are not presented as academic publications.",
    },
    requirements: [
      { zh: "论文题目与作者顺序", en: "Title and author order" },
      { zh: "发表或投稿状态", en: "Publication or submission status" },
      { zh: "期刊或会议名称", en: "Journal or conference name" },
      { zh: "DOI、PDF 或项目链接", en: "DOI, PDF, or project link" },
    ],
  },
  talks: {
    kicker: { zh: "学术活动", en: "Academic Activity" },
    title: { zh: "报告与演讲", en: "Talks" },
    lead: {
      zh: "会议报告、研讨会、课程展示与学术海报。",
      en: "Conference talks, seminars, presentations, and posters.",
    },
    description: {
      zh: "目前没有已确认的公开报告记录。课程汇报、竞赛答辩、学术海报和公开分享可以在后续加入。",
      en: "No public talk records have been confirmed. Course presentations, competition defenses, posters, and public talks can be added later.",
    },
    requirements: [
      { zh: "活动与报告名称", en: "Event and presentation name" },
      { zh: "日期和举办地点", en: "Date and location" },
      { zh: "报告题目与个人角色", en: "Presentation title and role" },
      { zh: "幻灯片、海报或视频链接", en: "Slides, poster, or video link" },
    ],
  },
  teaching: {
    kicker: { zh: "教学经历", en: "Teaching" },
    title: { zh: "教学与指导", en: "Teaching" },
    lead: {
      zh: "教学、指导、辅导及教育资源建设。",
      en: "Teaching, mentoring, tutoring, and educational contributions.",
    },
    description: {
      zh: "目前没有已确认的教学经历。助教、课程辅导、社团培训或学习资料建设可以在后续加入。",
      en: "No teaching experience has been confirmed. Teaching assistance, tutoring, student training, or educational resources can be added later.",
    },
    requirements: [
      { zh: "课程或活动名称", en: "Course or activity name" },
      { zh: "承担的角色", en: "Your role" },
      { zh: "时间与服务对象", en: "Dates and audience" },
      { zh: "讲义或资料链接", en: "Teaching material link" },
    ],
  },
  blog: {
    kicker: { zh: "个人写作", en: "Writing" },
    title: { zh: "文章与笔记", en: "Blog Posts" },
    lead: {
      zh: "关于学习、方法、书籍、工具与想法的记录。",
      en: "Notes on learning, methods, books, tools, and ideas.",
    },
    description: {
      zh: "目前尚未发布文章。之后可以用短笔记记录知识点，也可以用长文总结课程、项目方法与阅读收获。",
      en: "No posts have been published yet. Future entries may include short learning notes or longer reflections on coursework, project methods, and reading.",
    },
    requirements: [
      { zh: "文章标题", en: "Post title" },
      { zh: "正文或写作提纲", en: "Draft or outline" },
      { zh: "发布日期", en: "Publication date" },
      { zh: "相关资料与引用来源", en: "References and source material" },
    ],
  },
};

function PageHeader({
  kicker,
  title,
  lead,
}: {
  kicker: LocalizedValue;
  title: LocalizedValue;
  lead: LocalizedValue;
}) {
  return (
    <header className="page-header">
      <p className="page-kicker"><Localized zh={kicker.zh} en={kicker.en} /></p>
      <h1><Localized zh={title.zh} en={title.en} /></h1>
      <p className="page-lead"><Localized zh={lead.zh} en={lead.en} /></p>
    </header>
  );
}

function PortfolioPage() {
  return (
    <article className="content-page">
      <PageHeader
        kicker={{ zh: "代表作品", en: "Selected Work" }}
        title={{ zh: "项目作品", en: "Portfolio" }}
        lead={{
          zh: "竞赛、课题研究与课程项目作品。",
          en: "Competition, research, and course projects.",
        }}
      />

      <section className="content-section">
        <div className="section-heading">
          <span>01</span>
          <h2><Localized zh="竞赛项目作品" en="Competition Projects" /></h2>
        </div>
        <div className="document-stack">
          <DocumentCard
            file="/docs/2025-cumcm-nipt.pdf"
            meta={{ zh: "2025 · 省级一等奖 · 60 页", en: "2025 · Provincial First Prize · 60 pages" }}
            title={{
              zh: "基于 Logistic 与混合优化模型的 NIPT 研究",
              en: "NIPT Study Based on Logistic and Hybrid Optimization Models",
            }}
            description={{
              zh: "2025 高教社杯全国大学生数学建模竞赛省级一等奖作品。队长，负责建模与代码实现。",
              en: "Provincial First Prize entry in the 2025 CUMCM. Team lead, responsible for modeling and code implementation.",
            }}
            previewTitle="2025 CUMCM NIPT competition paper preview"
          />
          <DocumentCard
            file="/docs/2026-mathorcup-hyperlipidemia.pdf"
            meta={{ zh: "2026 · 一等奖 · 54 页", en: "2026 · First Prize · 54 pages" }}
            title={{
              zh: "基于多维数据特征融合和多目标动态规划的高血脂预警与干预机制",
              en: "Hyperlipidemia Warning and Intervention Using Multidimensional Data Fusion and Multi-objective Dynamic Planning",
            }}
            description={{
              zh: "2026 MathorCup 数学应用挑战赛一等奖作品。队长，负责建模与代码实现。",
              en: "First Prize entry in the 2026 MathorCup Mathematical Modeling Challenge. Team lead, responsible for modeling and code implementation.",
            }}
            previewTitle="2026 MathorCup competition paper preview"
          />
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>02</span>
          <h2><Localized zh="其他项目分类" en="Additional Project Areas" /></h2>
        </div>
        <div className="portfolio-category-grid">
          <article>
            <span>R</span>
            <h3><Localized zh="研究项目" en="Research Projects" /></h3>
            <p>
              <Localized
                zh="后续收录碳排放时滞性研究与相关统计分析。"
                en="Future work on carbon-emission time lags and related statistical analysis."
              />
            </p>
          </article>
          <article>
            <span>C</span>
            <h3><Localized zh="课程项目" en="Course Projects" /></h3>
            <p>
              <Localized
                zh="后续收录代表性课程论文、报告与数据分析作业。"
                en="Future selected coursework, reports, and data-analysis assignments."
              />
            </p>
          </article>
          <article>
            <span>D</span>
            <h3><Localized zh="代码与工具" en="Code & Tools" /></h3>
            <p>
              <Localized
                zh="后续收录可公开的模型代码、数据工具与可视化作品。"
                en="Future public modeling code, data tools, and visualization work."
              />
            </p>
          </article>
        </div>
      </section>
    </article>
  );
}

function CvPage() {
  return (
    <article className="content-page">
      <PageHeader
        kicker={{ zh: "个人履历", en: "Curriculum Vitae" }}
        title={{ zh: "个人简历", en: "Curriculum Vitae" }}
        lead={{
          zh: "联系方式与 PDF 简历。",
          en: "Contact details and PDF resume.",
        }}
      />

      <section className="content-section">
        <div className="section-heading">
          <span>01</span>
          <h2><Localized zh="联系方式" en="Contact" /></h2>
        </div>
        <dl className="cv-facts contact-facts">
          <div>
            <dt><Localized zh="邮箱" en="Email" /></dt>
            <dd>
              <CopyContact
                encodedValue={profile.emailEncoded}
                labelZh="点击复制邮箱"
                labelEn="Click to copy email"
              />
            </dd>
          </div>
          <div>
            <dt><Localized zh="手机" en="Phone" /></dt>
            <dd>
              <CopyContact
                encodedValue={profile.phoneEncoded}
                labelZh="点击复制手机号"
                labelEn="Click to copy phone number"
              />
            </dd>
          </div>
          <div>
            <dt><Localized zh="小红书" en="RedNote" /></dt>
            <dd>
              <CopyContact
                encodedValue={profile.xiaohongshuEncoded}
                labelZh="点击复制小红书号"
                labelEn="Click to copy RedNote ID"
              />
            </dd>
          </div>
          <div>
            <dt><Localized zh="抖音" en="TikTok" /></dt>
            <dd>
              <CopyContact
                encodedValue={profile.tiktokEncoded}
                labelZh="点击复制抖音号"
                labelEn="Click to copy TikTok ID"
              />
            </dd>
          </div>
        </dl>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>02</span>
          <h2><Localized zh="PDF 简历" en="PDF Resume" /></h2>
        </div>
        <DocumentCard
          file="/docs/rayan-gao-cv.pdf"
          meta={{ zh: "个人简历 · 1 页", en: "Resume · 1 page" }}
          title={{ zh: "高若寒个人简历", en: "Rayan Gao Resume" }}
          description={{
            zh: "可直接在线预览，也可以下载保存。",
            en: "Preview the resume online or download a copy.",
          }}
          previewTitle="Rayan Gao resume preview"
        />
      </section>
    </article>
  );
}

const updateEntries = [
  {
    zhTitle: "新增网站维护日志",
    enTitle: "Added the website update log",
    zhBody: "上线网站更新记录，并进一步精简项目与简历页面。",
    enBody: "Published the site update log and further refined the Portfolio and CV pages.",
  },
  {
    zhTitle: "优化文档与联系方式",
    enTitle: "Improved documents and contact details",
    zhBody: "优化简历与竞赛作品的版权保护方式，统一邮箱、手机和社交账号的点击复制交互。",
    enBody: "Improved copyright protection for the resume and competition papers, with consistent click-to-copy contact actions.",
  },
  {
    zhTitle: "增强隐私保护",
    enTitle: "Strengthened contact privacy",
    zhBody: "手机与社交账号改为隐藏显示，仅在点击时复制到剪贴板。",
    enBody: "Kept phone and social handles hidden while preserving one-click copy access.",
  },
  {
    zhTitle: "补充个人资料与项目作品",
    enTitle: "Expanded profile and project work",
    zhBody: "更新头像、研究方向、课程与竞赛经历，并加入简历及两份数学建模作品的在线预览与下载。",
    enBody: "Updated the profile, research interests, coursework, and awards, and added previews and downloads for the resume and two modeling papers.",
  },
  {
    zhTitle: "上线中英文切换",
    enTitle: "Launched bilingual modes",
    zhBody: "建立完整的中文与英文界面，并保存访客的语言选择。",
    enBody: "Introduced complete Chinese and English interfaces with persistent language preference.",
  },
  {
    zhTitle: "采用学术主页结构",
    enTitle: "Adopted an academic portfolio structure",
    zhBody: "参考 Academic Pages 重构导航、个人侧栏与学术内容页面。",
    enBody: "Restructured navigation, profile details, and content pages following Academic Pages conventions.",
  },
  {
    zhTitle: "启用 GitHub Pages",
    enTitle: "Enabled GitHub Pages",
    zhBody: "配置自动构建与部署流程，使网站可以通过 GitHub 公开访问。",
    enBody: "Configured automated builds and deployment for public access through GitHub Pages.",
  },
  {
    zhTitle: "网站框架建立",
    enTitle: "Created the website foundation",
    zhBody: "完成个人学术主页的初始框架、浅色视觉系统与响应式布局。",
    enBody: "Built the initial academic site framework, light visual system, and responsive layout.",
  },
] as const;

function UpdatesPage() {
  return (
    <article className="content-page">
      <PageHeader
        kicker={{ zh: "维护记录", en: "Maintenance Log" }}
        title={{ zh: "网站维护更新", en: "Site Updates" }}
        lead={{
          zh: "记录网站的建设、内容补充与体验优化。",
          en: "A record of site development, content additions, and experience improvements.",
        }}
      />

      <section className="content-section">
        <div className="section-heading">
          <span>01</span>
          <h2><Localized zh="更新记录" en="Update History" /></h2>
        </div>
        <ol className="updates">
          {updateEntries.map((entry, index) => (
            <li key={entry.zhTitle}>
              <time dateTime="2026-07-28">2026.07.28</time>
              <div>
                <strong><Localized zh={entry.zhTitle} en={entry.enTitle} /></strong>
                <p><Localized zh={entry.zhBody} en={entry.enBody} /></p>
                <small>
                  <Localized
                    zh={`更新 ${String(updateEntries.length - index).padStart(2, "0")}`}
                    en={`Update ${String(updateEntries.length - index).padStart(2, "0")}`}
                  />
                </small>
              </div>
            </li>
          ))}
        </ol>
      </section>

    </article>
  );
}

function GenericSection({ content }: { content: SectionContent }) {
  return (
    <article className="content-page">
      <PageHeader kicker={content.kicker} title={content.title} lead={content.lead} />
      <section className="content-section">
        <div className="section-heading">
          <span>01</span>
          <h2><Localized zh="当前记录" en="Current Record" /></h2>
        </div>
        <div className="empty-record">
          <div className="empty-record-icon" aria-hidden="true">◇</div>
          <h3><Localized zh="暂无已确认条目" en="No verified entries yet" /></h3>
          <p><Localized zh={content.description.zh} en={content.description.en} /></p>
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading">
          <span>02</span>
          <h2><Localized zh="后续可补充" en="Information to Add" /></h2>
        </div>
        <ul className="requirements-list">
          {content.requirements.map((item) => (
            <li key={item.zh}>
              <span aria-hidden="true">→</span>
              <Localized zh={item.zh} en={item.en} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export function generateStaticParams() {
  return [...Object.keys(sections), "portfolio", "cv", "updates"].map((section) => ({ section }));
}

export default async function AcademicSection({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (section === "portfolio") return <PortfolioPage />;
  if (section === "cv") return <CvPage />;
  if (section === "updates") return <UpdatesPage />;
  const content = sections[section];
  if (!content) notFound();
  return <GenericSection content={content} />;
}
