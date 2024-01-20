"use client";

import { useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";
import { useChannelSocket } from "@/components/ChannelSocketProvider";

import ChannelChat from "@/ui/overview/channel/channel-chat";
import ChannelInfo from "@/ui/overview/channel/channel-info";

import useChannelHandler from "@/hooks/useChannelHandler";

export default function Page({ params }: { params: { id: string } }) {
  const myInfo = useRecoilValue(myState);
  const { setChannelId, setUserId } = useChannelSocket();

  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  useChannelHandler(myInfo.id, params.id, setUserId, setChannelId);

  return (
    <div className="m-12 flex max-h-[1833px] min-h-[400px] w-full min-w-[400px] flex-row content-center items-start">
      <ChannelChat name={name} myInfo={myInfo} />
      <ChannelInfo name={name} myInfo={myInfo} />
    </div>
  );
}
