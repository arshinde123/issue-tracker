"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const path = usePathname();
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues/list",
    },
  ];

  const showActiveLink = (href: string) => {
    if (path === "/" && href === "/") return true;
    if (path !== "/" && href !== "/" && path.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classNames({
                "text-zinc-900 bg-slate-100 rounded px-5 py-2": showActiveLink(
                  link.href
                ),
                "text-zinc-500": showActiveLink(link.href),
                "hover:text-zinc-800 transition-all": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
