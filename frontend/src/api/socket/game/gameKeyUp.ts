
export default function gameKeyUp(
  // gameId: number,
  socket,
  team: string,
  key: string,
) {
  if (!socket) return;
  console.log("keyUp", "team", team, "key", key);
  socket.emit(`keyUp${team}`, {
    // gameId,
    key,
  });
}
