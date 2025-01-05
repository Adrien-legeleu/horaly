"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SignIn({
  createAdmin,
}: {
  createAdmin: (email: string) => void;
}) {
  const handleSignIn = async () => {
    const res = await signIn("github");

    if (res?.ok) {
      try {
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();

        if (sessionRes.ok && sessionData?.user?.email) {
          createAdmin(sessionData.user.email);
        } else {
          console.error("Erreur: Utilisateur non authentifié");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la session:", error);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSignIn();
      }}
    >
      <Button variant={"destructive"} type="submit">
        Se connecter
      </Button>
    </form>
  );
}
