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
          zh: "以数学建模竞赛为起点，持续整理研究、课程与代码作品。",
          en: "A growing collection of competition, research, coursework, and software projects.",
        }}
      />

      <section className="prose-section">
        <p>
          <Localized
            zh="以下作品均为团队竞赛成果。我担任队长，主要负责模型构建、求解思路设计与代码实现。"
            en="The projects below are team competition entries. I served as team lead and was primarily responsible for model development, solution design, and code implementation."
          />
        </p>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>01</span>
          <h2><Localized zh="竞赛项目作品" en="Competition Projects" /></h2>
        </div>
        <div className="document-stack">
          <DocumentCard
            file="/docs/2025-cumcm-nipt.pdf"
            meta={{ zh: "2025 · 省级一等奖 · 60 页 · 已加水印", en: "2025 · Provincial First Prize · 60 pages · Watermarked" }}
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
            meta={{ zh: "2026 · 一等奖 · 54 页 · 已加水印", en: "2026 · First Prize · 54 pages · Watermarked" }}
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
          zh: "教育、研究方向、课程、竞赛与联系方式。",
          en: "Education, research, coursework, competitions, and contact details.",
        }}
      />

      <section className="content-section cv-section">
        <div className="section-heading">
          <span>01</span>
          <h2><Localized zh="教育经历" en="Education" /></h2>
        </div>
        <div className="cv-entry">
          <div>
            <h3>
              <Localized
                zh="武汉科技大学 · 统计学"
                en="Wuhan University of Science and Technology · Statistics"
              />
            </h3>
            <p><Localized zh="本科生" en="Undergraduate" /></p>
          </div>
          <time>2024—2028</time>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>02</span>
          <h2><Localized zh="研究与课程" en="Research & Coursework" /></h2>
        </div>
        <dl className="cv-facts">
          <div>
            <dt><Localized zh="研究方向" en="Research focus" /></dt>
            <dd><Localized zh="碳排放时滞性" en="Temporal lag effects in carbon emissions" /></dd>
          </div>
          <div>
            <dt><Localized zh="兴趣方向" en="Interests" /></dt>
            <dd><Localized zh="数学建模、数学竞赛" en="Mathematical modeling and competitions" /></dd>
          </div>
          <div>
            <dt><Localized zh="代表课程" en="Selected coursework" /></dt>
            <dd><Localized zh="数学分析、高等代数" en="Mathematical Analysis and Advanced Algebra" /></dd>
          </div>
        </dl>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>03</span>
          <h2><Localized zh="竞赛经历" en="Competitions" /></h2>
        </div>
        <ol className="achievement-list">
          <li>
            <time>2026</time>
            <div>
              <strong>
                <Localized
                  zh="MathorCup 数学应用挑战赛一等奖"
                  en="First Prize, MathorCup Mathematical Modeling Challenge"
                />
              </strong>
              <p><Localized zh="队长 · 负责建模与代码实现" en="Team Lead · Modeling and code implementation" /></p>
            </div>
          </li>
          <li>
            <time>2025</time>
            <div>
              <strong>
                <Localized
                  zh="高教社杯全国大学生数学建模竞赛省级一等奖"
                  en="Provincial First Prize, CUMCM"
                />
              </strong>
              <p><Localized zh="队长 · 负责建模与代码实现" en="Team Lead · Modeling and code implementation" /></p>
            </div>
          </li>
        </ol>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>04</span>
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
            <dt><Localized zh="小红书" en="Xiaohongshu" /></dt>
            <dd>
              <CopyContact
                encodedValue={profile.xiaohongshuEncoded}
                labelZh="点击复制小红书号"
                labelEn="Click to copy Xiaohongshu ID"
              />
            </dd>
          </div>
        </dl>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>05</span>
          <h2><Localized zh="PDF 简历" en="PDF Resume" /></h2>
        </div>
        <DocumentCard
          file="/docs/rayan-gao-cv.pdf"
          meta={{ zh: "个人简历 · 1 页 · 已加水印", en: "Resume · 1 page · Watermarked" }}
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
  return [...Object.keys(sections), "portfolio", "cv"].map((section) => ({ section }));
}

export default async function AcademicSection({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (section === "portfolio") return <PortfolioPage />;
  if (section === "cv") return <CvPage />;
  const content = sections[section];
  if (!content) notFound();
  return <GenericSection content={content} />;
}
