"use client";

import Image from "next/image";
import { useRecoilValue } from "recoil";
import { myState } from "@/utils/myState";

export default function SideNavFollowListMe() {
  const me = useRecoilValue(myState);

  if (!me) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[101px] w-[300px] flex-shrink-0 bg-neutral-800 shadow">
      <div className="flex h-[90px] flex-row items-center justify-center">
        <div className="relative h-[60px] w-[60px] shadow">
          <div className="absolute left-0 top-0 inline-flex h-[60px] w-[60px] items-center justify-center">
            <Image
              className="h-[60px] w-[60px] items-center justify-center rounded-[32px] border-black border-opacity-50"
              width={60}
              height={60}
              src={me.profile}
              alt="me"
            />
          </div>
          <div className="absolute left-[40px] top-[40px] inline-flex h-5 w-5 items-center justify-center">
            <div className="relative flex h-5 w-5 flex-col items-start justify-start">
              <div className="h-5 w-5 rounded-full bg-green-400 " />
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center ">
          <p className="font-['Noto Sans KR'] text-2xl font-normal text-white">
            {me.id}
          </p>
        </div>
      </div>
    </div>
  );
}
