"use client";

import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export default function SignIn() {
  
  return (
    <Button
      onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      className="flex h-10 items-center rounded-md bg-slate-900 px-8 text-sm text-white"
    >
      Login
    </Button>
  );
}
