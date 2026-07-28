import { spawn } from "node:child_process";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const hostname = "127.0.0.1";
const port = 3000;
const localUrl = `http://${hostname}:${port}`;
const [owner = "gaoruohan2006-beep", repository = "rayan-gao-personal-site"] =
  (process.env.GITHUB_REPOSITORY ?? "gaoruohan2006-beep/rayan-gao-personal-site").split("/");
const basePath = process.env.GITHUB_ACTIONS ? `/${repository}` : "";
const publicUrl = `https://${owner}.github.io/${repository}`;
const routes = [
  "",
  "publications",
  "talks",
  "teaching",
  "portfolio",
  "blog",
  "cv",
  "updates",
];

const server = spawn(
  process.execPath,
  [
    join("node_modules", "vinext", "dist", "cli.js"),
    "start",
    "--hostname",
    hostname,
    "--port",
    String(port),
  ],
  {
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  },
);

let serverLog = "";
server.stdout.on("data", (chunk) => {
  serverLog += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  serverLog += chunk.toString();
});

async function waitForPage(path = "") {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${localUrl}/${path}`);
      if (response.ok) return response.text();
    } catch {
      // The production server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Production server did not become ready.\n${serverLog}`);
}

try {
  await rm("_site", { recursive: true, force: true });
  await mkdir("_site", { recursive: true });
  await cp("dist/client", "_site", { recursive: true });

  let homeHtml = "";
  for (const route of routes) {
    let html = await waitForPage(route);
    html = html
      .replaceAll(`https://${hostname}:${port}`, publicUrl)
      .replaceAll(localUrl, publicUrl)
      .replaceAll("http://localhost:3000/og-academic.png", `${publicUrl}/og-academic.png`)
      .replaceAll("/assets/", `${basePath}/assets/`);

    const destination = route ? `_site/${route}` : "_site";
    await mkdir(destination, { recursive: true });
    await writeFile(`${destination}/index.html`, html, "utf8");
    if (!route) homeHtml = html;
  }

  await writeFile("_site/404.html", homeHtml, "utf8");
  await writeFile("_site/.nojekyll", "", "utf8");

  console.log(`Prepared GitHub Pages artifact for ${publicUrl}`);
} finally {
  server.kill();
}
