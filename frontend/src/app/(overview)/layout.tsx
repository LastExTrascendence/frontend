import NavLinksWrapper from "@/ui/overview/sidenavbar/nav-links-wrapper";
import SideNavFollowList from "@/ui/overview/sidenavbar/sidenav-follow-list";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="h-full w-[100px] bg-neutral-800">
        <NavLinksWrapper />
      </div>
      <div className="h-full w-[300px] bg-zinc-800">
        <SideNavFollowList />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
