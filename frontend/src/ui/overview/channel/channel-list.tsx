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
        <CellHeaderStyled>Channel</CellHeaderStyled>
        <CellHeaderStyled>Creator</CellHeaderStyled>
        <CellHeaderStyled>Users</CellHeaderStyled>
        <CellHeaderStyled>Type</CellHeaderStyled>
      </TableHeader>
      <TableBody>
        {chats.map((chat: any) => (
          <RowStyled key={chat.id} onClick={() => openModal(chat)}>
            <CellStyled>{chat.channel}</CellStyled>
            <CellStyled className="align-center">{chat.creator}</CellStyled>
            <CellStyled className="align-center">{chat.users}</CellStyled>
            <CellStyled className="align-center">{chat.type}</CellStyled>
          </RowStyled>
        ))}
      </TableBody>
    </ChannelListContainerStyled>
  );
}
