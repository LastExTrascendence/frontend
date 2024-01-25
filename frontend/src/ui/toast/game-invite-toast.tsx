"use client";

import { useRouter } from "next/navigation";
import PillButton from "../pill-button";

export default function GameInviteToast({
  hostNickname,
  url,
}: {
  hostNickname: string;
  url: string;
}) {
  const router = useRouter();
  const [pathname, query] = url.split("?");

  let name: string | null = "";
  if (query) {
    const params = new URLSearchParams(query);
    if (params.has("name")) {
      name = params.get("name");
    }
  }
  return (
    <div className="flex flex-col">
      <div className="text-lg text-white">
        <span style={{ color: "var(--main-purple)" }}>{hostNickname}</span> 님께서 당신을
        <span style={{ color: "var(--main-purple)" }}>{name}</span> 으로 초대했습니다.
      </div>

      <div className="flex flex-row mt-2">
        <PillButton
          width="50%"
          height="100%"
          fontSize="1.2rem"
          fontStyle="italic"
          fontWeight="800"
          text="거절"
          theme="white"
          onClick={() => { }}
        />

        <PillButton
          width="50%"
          height="100%"
          fontSize="1.2rem"
          fontStyle="italic"
          fontWeight="800"
          text="수락"
          theme="purple"
          onClick={() => {
            router.push(url);
          }} />
      </div>
    </div>
  );
}