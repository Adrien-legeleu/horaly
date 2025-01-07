"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name"),
      }),
    });

    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      ref.current?.reset();
      router.push("/login");
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <form
        ref={ref}
        action={handleSubmit}
        className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 border border-black rounded bg-white"
      >
        {error && <div className="text-red-500">{error}</div>}
        <h1 className="mb-5 text-2xl font-bold">Register</h1>

        <label className="w-full">Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 border border-black rounded"
        />

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
          Sign up
        </button>

        <div className="w-full mt-4">
          <p>Or sign up with:</p>
          <button
            onClick={() => signIn("google")}
            className="w-full py-2 mt-2 text-white bg-red-500 rounded"
          >
            Google
          </button>
        </div>

        <Link
          href="/login"
          className="mt-4 text-sm text-gray-500 hover:underline"
        >
          Already have an account? Sign in
        </Link>
      </form>
    </section>
  );
}
