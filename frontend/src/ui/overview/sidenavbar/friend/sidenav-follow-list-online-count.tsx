import { FollowlistProps } from "@/lib/definitions";

function SidenavFollowListOnlineCount({
  followList = [],
}: {
  followList: FollowlistProps[];
}) {
  const onlinePerTotal = followList.filter(
    (person: FollowlistProps) => person.online,
  ).length;

  return (
    <p className="flex min-h-[50px] w-full min-w-[60px] flex-shrink-0 items-center justify-start border-b-2 border-neutral-600 text-2xl font-normal text-white">
      Online ({onlinePerTotal}/{followList.length})
    </p>
  );
}

export default SidenavFollowListOnlineCount;
