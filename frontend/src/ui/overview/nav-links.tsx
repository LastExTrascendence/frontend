"use client";

import {
  HomeIcon,
  ChevronDoubleUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  FireIcon,
  UserIcon,
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
          <>
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex flex-col w-20 h-20 grow items-center justify-center gap-2 p-3 text-sm hover:bg-gray-100 hover:text-gray-700 md:flex-none md:justify-start md:p-2 md:px-3 rounded-[32px] ",
                {
                  "w-20 h-20 bg-neutral-700 rounded-[32px] border-black border-opacity-50":
                    pathname === link.href,
                }
              )}
            >
              <div className="flex flex-col items-center justify-center w-full h-full">
                <LinkIcon className="w-6 h-6" />
                <p className="flex flex-col items-center justify-center hidden md:block text-sm">
                  {link.name}
                </p>
              </div>
            </Link>
          </>
        );
      })}
    </>
  );
}
