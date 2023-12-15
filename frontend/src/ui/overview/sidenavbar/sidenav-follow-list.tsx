"use client";

import followlist from "./followlist-mock";
import SideNavFollowListLogo from "./sidenav-follow-list-logo";
import SideNavFollowListOnlineCount from "./sidenav-follow-list-online-count";
import SideNavFollowListFollowing from "./sidenav-follow-list-following";
import SideNavFollowListMe from "./sidenav-follow-list-me";

export default function SideNavFollowList() {
  // nextjs에서 fetch를 사용해서 follow list를 가져온다.
  // const followList = fetch();

  return (
    <div className="flex h-screen flex-col">
      <SideNavFollowListLogo />
      <SideNavFollowListOnlineCount followList={followlist} />
      <SideNavFollowListFollowing followList={followlist} />
      <SideNavFollowListMe />
    </div>
  );
}
