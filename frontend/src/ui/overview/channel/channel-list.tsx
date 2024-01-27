"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";
import LoadingAnimation from "@/ui/loading-animation";
import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";
import { ChannelListResponseDto } from "@/types/interface/channel.interface";
import {
  CellHeaderStyled,
  CellStyled,
  ChannelListContainerStyled,
  RowStyled,
  TableBody,
  TableHeader,
} from "../game/game-list";
import PrivateChannelModal from "@/components/Modals/PrivateChannelModal/PrivateChannelModal";
import { ChannelPolicy } from "@/types/enum/channel.enum";

export default function ChannelList({
  chats,
}: {
  chats: ChannelListResponseDto;
}) {
  const router = useRouter();
  const myInfo = useRecoilValue(myState);
  const [channelId, setChannelId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [showPrivateChannelModal, setShowPrivateChannelModal] =
    useState<boolean>(false);

  if (chats === undefined) return <LoadingAnimation />;

  const togglePrivateChannelModal = () => {
    setShowPrivateChannelModal(!showPrivateChannelModal);
  }

  const handleClosePrivateChannelModal = () => {
    setShowPrivateChannelModal(false);
  }

  function channelEnterLogic(channelId, channelTitle, channelType) {
    setChannelId(channelId);
    setTitle(channelTitle);

    if (channelType === ChannelPolicy.PRIVATE) {
      togglePrivateChannelModal();
    } else {
      router.push(`/channel/${channelId}?name=${channelTitle}&type=${channelType}`);
    }
  };

  return (
    <ChannelListContainerStyled>
      <TableHeader>
        <CellHeaderStyled>Channel</CellHeaderStyled>
        <CellHeaderStyled>Creator</CellHeaderStyled>
        <CellHeaderStyled>Users</CellHeaderStyled>
        <CellHeaderStyled>Type</CellHeaderStyled>
      </TableHeader>
      <TableBody>
        {chats !== STATUS_400_BAD_REQUEST ? (
          chats.map((chat: any) => (
            <RowStyled
              key={chat.id}
              onClick={() => {
                channelEnterLogic(chat.id, chat.title, chat.channelPolicy);
                // router.push(`/channel/${chat.id}?name=${chat.title}`);
              }}
              className="channel"
            >
              <CellStyled>{chat.title}</CellStyled>
              <CellStyled className="align-center">
                {chat.creator.nickname}
              </CellStyled>
              <CellStyled className="align-center">
                {chat.curUser}/{chat.maxUser}
              </CellStyled>
              <CellStyled className="align-center">
                {chat.channelPolicy.toLowerCase()}
              </CellStyled>
            </RowStyled>
          ))
        ) : (
          <div className="flex justify-center items-center h-full w-full text-xl">
            <div>채널을 생성해주세요!</div>
          </div>
        )}
      </TableBody>
      {showPrivateChannelModal && (
        <PrivateChannelModal closeModal={handleClosePrivateChannelModal} channelId={channelId} myInfoId={myInfo.id} title={title} />
      )}
    </ChannelListContainerStyled>
  );
}
