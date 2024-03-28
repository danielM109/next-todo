"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Link } from "@nextui-org/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMessage(error.message);
    } else {
      router.refresh();
    }
  };

  return (
    <>
      {errorMessage && <p className="bg-red-700 p-4">{errorMessage}</p>}
      <form className="relative p-4 flex flex-col gap-4">
        <label className="grid">
          Email
          <input
            className="p-2 text-black"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label className="grid">
          Password
          <input
            className="p-2 text-black"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        {/* <button
          className="bg-gray-800 p-2"
          type="button"
          onClick={handleSignUp}
        >
          Sign up
        </button> */}
        <button
          className="bg-green-700 p-2 text-white"
          type="button"
          onClick={handleSignIn}
        >
          Sign in
        </button>
      </form>
      <div className="p-4 text-center mb-1" >
        <div>
          Do not have an account?
        </div>
        <div className=" text-center text-green-800" >
          <Link href={'/signup'}>Sign Up</Link> 
        </div>
      </div>
    </>
  );
} 