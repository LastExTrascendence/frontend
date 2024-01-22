import { useRouter } from "next/navigation";
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

export default function ChannelList({
  chats,
}: {
  chats: ChannelListResponseDto;
}) {
  if (chats === undefined) return <LoadingAnimation />;

  const router = useRouter();

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
                router.push(`/channel/${chat.id}?name=${chat.title}`);
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
    </ChannelListContainerStyled>
  );
}
