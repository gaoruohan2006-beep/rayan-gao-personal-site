import assert from "node:assert/strict";
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
});

test("renders every academic section with both complete language variants", async () => {
  const routes = [
    ["publications", "论文成果", "Publications"],
    ["talks", "报告与演讲", "Talks"],
    ["teaching", "教学与指导", "Teaching"],
    ["portfolio", "项目作品", "Portfolio"],
    ["blog", "文章与笔记", "Blog Posts"],
    ["cv", "个人简历", "Curriculum Vitae"],
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
  assert.match(html, /Rayan Gao/);
  assert.match(html, /武汉科技大学/);
  assert.match(html, /Wuhan University of Science and Technology/);
  assert.match(html, /gaoruohan@wust\.edu\.cn/);
  assert.match(html, /gaoruohan2006-beep/);
  assert.doesNotMatch(html, /Lorem ipsum|John Doe|Example University/i);
});
