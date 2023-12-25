import Link from "next/link";
import Image from "next/image";
import { FollowlistProps } from "@/lib/definitions";

function SideNavFollowListFollowing({
  followList = [],
}: {
  followList: FollowlistProps[];
}) {
  return (
    <div className="flex w-full min-w-[60px] flex-grow flex-col overflow-y-scroll ">
      {followList.map((user) => (
        <Link key={user.id} href={`/user/${user.id}`}>
          <div className="flex min-h-[90px] flex-row items-center justify-center border-b-2 border-neutral-600">
            <div className="relative m-2 min-h-[60px] min-w-[60px] shadow">
              <div className="absolute left-0 top-0 inline-flex h-[60px] w-[60px] items-center justify-center">
                <Image
                  className="h-[60px] w-[60px] items-center justify-center rounded-[32px] border-black border-opacity-50"
                  width={60}
                  height={60}
                  src={user.profile}
                  alt="profile"
                />
              </div>
              <div className="absolute left-[40px] top-[40px] inline-flex h-5 w-5 items-center justify-center">
                <div className="relative flex h-5 w-5 flex-col items-start justify-start">
                  <div
                    className={`h-5 w-5 rounded-full ${
                      user.online ? "bg-green-400" : "bg-yellow-400"
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-start overflow-hidden ">
              <p className="font-['Noto Sans KR'] text-2xl font-normal text-white">
                {user.id}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SideNavFollowListFollowing;
