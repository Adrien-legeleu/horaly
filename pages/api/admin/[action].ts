import { authControler } from "@/backend/controllers";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { action } = req.query;

    if (action === "check-admin-password") {
      return authControler.checkAdminPassword(req, res);
    }
    if (action === "create-admin") {
      return authControler.createAdmin(req, res);
    }
  }
  res.status(405).send({ message: "Method not allowed" });
};

export default handler;
