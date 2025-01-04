// /pages/api/auth/session.js
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";

export default async function handler(req: any, res: any) {
  const session = await getServerSession(authConfig);
  if (session) {
    return res.status(200).json(session);
  } else {
    return res.status(401).json({ message: "User not authenticated" });
  }
}
