import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/mongodb";

export const authConfig: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!, // Assure-toi que tu as défini ce client_id
      clientSecret: process.env.GITHUB_CLIENT_SECRET!, // Et ce client_secret
    }),
  ],
  adapter: MongoDBAdapter(client),
  callbacks: {
    async session({ session, user }: any) {
      if (user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};
