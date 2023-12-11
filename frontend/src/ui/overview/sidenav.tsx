import Link from "next/link";
import NavLinks from "@/ui/overview/nav-links";
import LETLogo from "@/ui/let-logo";
import Image from "next/image";
import { PowerIcon } from "@heroicons/react/24/outline";
// import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-center rounded-md bg-black-300 p-4 md:h-16"
        href="/"
      >
        <Image src="/LET.svg" alt="LET Logo" width={120} height={24} priority />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form /*action={async () => {
          'use server';
          await signOut();
        }}*/
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
