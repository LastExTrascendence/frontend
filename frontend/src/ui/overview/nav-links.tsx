'use client'

import {
  HomeIcon,
  ChevronDoubleUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  FireIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/mainpage', icon: HomeIcon },
  { name: 'Quick', href: '/quickstart', icon: ChevronDoubleUpIcon },
  { name: 'Chat', href: '/chat', icon: ChatBubbleOvalLeftEllipsisIcon },
  { name: 'Game', href: '/game', icon: FireIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <>
          <div className="w-[223px] h-[46px] relative md:flex-none">
    <div className="w-[219px] h-[42px] left-[4px] top-[4px] absolute bg-teal-300 rounded hidden md:block " />
    <div className="w-[218px] h-[42px] left-0 top-0 absolute bg-pink-600 rounded hidden md:block" />
          <Link
            key={link.name}
            href={link.href}
            className={clsx("flex md:w-[214px] h-[38px] md:left-[4px] md:top-[4px] md:absolute bg-white rounded-tl rounded-br grow items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
            {'bg-sky-100 text-blue-600' : pathname === link.href},)}
            >
            
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
            {/* <div className="w-[214px] h-[38px] left-[4px] top-[4px] absolute bg-white rounded-tl rounded-br" /> */}
          {/* <Link
            key={link.name}
            href={link.href}
            className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ",
            {'bg-sky-100 text-blue-600' : pathname === link.href},)}
          >
            
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link> */}
</div>
          </>
        );
      })}
    </>
  );
}
