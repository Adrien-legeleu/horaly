import { authConfig } from "@/auth";
import { getServerSession } from "next-auth"; // Import correct pour ta version

export const getAuthSession = () => {
  return getServerSession(authConfig);
};

export const getRequiredAuthSession = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    throw new Error("session not found");
  }
  return session;
};
