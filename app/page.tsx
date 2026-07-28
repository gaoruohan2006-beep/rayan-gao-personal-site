import Link from "next/link";
import { withBasePath } from "./site-data";

const needs = [
  "专业、学位与预计毕业时间",
  "研究方向或目前感兴趣的领域",
  "代表课程、项目与竞赛经历",
  "奖项、技能、论文或公开演讲",
];

export default function Home() {
  return (
    <article className="content-page">
      <header className="page-header">
        <p className="page-kicker">About / 个人简介</p>
        <h1>About Me</h1>
        <p className="page-lead">
          A growing academic record of learning, research, and work.
        </p>
      </header>

      <section className="prose-section">
        <p>
          Hello! I&apos;m <strong>Rayan Gao</strong>, a student at{" "}
          <a href="https://www.wust.edu.cn/" target="_blank" rel="noreferrer">
            Wuhan University of Science and Technology
          </a>{" "}
          in Wuhan, China.
        </p>
        <p>
          你好，我是 Rayan Gao，目前就读于武汉科技大学。这个网站用于系统整理我的教育经历、
          研究兴趣、项目作品与学术活动。现阶段只展示已经确认的真实信息，其他栏目会随着材料补充逐步完善。
        </p>
      </section>

      <aside className="notice">
        <div className="notice-mark" aria-hidden="true">i</div>
        <div>
          <strong>Profile in progress</strong>
          <p>
            This is the first structured version of the site. Empty academic
            sections are intentional and will not be filled with fictional work.
          </p>
        </div>
      </aside>

      <section className="content-section" id="affiliation">
        <div className="section-heading">
          <span>01</span>
          <h2>Current Affiliation</h2>
        </div>
        <div className="affiliation-card">
          <div className="school-mark" aria-hidden="true">WUST</div>
          <div>
            <h3>Wuhan University of Science and Technology</h3>
            <p>Student · 武汉科技大学</p>
            <small>Department, degree and dates to be confirmed.</small>
          </div>
          <span className="location-tag">Wuhan, China</span>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>02</span>
          <h2>Academic Interests</h2>
        </div>
        <div className="empty-academic">
          <span className="empty-symbol" aria-hidden="true">＋</span>
          <div>
            <h3>Research interests will be added here.</h3>
            <p>
              等你确认专业和感兴趣的方向后，这里会形成简洁、准确的研究主题列表。
            </p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>03</span>
          <h2>Latest Updates</h2>
        </div>
        <ol className="updates">
          <li>
            <time dateTime="2026-07-28">Jul 2026</time>
            <div>
              <strong>Academic profile launched</strong>
              <p>
                The website was reorganized around the Academic Pages content
                model and prepared for future academic records.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>04</span>
          <h2>What to Add Next</h2>
        </div>
        <div className="needs-grid">
          {needs.map((need, index) => (
            <div className="need-item" key={need}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{need}</p>
            </div>
          ))}
        </div>
        <Link className="academic-button" href={withBasePath("/cv/")}>
          View CV framework <span aria-hidden="true">→</span>
        </Link>
      </section>
    </article>
  );
}
