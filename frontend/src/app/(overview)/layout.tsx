import NavLinksWrapper from "@/ui/overview/sidenavbar/nav-links-wrapper";
import SideNavFollowList from "@/ui/overview/sidenavbar/sidenav-follow-list";
import Topnav from "@/ui/overview/topnavbar/topnav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen grow flex-col md:flex-row md:overflow-hidden">
      <div className="bg-lNavColor w-1/6 min-w-[60px] max-w-[100px] flex-none">
        <NavLinksWrapper />
      </div>
      <div className="bg-rNavColor hidden w-1/5 min-w-[60px] flex-none md:block">
        <SideNavFollowList />
      </div>
      <Topnav children={children} />
    </div>
  );
}
