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
    ["cv", "个人简历", "Curriculum Vitae"],
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
  assert.match(html, /武汉科技大学/);
  assert.match(html, /Wuhan University of Science and Technology/);
  assert.doesNotMatch(html, /gaoruohan@wust\.edu\.cn/);
  assert.doesNotMatch(html, /18186067758/);
  assert.doesNotMatch(html, /ifhighcold0620/);
  assert.match(html, /复制手机号/);
  assert.match(html, /复制小红书号/);
  assert.match(html, /复制抖音号/);
  assert.match(html, /复制邮箱/);
  assert.match(html, /Copy RedNote ID/);
  assert.match(html, /Copy TikTok ID/);
  assert.doesNotMatch(html, /Rayan_G/);
  assert.match(html, /gaoruohan2006-beep/);
  assert.match(html, /统计学/);
  assert.match(html, /碳排放时滞性/);
  assert.doesNotMatch(html, /Lorem ipsum|John Doe|Example University/i);
});

test("publishes the resume and competition papers with preview and download links", async () => {
  const portfolioHtml = await (await render("/portfolio")).text();
  const cvHtml = await (await render("/cv")).text();

  assert.match(portfolioHtml, /2025-cumcm-nipt\.pdf#view=FitH/);
  assert.match(portfolioHtml, /2026-mathorcup-hyperlipidemia\.pdf#view=FitH/);
  assert.match(portfolioHtml, /队长，负责建模与代码实现/);
  assert.match(portfolioHtml, /竞赛、课题研究与课程项目作品/);
  assert.doesNotMatch(portfolioHtml, /以下作品均为团队竞赛成果/);
  assert.doesNotMatch(portfolioHtml, /已加水印|Watermarked/);
  assert.match(cvHtml, /rayan-gao-cv\.pdf#view=FitH/);
  assert.match(cvHtml, /Click to copy RedNote ID/);
  assert.match(cvHtml, /Click to copy TikTok ID/);
  assert.doesNotMatch(cvHtml, /教育经历|Research & Coursework|已加水印|Watermarked/);
  assert.match(cvHtml, /download/);

  const assets = [
    "../public/avatar-rayan.jpg",
    "../public/docs/rayan-gao-cv.pdf",
    "../public/docs/2025-cumcm-nipt.pdf",
    "../public/docs/2026-mathorcup-hyperlipidemia.pdf",
  ];

  for (const asset of assets) {
    const info = await stat(new URL(asset, import.meta.url));
    assert.ok(info.size > 100_000, asset);
  }
});

test("publishes the update history and live visitor map", async () => {
  const html = await (await render("/updates")).text();

  assert.match(html, /新增维护日志与访客地图/);
  assert.match(html, /修正访客统计数据链路/);
  assert.match(html, /网站框架建立/);
  assert.match(html, /2026\.07\.28/);
  assert.match(html, /最近 24 小时访客/);
  assert.match(html, /红点表示访客所在城市的近似位置/);
  assert.match(html, /visitor-map-card/);
  assert.match(html, /feed-pulse\.com/);
  assert.doesNotMatch(html, /Demo ·|演示数据|水印|Watermarked/);
});
