import Link from "next/link";
import Image from "next/image";

export default function NavLinksWrapper() {
  return (
    <Link
      className="bg-black-300 mb-2 hidden h-20 items-end justify-center rounded-md p-4 md:block md:h-16"
      href="/"
    >
      <Image
        src="/LET.svg"
        alt="LET Logo"
        className="dark:invert"
        width={120}
        height={24}
        priority
      />
    </Link>
  );
}
