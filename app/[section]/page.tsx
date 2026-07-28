import { notFound } from "next/navigation";
import { Localized } from "../localized";

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
      zh: "目前没有已确认的论文记录。之后可以按年份、论文类型或研究主题组织，并为每条成果加入摘要、合作者、DOI、PDF 与引用信息。",
      en: "No publication records have been confirmed yet. Future entries can be organized by year, publication type, or research topic, with abstracts, co-authors, DOI, PDF, and citation details.",
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
      zh: "目前没有已确认的报告记录。课程汇报、竞赛答辩、学术海报和公开分享都可以在这里按时间整理。",
      en: "No talk records have been confirmed yet. Course presentations, competition defenses, academic posters, and public talks can be organized here chronologically.",
    },
    requirements: [
      { zh: "活动与报告名称", en: "Event and presentation name" },
      { zh: "日期和举办地点", en: "Date and location" },
      { zh: "你的报告题目", en: "Your presentation title" },
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
      zh: "目前没有已确认的教学经历。助教、课程辅导、社团培训或学习资料建设都可以作为真实条目加入。",
      en: "No teaching experience has been confirmed yet. Teaching assistance, tutoring, student training, or educational resource development can be added as verified entries.",
    },
    requirements: [
      { zh: "课程或活动名称", en: "Course or activity name" },
      { zh: "承担的角色", en: "Your role" },
      { zh: "时间与服务对象", en: "Dates and audience" },
      { zh: "讲义或资料链接", en: "Teaching material link" },
    ],
  },
  portfolio: {
    kicker: { zh: "代表作品", en: "Selected Work" },
    title: { zh: "项目作品", en: "Portfolio" },
    lead: {
      zh: "研究项目、课程作业、软件、竞赛与创意作品。",
      en: "Research projects, coursework, software, competitions, and creative work.",
    },
    description: {
      zh: "这里将展示最能代表你的项目。每个案例会说明问题背景、你的贡献、方法、结果以及可以核验的链接或截图。",
      en: "This section will showcase your strongest projects. Each case study will explain the context, your contribution, methods, results, and verifiable links or images.",
    },
    requirements: [
      { zh: "项目名称与时间", en: "Project name and date" },
      { zh: "问题背景和团队规模", en: "Context and team size" },
      { zh: "你负责的具体工作", en: "Your specific contribution" },
      { zh: "成果、代码、图片或演示", en: "Results, code, images, or demo" },
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
  cv: {
    kicker: { zh: "个人履历", en: "Curriculum Vitae" },
    title: { zh: "个人简历", en: "Curriculum Vitae" },
    lead: {
      zh: "教育、经历、技能与成果的简洁记录。",
      en: "A concise record of education, experience, skills, and achievements.",
    },
    description: {
      zh: "当前履历只包含已确认的学校与联系方式。提供专业、时间、经历和奖项后，可以生成完整网页履历与可下载 PDF。",
      en: "The current CV contains only the confirmed institution and contact information. A complete web CV and downloadable PDF can be created after the major, dates, experience, and awards are provided.",
    },
    requirements: [
      { zh: "专业、学位与在读时间", en: "Major, degree, and dates" },
      { zh: "项目、实习或社团经历", en: "Projects, internships, or activities" },
      { zh: "技能、语言与证书", en: "Skills, languages, and certificates" },
      { zh: "奖项、竞赛与社会服务", en: "Awards, competitions, and service" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export default async function AcademicSection({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const content = sections[section];
  if (!content) notFound();

  const isCv = section === "cv";

  return (
    <article className="content-page">
      <header className="page-header">
        <p className="page-kicker">
          <Localized zh={content.kicker.zh} en={content.kicker.en} />
        </p>
        <h1><Localized zh={content.title.zh} en={content.title.en} /></h1>
        <p className="page-lead">
          <Localized zh={content.lead.zh} en={content.lead.en} />
        </p>
      </header>

      {isCv && (
        <section className="content-section cv-section">
          <div className="section-heading">
            <span>01</span>
            <h2><Localized zh="教育经历" en="Education" /></h2>
          </div>
          <div className="cv-entry">
            <div>
              <h3>
                <Localized
                  zh="武汉科技大学"
                  en="Wuhan University of Science and Technology"
                />
              </h3>
              <p><Localized zh="在读学生" en="Student" /></p>
            </div>
            <time><Localized zh="时间待补充" en="Dates pending" /></time>
          </div>
        </section>
      )}

      <section className="content-section">
        <div className="section-heading">
          <span>{isCv ? "02" : "01"}</span>
          <h2>
            <Localized
              zh={isCv ? "其他经历" : "当前记录"}
              en={isCv ? "Additional Sections" : "Current Record"}
            />
          </h2>
        </div>
        <div className="empty-record">
          <div className="empty-record-icon" aria-hidden="true">◇</div>
          <h3><Localized zh="暂无已确认条目" en="No verified entries yet" /></h3>
          <p>
            <Localized
              zh={content.description.zh}
              en={content.description.en}
            />
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>{isCv ? "03" : "02"}</span>
          <h2><Localized zh="需要提供的信息" en="Information Needed" /></h2>
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
