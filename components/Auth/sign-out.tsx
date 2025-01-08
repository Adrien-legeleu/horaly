"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignOut() {
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du formulaire
        await signOut({ redirect: false }).then(() => {
          router.push("/");
        });
      }}
    >
      <Button variant={"destructive"} type="submit">
        Se déconnecter
      </Button>
    </form>
  );
}
