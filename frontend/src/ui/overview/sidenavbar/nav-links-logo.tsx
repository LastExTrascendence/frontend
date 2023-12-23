import Link from "next/link";
import Image from "next/image";

export default function NavLinksWrapper() {
  return (
    <Link
      href="/"
      className="relative items-center justify-center rounded-md p-4"
    >
      <Image
        src="/LET_logo.svg"
        alt="LET Logo"
        layout="fill"
        objectFit="contain"
        priority
      />
    </Link>
  );
}
