"use client";
import { LinkPreview } from "@/components/ui/link-preview";
import { IconShoppingCart, IconUserCircle } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOut } from "../Auth/sign-out";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Navbar from "./Navbar";

export default function Header() {
  //   const { data: session, status } = useSession();

  //   // Gestion de l'état de chargement
  //   if (status === "loading") {
  //     return null; // Vous pouvez aussi retourner un spinner ou un placeholder
  //   }

  return (
    <>
      <Navbar />
      <div className="flex justify-center z-50 fixed top-2 right-8 items-center bg-white py-5 rounded-full px-8 gap-6 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <IconUserCircle />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <div className="text-center w-full">
                <Link href="/account">Votre compte</Link>
              </div>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <div>
                {session?.user ? (
                  <SignOut />
                ) : (
                  <Link
                    href="/login"
                    className="border border-solid border-black rounded"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
        <LinkPreview url="cart" text="Votre panier">
          <IconShoppingCart stroke={1.5} className="h-8 w-8" />
        </LinkPreview>
      </div>
    </>
  );
}
