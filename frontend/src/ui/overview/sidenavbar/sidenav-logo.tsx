import Link from "next/link";
import Image from "next/image";

export default function SideNavLogo() {
  return (
    <Link href="/" className="relative items-center justify-center rounded-md">
      <Image
        src="/LET_logo.svg"
        alt="LET Logo"
        width={60}
        height={60}
        priority
      />
    </Link>
  );
}
