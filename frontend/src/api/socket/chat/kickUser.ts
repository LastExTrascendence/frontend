export default function kickUser(
  socket: any,
  title: string,
  myId: number,
  userNickname: string,
) {
  // console.log("kick user");
  socket.emit("kickUser", { title, userId: myId, kickNick: userNickname });
}
