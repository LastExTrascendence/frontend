import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const message = req.body;
      // 여기에서 메시지 유효성 검사를 수행할 수 있습니다.

      res.socket.server.io.emit("message", message);
      res.status(201).json(message);
    } catch (error) {
      // 에러 처리 로직
      console.error(error);
      res.status(500).json({ message: "서버 에러 발생" });
    }
  } else {
    // POST 메서드가 아닌 경우에 대한 처리
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
