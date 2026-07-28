import { notFound } from "next/navigation";

type SectionContent = {
  kicker: string;
  title: string;
  lead: string;
  description: string;
  requirements: string[];
};

const sections: Record<string, SectionContent> = {
  publications: {
    kicker: "Research output / 研究成果",
    title: "Publications",
    lead: "Journal articles, conference papers, preprints, and other scholarly work.",
    description:
      "目前没有已确认的论文记录。之后可以按年份、论文类型或研究主题组织，并为每条成果加入摘要、合作者、DOI、PDF 与引用信息。",
    requirements: ["论文题目与作者顺序", "发表或投稿状态", "期刊或会议名称", "DOI、PDF 或项目链接"],
  },
  talks: {
    kicker: "Academic activity / 学术活动",
    title: "Talks",
    lead: "Conference talks, seminars, presentations, and posters.",
    description:
      "目前没有已确认的演讲记录。课程汇报、竞赛答辩、学术海报和公开分享都可以在这里按时间整理。",
    requirements: ["活动与报告名称", "日期和举办地点", "你的报告题目", "幻灯片、海报或视频链接"],
  },
  teaching: {
    kicker: "Teaching / 教学",
    title: "Teaching",
    lead: "Teaching, mentoring, tutoring, and educational contributions.",
    description:
      "目前没有已确认的教学经历。助教、课程辅导、社团培训或学习资料建设都可以作为真实条目加入。",
    requirements: ["课程或活动名称", "承担的角色", "时间与服务对象", "讲义或资料链接"],
  },
  portfolio: {
    kicker: "Selected work / 项目作品",
    title: "Portfolio",
    lead: "Research projects, coursework, software, competitions, and creative work.",
    description:
      "这里将展示最能代表你的项目。每个案例会说明问题背景、你的贡献、方法、结果以及可以核验的链接或截图。",
    requirements: ["项目名称与时间", "问题背景和团队规模", "你负责的具体工作", "成果、代码、图片或演示"],
  },
  blog: {
    kicker: "Writing / 文章",
    title: "Blog Posts",
    lead: "Notes on learning, methods, books, tools, and ideas.",
    description:
      "目前尚未发布文章。之后可以用短笔记记录知识点，也可以用长文总结课程、项目方法与阅读收获。",
    requirements: ["文章标题", "正文或写作提纲", "发布日期", "相关资料与引用来源"],
  },
  cv: {
    kicker: "Curriculum vitae / 个人履历",
    title: "Curriculum Vitae",
    lead: "A concise record of education, experience, skills, and achievements.",
    description:
      "当前履历只包含已确认的学校与联系方式。提供专业、时间、经历和奖项后，可以生成完整网页履历与可下载 PDF。",
    requirements: ["专业、学位与在读时间", "项目、实习或社团经历", "技能、语言与证书", "奖项、竞赛与社会服务"],
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
        <p className="page-kicker">{content.kicker}</p>
        <h1>{content.title}</h1>
        <p className="page-lead">{content.lead}</p>
      </header>

      {isCv && (
        <section className="content-section cv-section">
          <div className="section-heading">
            <span>01</span>
            <h2>Education</h2>
          </div>
          <div className="cv-entry">
            <div>
              <h3>Wuhan University of Science and Technology</h3>
              <p>Student · 武汉科技大学</p>
            </div>
            <time>Dates pending</time>
          </div>
        </section>
      )}

      <section className="content-section">
        <div className="section-heading">
          <span>{isCv ? "02" : "01"}</span>
          <h2>{isCv ? "Additional Sections" : "Current Record"}</h2>
        </div>
        <div className="empty-record">
          <div className="empty-record-icon" aria-hidden="true">◇</div>
          <h3>No verified entries yet</h3>
          <p>{content.description}</p>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>{isCv ? "03" : "02"}</span>
          <h2>Information Needed</h2>
        </div>
        <ul className="requirements-list">
          {content.requirements.map((item) => (
            <li key={item}>
              <span aria-hidden="true">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
