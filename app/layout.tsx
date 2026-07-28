import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const base = host ? `${protocol}://${host}` : "https://rayan-gao.site";
  const ogImage = `${base}/og.png`;

  return {
    title: "Rayan Gao — Personal Space",
    description:
      "Rayan Gao 的个人网站。武汉科技大学在读，记录作品、学习与思考。",
    openGraph: {
      title: "Rayan Gao — Personal Space",
      description: "A growing archive of work, learning, and ideas.",
      type: "website",
      url: base,
      images: [{ url: ogImage, width: 1734, height: 907, alt: "Rayan Gao" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rayan Gao — Personal Space",
      description: "A growing archive of work, learning, and ideas.",
      images: [ogImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
