import Link from "next/link";
import { Localized } from "./localized";
import { withBasePath } from "./site-data";

const interests = [
  {
    index: "01",
    zhTitle: "碳排放时滞性",
    enTitle: "Carbon Emission Time Lags",
    zhText: "关注碳排放影响在时间维度上的滞后特征与量化分析。",
    enText: "Exploring delayed effects and quantitative patterns of carbon emissions over time.",
  },
  {
    index: "02",
    zhTitle: "数学建模",
    enTitle: "Mathematical Modeling",
    zhText: "将统计分析、优化方法与编程用于解决真实复杂问题。",
    enText: "Applying statistics, optimization, and programming to complex real-world problems.",
  },
  {
    index: "03",
    zhTitle: "数学竞赛",
    enTitle: "Mathematics Competitions",
    zhText: "通过竞赛掌握分析数学问题的能力，持续提升数学思维与问题解决能力。",
    enText: "Using competitions to strengthen mathematical analysis, mathematical thinking, and problem-solving.",
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

export default function Home() {
  return (
    <article className="content-page">
      <header className="page-header">
        <p className="page-kicker"><Localized zh="个人简介" en="About" /></p>
        <h1><Localized zh="关于我" en="About Me" /></h1>
        <p className="page-lead">
          <Localized
            zh="统计学、碳排放研究与数学建模实践。"
            en="Statistics, carbon-emission research, and mathematical modeling."
          />
        </p>
      </header>

      <section className="prose-section">
        <p>
          <Localized
            zh={
              <>
                你好，我是 <strong>Rayan Gao</strong>，现为{" "}
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
            zh="我的研究方向是碳排放时滞性，同时关注数学建模与数学竞赛。我习惯从数据、模型与代码三个层面分析问题，并在团队项目中承担建模和程序实现工作。"
            en="My research focuses on temporal lag effects in carbon emissions. I am also interested in mathematical modeling and competitions, approaching problems through data, models, and code while taking responsibility for modeling and implementation in team projects."
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
          <span><Localized zh="数学分析" en="Mathematical Analysis" /></span>
          <span><Localized zh="高等代数" en="Advanced Algebra" /></span>
        </div>
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
          <Link className="text-button" href={withBasePath("/cv/")}>
            <Localized zh="查看完整简历" en="View full CV" />
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </article>
  );
}
