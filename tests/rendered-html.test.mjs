import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://rayan-gao.example${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders a unified bilingual interface with Chinese as the default", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="zh-CN"[^>]*data-language="zh"/i);
  assert.match(html, /rayan-language/);
  assert.match(html, /class="language-toggle"/);
  assert.match(html, /class="lang lang-zh"/);
  assert.match(html, /class="lang lang-en"/);
  assert.match(html, />中<\/button>/);
  assert.match(html, />EN<\/button>/);
  assert.match(html, /关于我/);
  assert.match(html, /About Me/);
  assert.match(html, /我永远会向堕落的自己开枪，我因瑕疵而鲜活/);
  assert.doesNotMatch(html, /我的座右铭|My motto/);
  assert.doesNotMatch(html, /class="copy-button"/);
});

test("renders every academic section with both complete language variants", async () => {
  const routes = [
    ["publications", "论文成果", "Publications"],
    ["talks", "报告与演讲", "Talks"],
    ["teaching", "教学与指导", "Teaching"],
    ["portfolio", "项目作品", "Portfolio"],
    ["blog", "文章与笔记", "Blog Posts"],
    ["updates", "网站维护更新", "Site Updates"],
  ];

  for (const [route, chineseTitle, englishTitle] of routes) {
    const response = await render(`/${route}`);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, new RegExp(chineseTitle), route);
    assert.match(html, new RegExp(englishTitle), route);
    assert.match(html, /rayan-language/, route);
  }
});

test("keeps the public profile truthful", async () => {
  const html = await (await render("/")).text();
  assert.match(html, /高若寒/);
  assert.match(html, /Rayan Gao/);
  assert.match(html, /研究方向：组合优化、AI4s/);
  assert.match(html, /Research interests: combinatorial optimization and AI for Science \(AI4S\)\./);
  assert.doesNotMatch(html, /研究碳排放时滞性，关注数学建模与数学竞赛。/);
  assert.match(html, /武汉科技大学/);
  assert.match(html, /Wuhan University of Science and Technology/);
  assert.doesNotMatch(html, /gaoruohan@wust\.edu\.cn/);
  assert.doesNotMatch(html, /18186067758/);
  assert.doesNotMatch(html, /ifhighcold0620/);
  assert.doesNotMatch(html, /复制手机号|Copy phone number|phoneEncoded/);
  assert.match(html, /复制小红书号/);
  assert.match(html, /复制抖音号/);
  assert.match(html, /复制邮箱/);
  assert.match(html, /class="book-icon"/);
  assert.doesNotMatch(html, />小<\/dt>/);
  assert.match(html, /Copy RedNote ID/);
  assert.match(html, /Copy TikTok ID/);
  assert.doesNotMatch(html, /Rayan_G/);
  assert.match(html, /gaoruohan2006-beep/);
  assert.match(html, /统计学/);
  assert.match(html, /组合优化/);
  assert.match(html, /AI4s/);
  assert.match(html, /数学建模与竞赛/);
  assert.doesNotMatch(html, /碳排放时滞性|Carbon Emission Time Lags/);
  assert.doesNotMatch(html, /Lorem ipsum|John Doe|Example University/i);
});

test("publishes eight verified courses and the original transcript", async () => {
  const html = await (await render("/")).text();
  const coursePills = html.match(/class="course-pill"/g) ?? [];

  assert.equal(coursePills.length, 8);
  assert.match(html, /数学分析/);
  assert.match(html, /高等代数与解析几何/);
  assert.match(html, /概率论/);
  assert.match(html, /数理统计/);
  assert.match(html, /运筹学/);
  assert.match(html, /数学建模/);
  assert.match(html, /基于 Python 的专业实验与设计/);
  assert.match(html, /人工智能与科学之美/);
  assert.match(html, /wust-chinese-academic-transcript\.pdf#view=FitH/);
  assert.match(html, /武汉科技大学中文成绩单/);
  assert.match(html, /View transcript/);
  assert.match(html, /Download PDF/);

  const transcript = await stat(
    new URL("../public/docs/wust-chinese-academic-transcript.pdf", import.meta.url),
  );
  assert.equal(transcript.size, 2_797_590);
});

test("publishes competition and course-project papers without a CV section", async () => {
  const portfolioHtml = await (await render("/portfolio")).text();

  assert.match(portfolioHtml, /2025-cumcm-nipt\.pdf#view=FitH/);
  assert.match(portfolioHtml, /2026-mathorcup-hyperlipidemia\.pdf#view=FitH/);
  assert.match(portfolioHtml, /2026-neural-network-fault-diagnosis-review\.pdf#view=FitH/);
  assert.match(portfolioHtml, /课程项目作品/);
  assert.match(portfolioHtml, /复杂工况下神经网络可靠故障诊断综述/);
  assert.match(portfolioHtml, /Course Projects/);
  assert.match(portfolioHtml, /队长，负责建模与代码实现/);
  assert.match(portfolioHtml, /竞赛、课题研究与课程项目作品/);
  assert.doesNotMatch(portfolioHtml, /以下作品均为团队竞赛成果/);
  assert.doesNotMatch(portfolioHtml, /已加水印|Watermarked/);
  const cvResponse = await render("/cv");
  assert.equal(cvResponse.status, 404);

  const assets = [
    "../public/avatar-rayan.jpg",
    "../public/docs/2025-cumcm-nipt.pdf",
    "../public/docs/2026-mathorcup-hyperlipidemia.pdf",
    "../public/docs/2026-neural-network-fault-diagnosis-review.pdf",
  ];

  for (const asset of assets) {
    const info = await stat(new URL(asset, import.meta.url));
    assert.ok(info.size > 100_000, asset);
  }
});

test("publishes the update history without visitor tracking", async () => {
  const html = await (await render("/updates")).text();

  assert.match(html, /优化社交账号图标/);
  assert.match(html, /新增代表课程与成绩单/);
  assert.match(html, /新增课程项目作品/);
  assert.match(html, /更新研究方向/);
  assert.match(html, /新增网站维护日志/);
  assert.match(html, /网站框架建立/);
  assert.match(html, /2026\.07\.31/);
  assert.match(html, /2026\.07\.30/);
  assert.match(html, /2026\.07\.29/);
  assert.match(html, /2026\.07\.28/);
  assert.match(html, /dateTime="2026-07-31"/);
  assert.match(html, /更新 12/);
  assert.doesNotMatch(html, /访客地图|Visitor Map|visitor-map-card|geojs|api\/visitors/);
  assert.doesNotMatch(html, /Demo ·|演示数据|水印|Watermarked/);
});
