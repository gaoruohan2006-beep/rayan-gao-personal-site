import { CopyEmail } from "./copy-email";

const contentSlots = [
  {
    number: "01",
    title: "Selected work",
    titleZh: "项目与作品",
    description: "研究、课程项目、代码作品或比赛成果，都可以在这里形成完整案例。",
    tags: ["Projects", "Research", "Case studies"],
  },
  {
    number: "02",
    title: "Field notes",
    titleZh: "笔记与思考",
    description: "用简洁的文章记录学习路径、方法总结，以及值得再次翻阅的想法。",
    tags: ["Notes", "Reading", "Ideas"],
  },
  {
    number: "03",
    title: "Curriculum vitae",
    titleZh: "个人履历",
    description: "教育经历、技能、奖项与实践经验将被整理成一页清晰、可下载的履历。",
    tags: ["Education", "Skills", "CV"],
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="返回首页">
          <span>RG</span>
          <i />
        </a>
        <nav aria-label="主要导航">
          <a href="#profile">Profile</a>
          <a href="#space">Space</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-mail" href="mailto:gaoruohan@wust.edu.cn">
          Say hello <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" />
            Wuhan · China
          </div>
          <h1>
            Rayan
            <br />
            <span>Gao.</span>
          </h1>
          <p className="hero-intro">
            武汉科技大学在读。
            <br />
            这是一个持续生长的个人空间，
            <br />
            用来收藏作品、学习与思考。
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#space">
              Explore the space <span aria-hidden="true">↓</span>
            </a>
            <a className="button button-quiet" href="mailto:gaoruohan@wust.edu.cn">
              Email me <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hero-art" aria-label="Rayan Gao 个人档案卡片">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-card">
            <div className="card-topline">
              <span>Personal archive</span>
              <span>2026—</span>
            </div>
            <div className="monogram">RG</div>
            <div className="card-footer">
              <div>
                <strong>Rayan Gao</strong>
                <span>Student at WUST</span>
              </div>
              <span className="card-index">A—01</span>
            </div>
          </div>
          <div className="mini-note note-one">
            <span>STATUS</span>
            <strong>Building in public</strong>
          </div>
          <div className="mini-note note-two" aria-hidden="true">
            <span>✦</span>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span>Scroll to discover</span>
          <i />
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>
          <span>Curiosity</span><b>✦</b>
          <span>Clarity</span><b>✦</b>
          <span>Craft</span><b>✦</b>
          <span>Curiosity</span><b>✦</b>
          <span>Clarity</span><b>✦</b>
          <span>Craft</span><b>✦</b>
        </div>
      </div>

      <section className="section profile-section" id="profile">
        <div className="section-label">
          <span>01</span>
          <p>Profile / 个人简介</p>
        </div>
        <div className="profile-grid">
          <div className="profile-statement">
            <p className="kicker">Nice to meet you.</p>
            <h2>
              I&apos;m building this site
              <br />
              <em>one honest piece</em> at a time.
            </h2>
          </div>
          <div className="profile-copy">
            <p>
              你好，我是 Rayan Gao。目前就读于武汉科技大学。这个网站不会用虚构的经历把页面填满，
              而会随着真实的项目、兴趣和成长轨迹逐步完善。
            </p>
            <p>
              第一版先搭好清晰、易维护的内容框架。以后无论加入项目案例、学术经历、个人简历，
              还是长篇文章，都能自然延展，不需要推翻重做。
            </p>
            <a
              className="text-link"
              href="https://www.wust.edu.cn/"
              target="_blank"
              rel="noreferrer"
            >
              Wuhan University of Science and Technology <span>↗</span>
            </a>
          </div>
        </div>

        <div className="fact-grid">
          <article className="fact-card fact-card-blue">
            <span className="fact-number">01</span>
            <p>Current chapter</p>
            <h3>武汉科技大学</h3>
            <small>Wuhan University of Science and Technology</small>
          </article>
          <article className="fact-card">
            <span className="fact-number">02</span>
            <p>Based in</p>
            <h3>Wuhan, China</h3>
            <small>30.5928° N · 114.3055° E</small>
          </article>
          <article className="fact-card fact-card-coral">
            <span className="fact-number">03</span>
            <p>Website mode</p>
            <h3>Growing slowly</h3>
            <small>Real work first. Details follow.</small>
          </article>
        </div>
      </section>

      <section className="section space-section" id="space">
        <div className="section-label section-label-light">
          <span>02</span>
          <p>Space / 内容空间</p>
        </div>
        <div className="space-heading">
          <h2>Reserved for work<br />worth sharing.</h2>
          <p>
            下面的三个内容模块已经准备好。你只需要陆续把材料发给我，
            它们就会从“框架”变成真正属于你的个人档案。
          </p>
        </div>
        <div className="slot-grid">
          {contentSlots.map((slot) => (
            <article className="slot-card" key={slot.number}>
              <div className="slot-head">
                <span>{slot.number}</span>
                <span className="slot-status">Awaiting content</span>
              </div>
              <div>
                <p>{slot.title}</p>
                <h3>{slot.titleZh}</h3>
                <div className="slot-rule" />
                <p className="slot-description">{slot.description}</p>
              </div>
              <ul aria-label={`${slot.titleZh} 可收录内容`}>
                {slot.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section next-section">
        <div className="section-label">
          <span>03</span>
          <p>Next / 下一步</p>
        </div>
        <div className="next-layout">
          <h2>你之后可以<br />陆续发给我</h2>
          <ol>
            <li><span>01</span><p>专业与研究方向</p><small>用来完善一句话介绍与个人简介</small></li>
            <li><span>02</span><p>2—4 个代表项目</p><small>名称、截图、链接和你做了什么</small></li>
            <li><span>03</span><p>头像或喜欢的照片</p><small>可选；现在的无照片设计也可以长期保留</small></li>
            <li><span>04</span><p>GitHub 用户名与简历</p><small>用于连接公开代码与下载入口</small></li>
          </ol>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-orb" aria-hidden="true" />
        <p className="contact-kicker">Have a thought, idea, or opportunity?</p>
        <h2>Let&apos;s start with<br />a conversation.</h2>
        <a className="email-link" href="mailto:gaoruohan@wust.edu.cn">
          gaoruohan@wust.edu.cn <span>↗</span>
        </a>
        <CopyEmail email="gaoruohan@wust.edu.cn" />
      </section>

      <footer>
        <a className="wordmark footer-mark" href="#top" aria-label="返回顶部">
          <span>RG</span><i />
        </a>
        <p>Designed for Rayan Gao · Built to keep growing.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
