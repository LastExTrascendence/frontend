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
  openModal,
}: {
  chats: any;
  openModal: any;
}) {
  return (
    <ChannelListContainerStyled>
      <TableHeader>
        <CellHeaderStyled className="mr-4 flex-1">Channel</CellHeaderStyled>
        <CellHeaderStyled className="mr-4 flex-1">Creator</CellHeaderStyled>
        <CellHeaderStyled className="mr-4 flex-1">Users</CellHeaderStyled>
        <CellHeaderStyled className="mr-4 flex-1">Type</CellHeaderStyled>
      </TableHeader>
      <TableBody>
        {chats.map((chat: any) => (
          <RowStyled
            key={chat.id}
            // className="flex min-h-[60px] cursor-pointer flex-row items-center justify-center border-b text-sm md:text-lg"
            onClick={() => openModal(chat)}
          >
            <CellStyled className="mr-4 flex-1">{chat.channel}</CellStyled>
            <CellStyled className="mr-4 flex-1">{chat.creator}</CellStyled>
            <CellStyled className="mr-4 flex-1">{chat.users}</CellStyled>
            <CellStyled className="mr-4 flex-1">{chat.type}</CellStyled>
          </RowStyled>
        ))}
      </TableBody>
    </ChannelListContainerStyled>
  );
}
