
export default function gameKeyDown(
  // gameId: number,
  socket,
  team: string,
  key: string,
) {
  if (!socket) return;
  console.log("keyDown", "team", team, "key", key);
  socket.emit("keyDown", {
    // gameId,
    team,
    key,
  });
}
