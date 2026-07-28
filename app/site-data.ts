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
  { label: "About", href: "/" },
  { label: "Publications", href: "/publications/" },
  { label: "Talks", href: "/talks/" },
  { label: "Teaching", href: "/teaching/" },
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Blog Posts", href: "/blog/" },
  { label: "CV", href: "/cv/" },
] as const;

export const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";

export function withBasePath(path: string) {
  return `${siteBasePath}${path}`;
}
