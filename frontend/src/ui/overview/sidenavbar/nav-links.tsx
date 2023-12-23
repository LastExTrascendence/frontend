"use client";

import {
  HomeIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/mainpage", icon: HomeIcon },
  { name: "Game", href: "/game", icon: FireIcon },
  { name: "Channel", href: "/channel", icon: ChatBubbleOvalLeftEllipsisIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-[32px] p-3 text-sm hover:bg-gray-100 hover:text-gray-700 md:flex-none md:justify-start md:p-2 md:px-3 ",
              {
                "h-20 w-20 rounded-[32px] border-black border-opacity-50 bg-neutral-700":
                  pathname === link.href,
              },
            )}
          >
            <div className="flex h-full w-full flex-col items-center justify-center">
              <LinkIcon className="h-6 w-6" />
              <p className="hidden flex-col items-center justify-center text-sm md:block">
                {link.name}
              </p>
            </div>
          </Link>
        );
      })}
    </>
  );
}
