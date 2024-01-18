"use client";

import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useSocket } from "@/components/SocketProvider";

import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";

export default function GameInvite({ nickname }: { nickname: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const { socket, isConnected } = useSocket();
  const iconColor = "var(--light-gray)";
  const myInfo = useRecoilValue(myState);

  const handleInviteClick = () => {
    const currentUrl = `${pathname}?${searchParams}`

    console.log("gameInvite", { userId: myInfo.id, inviteUserNick: nickname, url: currentUrl });
    if (isConnected && socket) {
      socket.emit("gameInvite", { userId: myInfo.id, inviteUserNick: nickname, url: currentUrl });
    }
  };

  return (
    <Image
      src={"/tabletennis.svg"}
      width={40}
      height={40}
      alt="invite game"
      style={{ fill: iconColor }}
      onClick={handleInviteClick}
    />
  );
}
