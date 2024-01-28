export default function banUser(
  socket: any,
  title: string,
  myId: number,
  userNickname: string,
) {
  // console.log("ban user");
  socket.emit("banUser", { title, userId: myId, banNick: userNickname });
}
