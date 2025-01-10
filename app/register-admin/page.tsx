"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { registerAdmin } from "@/action/register-admin";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState<string>();
  const handleSubmit = async (formData: FormData) => {
    if (!session?.user?.email) {
      setError("L'email utilisateur est introuvable.");
      return;
    }
    const res = await registerAdmin({
      email: session.user.email,
      code: formData.get("code") as string,
    });
    if (res?.error) {
      setError(res.error);
      return;
    } else {
      return router.push("/dashboard");
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
          Connectez-vous à Horaly
        </h2>
        <p className="text-neutral-600 text-center text-sm max-w-sm mt-2 dark:text-neutral-300">
          Entrez vos identifiants pour accéder à votre compte.
        </p>

        <form className="my-8" action={handleSubmit}>
          {error && <div className="text-red-500">{error}</div>}

          <LabelInputContainer>
            <Input
              id="code"
              placeholder="Code administrateur"
              type="text"
              required
              name="code"
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br mt-5 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            devenir Administrateur
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <Link
            href="/"
            className="text-center w-full inline-block text-sm text-gray-500 hover:underline"
          >
            revenir à la page principale
          </Link>
        </form>
      </div>
    </div>
  );
}
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
