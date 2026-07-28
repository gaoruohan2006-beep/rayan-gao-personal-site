import Link from "next/link";
import { Localized } from "./localized";
import { withBasePath } from "./site-data";

const needs = [
  { zh: "专业、学位与预计毕业时间", en: "Major, degree, and expected graduation date" },
  { zh: "研究方向或目前感兴趣的领域", en: "Research interests and current areas of focus" },
  { zh: "代表课程、项目与竞赛经历", en: "Selected coursework, projects, and competitions" },
  { zh: "奖项、技能、论文或公开演讲", en: "Awards, skills, publications, and talks" },
];

export default function Home() {
  return (
    <article className="content-page">
      <header className="page-header">
        <p className="page-kicker">
          <Localized zh="个人简介" en="About" />
        </p>
        <h1><Localized zh="关于我" en="About Me" /></h1>
        <p className="page-lead">
          <Localized
            zh="一份持续生长的学习、研究与实践档案。"
            en="A growing academic record of learning, research, and work."
          />
        </p>
      </header>

      <section className="prose-section">
        <p>
          <Localized
            zh={
              <>
                你好，我是 <strong>Rayan Gao</strong>，目前就读于{" "}
                <a href="https://www.wust.edu.cn/" target="_blank" rel="noreferrer">
                  武汉科技大学
                </a>
                ，现居中国武汉。
              </>
            }
            en={
              <>
                Hello! I&apos;m <strong>Rayan Gao</strong>, a student at{" "}
                <a href="https://www.wust.edu.cn/" target="_blank" rel="noreferrer">
                  Wuhan University of Science and Technology
                </a>{" "}
                in Wuhan, China.
              </>
            }
          />
        </p>
        <p>
          <Localized
            zh="这个网站用于系统整理我的教育经历、研究兴趣、项目作品与学术活动。现阶段只展示已经确认的真实信息，其他栏目会随着材料补充逐步完善。"
            en="This website organizes my education, research interests, projects, and academic activities. It currently shows only verified information; the remaining sections will grow as new material becomes available."
          />
        </p>
      </section>

      <aside className="notice">
        <div className="notice-mark" aria-hidden="true">i</div>
        <div>
          <strong><Localized zh="档案正在完善" en="Profile in progress" /></strong>
          <p>
            <Localized
              zh="这是网站的第一版结构。尚未提供的学术内容会保持空白，不会用虚构经历填充。"
              en="This is the first structured version of the site. Empty academic sections are intentional and will not be filled with fictional work."
            />
          </p>
        </div>
      </aside>

      <section className="content-section" id="affiliation">
        <div className="section-heading">
          <span>01</span>
          <h2><Localized zh="当前院校" en="Current Affiliation" /></h2>
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
            <p><Localized zh="在读学生" en="Student" /></p>
            <small>
              <Localized
                zh="专业、学位与在读时间待补充。"
                en="Department, degree, and dates to be confirmed."
              />
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
          <h2><Localized zh="学术兴趣" en="Academic Interests" /></h2>
        </div>
        <div className="empty-academic">
          <span className="empty-symbol" aria-hidden="true">＋</span>
          <div>
            <h3>
              <Localized
                zh="研究兴趣将在这里展示"
                en="Research interests will appear here"
              />
            </h3>
            <p>
              <Localized
                zh="确认专业和感兴趣的方向后，这里会形成简洁、准确的研究主题列表。"
                en="Once the major and areas of interest are confirmed, this section will present a concise and accurate list of research themes."
              />
            </p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>03</span>
          <h2><Localized zh="最新动态" en="Latest Updates" /></h2>
        </div>
        <ol className="updates">
          <li>
            <time dateTime="2026-07-28">
              <Localized zh="2026 年 7 月" en="Jul 2026" />
            </time>
            <div>
              <strong>
                <Localized zh="学术主页正式上线" en="Academic profile launched" />
              </strong>
              <p>
                <Localized
                  zh="网站按照 Academic Pages 的内容结构重新组织，并为后续学术记录做好准备。"
                  en="The website was reorganized around the Academic Pages content model and prepared for future academic records."
                />
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>04</span>
          <h2><Localized zh="接下来需要补充" en="What to Add Next" /></h2>
        </div>
        <div className="needs-grid">
          {needs.map((need, index) => (
            <div className="need-item" key={need.zh}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p><Localized zh={need.zh} en={need.en} /></p>
            </div>
          ))}
        </div>
        <Link className="academic-button" href={withBasePath("/cv/")}>
          <Localized zh="查看简历框架" en="View CV framework" />
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </article>
  );
}
