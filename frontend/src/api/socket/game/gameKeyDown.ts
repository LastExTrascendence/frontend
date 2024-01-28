
export default function gameKeyDown(
  // gameId: number,
  socket,
  gameId: string,
  team: string,
  key: string,
) {
  if (!socket) return;
  // console.log("keyDown", "team", team, "key", key);
  socket.emit(`keyDown${team}`, {
    gameId,
    key,
  });
}
