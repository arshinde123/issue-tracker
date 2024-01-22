"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

const NavBar = () => {
  const path = usePathname();
  const { status, data: session } = useSession();
  console.log({ session });

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
    <nav className="border-b mb-5 px-5 py-3">
      <Flex justify="between">
        <Flex align="center" gap="3">
          <Link href="/">
            <AiFillBug />
          </Link>
          <ul className="flex space-x-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className={classNames({
                    "text-zinc-900 bg-slate-100 rounded px-5 py-2":
                      showActiveLink(link.href),
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
        </Flex>
        <Box>
          {status === "authenticated" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Box>
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                  />
                </Box>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size="2">{session.user!.name}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Label>
                  <Text size="2">{session.user!.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                  <Link href="/api/auth/signout">Log Out</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </Box>
      </Flex>
    </nav>
  );
};

export default NavBar;
