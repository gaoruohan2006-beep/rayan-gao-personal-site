export const profile = {
  name: "Rayan Gao",
  role: "Student",
  school: "Wuhan University of Science and Technology",
  schoolZh: "武汉科技大学",
  location: "Wuhan, China",
  email: "gaoruohan@wust.edu.cn",
  github: "https://github.com/gaoruohan2006-beep",
} as const;

export const navItems = [
  { labelZh: "关于我", labelEn: "About", href: "/" },
  { labelZh: "论文", labelEn: "Publications", href: "/publications/" },
  { labelZh: "报告", labelEn: "Talks", href: "/talks/" },
  { labelZh: "教学", labelEn: "Teaching", href: "/teaching/" },
  { labelZh: "项目", labelEn: "Portfolio", href: "/portfolio/" },
  { labelZh: "文章", labelEn: "Blog Posts", href: "/blog/" },
  { labelZh: "简历", labelEn: "CV", href: "/cv/" },
] as const;

export const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";

export function withBasePath(path: string) {
  return `${siteBasePath}${path}`;
}
