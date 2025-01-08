"use client";
import Landing from "@/components/Landing/Landing";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  // const { status } = useSession();
  // const router = useRouter();

  // const showSession = () => {
  //   if (status === "authenticated") {
  //     return (
  //       <button
  //         className="border border-solid border-black rounded"
  //         onClick={() => {
  //           signOut({ redirect: false }).then(() => {
  //             router.push("/");
  //           });
  //         }}
  //       >
  //         Sign Out
  //       </button>
  //     );
  //   } else if (status === "loading") {
  //     return <span className="text-[#888] text-sm mt-7">Loading...</span>;
  //   } else {
  //     return (

  //     );
  //   }
  // };
  return (
    <div className="h-full">
      <Landing />
    </div>
  );
}
