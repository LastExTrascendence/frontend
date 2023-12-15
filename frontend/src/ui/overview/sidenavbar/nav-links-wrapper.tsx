import NavLinks from "@/ui/overview/sidenavbar/nav-links";
import NavLogo from "./nav-links-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
// import { signOut } from '@/auth';

export default function NavLinksWrapper() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 ">
      <NavLogo />
      <div className=" flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form /*action={async () => {
          'use server';
          await signOut();
        }}*/
        >
          <button className="flex h-20 w-full grow flex-col items-center justify-center gap-2 rounded-[32px] p-3 text-sm font-medium hover:bg-gray-100 hover:text-gray-700 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">LogOut</div>
          </button>
        </form>
      </div>
    </div>
  );
}
