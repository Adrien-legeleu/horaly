"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [error, setError] = useState<string>();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      setError(res.error as string);
    } else {
      router.push("/");
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <form
        className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 border border-black rounded bg-white"
        onSubmit={handleSubmit}
      >
        {error && <div className="text-red-500">{error}</div>}
        <h1 className="mb-5 text-2xl font-bold">Sign In</h1>

        <label className="w-full">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border border-black rounded"
        />

        <label className="w-full">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border border-black rounded"
        />

        <button className="w-full py-2 mt-4 text-white bg-black rounded">
          Sign in
        </button>

        <div className="w-full mt-4">
          <p>Or sign in with:</p>
          <button
            onClick={() => signIn("google")}
            className="w-full py-2 mt-2 text-white bg-red-500 rounded"
          >
            Google
          </button>
          <button
            onClick={() => signIn("github")}
            className="w-full py-2 mt-2 text-white bg-gray-800 rounded"
          >
            GitHub
          </button>
        </div>

        <Link
          href="/register"
          className="mt-4 text-sm text-gray-500 hover:underline"
        >
          Don't have an account? Sign up
        </Link>
      </form>
    </section>
  );
}
