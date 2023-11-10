"use client";
import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { MenubarItem } from "./ui/menubar";

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };

  return (
    <MenubarItem
      className="flex w-full justify-between text-xs"
      onClick={handleSignOut}
    >
      <LogOut className="h-4 w-4 mr-1" />
      Sign Out
    </MenubarItem>
  );
}
