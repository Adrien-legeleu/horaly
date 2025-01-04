"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function SignOut() {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du formulaire
        await signOut();
      }}
    >
      <Button variant={"destructive"} type="submit">
        Se déconnecter
      </Button>
    </form>
  );
}
