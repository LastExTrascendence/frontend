import NavLinksWrapper from "@/ui/overview/nav-links-wrapper";
import SideNavFollowList from "@/ui/overview/sidenav-follow-list";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-[100px] h-full bg-neutral-800">
        <NavLinksWrapper />
      </div>
      <div className="w-[300px] h-full bg-zinc-800">
        <SideNavFollowList />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
