import { LinkPreview } from "@/components/ui/link-preview";
import { IconShoppingCart, IconUserCircle } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOut } from "../Auth/sign-out";
import Navbar from "./Navbar";
import { getAuthSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Header() {
  const session = await getAuthSession();

  return (
    <>
      <Navbar />
      <div className="flex justify-center fixed top-2 right-5 items-center bg-white py-5 rounded-full px-8 gap-6 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconUserCircle stroke={1.5} className="w-8 h-8" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <div className="text-center w-full">
                <Link href="/account">Votre compte</Link>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div>
                {session?.user ? (
                  <SignOut /> // Utilise le composant client pour gérer la déconnexion
                ) : (
                  <Link href="/account">
                    <Button variant={"destructive"}>Se connecter</Button>
                  </Link>
                )}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <LinkPreview url="cart" text="Votre panier">
          <IconShoppingCart stroke={1.5} className="h-8 w-8" />
        </LinkPreview>
      </div>
    </>
  );
}
