import Link from "next/link";
import { Localized } from "./localized";
import { withBasePath } from "./site-data";

const interests = [
  {
    index: "01",
    zhTitle: "组合优化",
    enTitle: "Combinatorial Optimization",
    zhText: "关注离散决策问题的数学建模、算法设计与高效求解。",
    enText: "Studying mathematical formulations, algorithm design, and efficient solution methods for discrete decision problems.",
  },
  {
    index: "02",
    zhTitle: "AI4s",
    enTitle: "AI for Science",
    zhText: "关注人工智能方法在科学问题建模、分析与发现中的应用。",
    enText: "Exploring how artificial intelligence can support scientific modeling, analysis, and discovery.",
  },
  {
    index: "03",
    zhTitle: "数学建模与竞赛",
    enTitle: "Mathematical Modeling & Competitions",
    zhText: "将统计分析、优化方法与编程用于竞赛和真实复杂问题。",
    enText: "Applying statistics, optimization, and programming to competitions and complex real-world problems.",
  },
];

const achievements = [
  {
    year: "2026",
    zh: "MathorCup 数学应用挑战赛一等奖",
    en: "First Prize, MathorCup Mathematical Modeling Challenge",
  },
  {
    year: "2025",
    zh: "高教社杯全国大学生数学建模竞赛省级一等奖",
    en: "Provincial First Prize, CUMCM",
  },
];

const coursework = [
  { zh: "数学分析", en: "Mathematical Analysis" },
  { zh: "高等代数与解析几何", en: "Advanced Algebra & Analytic Geometry" },
  { zh: "概率论", en: "Probability Theory" },
  { zh: "数理统计", en: "Mathematical Statistics" },
  { zh: "运筹学", en: "Operations Research" },
  { zh: "数学建模", en: "Mathematical Modeling" },
  {
    zh: "基于 Python 的专业实验与设计",
    en: "Python-Based Professional Practice & Design",
  },
  {
    zh: "人工智能与科学之美",
    en: "Artificial Intelligence & the Beauty of Science",
  },
] as const;

const transcriptFile = "/docs/wust-chinese-academic-transcript.pdf";

export default function Home() {
  return (
    <article className="content-page">
      <header className="page-header">
        <p className="page-kicker"><Localized zh="个人简介" en="About" /></p>
        <h1><Localized zh="关于我" en="About Me" /></h1>
        <p className="page-lead">
          <Localized
            zh="个人学术基本介绍"
            en="A brief academic introduction"
          />
        </p>
      </header>

      <section className="prose-section">
        <p>
          <Localized
            zh={
              <>
                你好，我是 <strong>高若寒</strong>，现为{" "}
                <a href="https://www.wust.edu.cn/" target="_blank" rel="noreferrer">
                  武汉科技大学
                </a>
                统计学专业本科生，预计于 2028 年毕业。
              </>
            }
            en={
              <>
                Hello! I&apos;m <strong>Rayan Gao</strong>, an undergraduate
                student in Statistics at{" "}
                <a href="https://www.wust.edu.cn/" target="_blank" rel="noreferrer">
                  Wuhan University of Science and Technology
                </a>
                , with an expected graduation year of 2028.
              </>
            }
          />
        </p>
        <p>
          <Localized
            zh="我永远会向堕落的自己开枪，我因瑕疵而鲜活。"
            en="I will always take aim at the version of myself that falls; my flaws are what make me alive."
          />
        </p>
      </section>

      <aside className="notice profile-notice">
        <div className="notice-mark" aria-hidden="true">i</div>
        <div>
          <strong><Localized zh="当前学术档案" en="Current profile" /></strong>
          <p>
            <Localized
              zh="统计学本科 · 2024—2028 · 武汉科技大学 · 中国武汉"
              en="B.S. in Statistics · 2024—2028 · WUST · Wuhan, China"
            />
          </p>
        </div>
      </aside>

      <section className="content-section" id="affiliation">
        <div className="section-heading">
          <span>01</span>
          <h2><Localized zh="教育经历" en="Education" /></h2>
        </div>
        <div className="affiliation-card">
          <div className="school-mark" aria-hidden="true">WUST</div>
          <div>
            <h3>
              <Localized
                zh="武汉科技大学"
                en="Wuhan University of Science and Technology"
              />
            </h3>
            <p><Localized zh="统计学 · 本科生" en="Statistics · Undergraduate" /></p>
            <small>
              <Localized zh="2024—2028（预计）" en="2024—2028 (expected)" />
            </small>
          </div>
          <span className="location-tag">
            <Localized zh="中国武汉" en="Wuhan, China" />
          </span>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>02</span>
          <h2><Localized zh="研究与兴趣" en="Research & Interests" /></h2>
        </div>
        <div className="interest-grid">
          {interests.map((interest) => (
            <article className="interest-card" key={interest.index}>
              <span>{interest.index}</span>
              <h3>
                <Localized zh={interest.zhTitle} en={interest.enTitle} />
              </h3>
              <p><Localized zh={interest.zhText} en={interest.enText} /></p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>03</span>
          <h2><Localized zh="代表课程" en="Selected Coursework" /></h2>
        </div>
        <div className="course-list">
          {coursework.map((course) => (
            <span className="course-pill" key={course.zh}>
              <Localized zh={course.zh} en={course.en} />
            </span>
          ))}
        </div>
        <article className="transcript-card">
          <div className="transcript-mark" aria-hidden="true">PDF</div>
          <div className="transcript-copy">
            <p className="transcript-meta">
              <Localized
                zh="2026 年 7 月 30 日 · 2 页"
                en="Issued July 30, 2026 · 2 pages"
              />
            </p>
            <h3>
              <Localized
                zh="武汉科技大学中文成绩单"
                en="WUST Chinese Academic Transcript"
              />
            </h3>
            <p>
              <Localized
                zh="完整课程、学分及成绩记录。"
                en="Complete record of coursework, credits, and grades."
              />
            </p>
          </div>
          <div className="transcript-actions">
            <a
              className="academic-button"
              href={`${withBasePath(transcriptFile)}#view=FitH`}
              target="_blank"
              rel="noreferrer"
            >
              <Localized zh="在线查看" en="View transcript" />
              <span aria-hidden="true">↗</span>
            </a>
            <a
              className="text-button"
              href={withBasePath(transcriptFile)}
              download="Rayan-Gao-WUST-Transcript.pdf"
            >
              <Localized zh="下载 PDF" en="Download PDF" />
            </a>
          </div>
        </article>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>04</span>
          <h2><Localized zh="竞赛荣誉" en="Competition Honors" /></h2>
        </div>
        <ol className="achievement-list">
          {achievements.map((achievement) => (
            <li key={achievement.year}>
              <time>{achievement.year}</time>
              <div>
                <strong><Localized zh={achievement.zh} en={achievement.en} /></strong>
                <p>
                  <Localized
                    zh="队长 · 负责建模与代码实现"
                    en="Team Lead · Modeling and code implementation"
                  />
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="page-actions">
          <Link className="academic-button" href={withBasePath("/portfolio/")}>
            <Localized zh="查看竞赛作品" en="View competition work" />
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </article>
  );
}
