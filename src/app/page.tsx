"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome {session?.user?.name}
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Your email is {session?.user?.email}
        </p>
        <Button onClick={() => signOut()}>
          <Github className="mr-2 h-4 w-4" /> Logout with Github
        </Button>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={() => signIn("github")}>
        <Github className="mr-2 h-4 w-4" /> Login with Github
      </Button>
    </main>
  );
}
