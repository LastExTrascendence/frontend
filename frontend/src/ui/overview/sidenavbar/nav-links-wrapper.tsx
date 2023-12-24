import NavLinks from "@/ui/overview/sidenavbar/nav-links";
import NavLogo from "./nav-links-logo";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import LogoutIcon from "@/ui/icon/logout-icon";
// import { signOut } from '@/auth';

export default function NavLinksWrapper() {
  return (
    <div className="flex h-full w-full flex-row px-5 py-2 md:flex-col md:px-2 md:py-6 ">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLogo />
        <NavLinks />

        <div className="h-auto w-auto grow"></div>

        {/* md이하 dm 가능? */}
        <button className="flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-[32px] p-3 text-sm hover:bg-gray-100 hover:text-gray-700 md:hidden md:flex-none md:justify-start md:p-2 md:px-3">
          <EnvelopeIcon className="w-6" />
        </button>
        <form /*action={async () => {
          'use seEnveloperver';
          await signOut();
        }}*/
        >
          <LogoutIcon />
        </form>
      </div>
    </div>
  );
}
