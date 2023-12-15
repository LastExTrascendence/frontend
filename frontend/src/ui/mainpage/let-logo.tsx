"use client";

import Image from "next/image";
import Link from "next/link";

export function LetLogo() {
  return (
    <Link
      className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
      href="https://github.com/LastExTrascendence/frontend"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src="/LET.svg" alt="LET Logo" width={100} height={24} priority />
    </Link>
  );
}

export default LetLogo;
