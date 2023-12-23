import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: any) {
  if (req.method === "POST") {
    console.log("req.body", req.body);
    const message = req.body;
    res?.socket?.server?.io?.emit("message", message);
    res.status(201).json(message);
  }
}
