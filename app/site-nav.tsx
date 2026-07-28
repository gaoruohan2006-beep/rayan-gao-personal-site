"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, siteBasePath, withBasePath } from "./site-data";

export function SiteNav() {
  const pathname = usePathname();
  const localPath =
    siteBasePath && pathname.startsWith(siteBasePath)
      ? pathname.slice(siteBasePath.length) || "/"
      : pathname;

  return (
    <nav className="masthead-nav" aria-label="主要导航">
      {navItems.map((item) => {
        const active =
          item.href === "/" ? localPath === "/" : localPath.startsWith(item.href);

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={active ? "active" : undefined}
            href={withBasePath(item.href)}
            key={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
