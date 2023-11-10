import { Button } from "./ui/button";
import { Github, Star, Twitter } from "lucide-react";

import {
  Menubar,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarSeparator,
} from "@/components/ui/menubar";
import SignOut from "./sign-out";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function SiteFooter() {
  const session = await getServerSession(authOptions);

  return (
    <footer className="my-8">
      <div className="flex items-center justify-center gap-4">
        {session?.user && (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session?.user?.image || ""} />
                  <AvatarFallback>FU</AvatarFallback>
                </Avatar>
              </MenubarTrigger>
              <MenubarContent>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://github.com/PritishMishraa/marcam"
                >
                  <MenubarItem className="flex w-full justify-between text-xs">
                    <Star className="h-4 w-4 mr-1" />
                    Star on GitHub
                  </MenubarItem>
                </a>
                <MenubarSeparator />
                <SignOut />
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        )}
        <a href="https://twitter.com/PritishhMishraa" target="_blank">
          <Button variant="outline" size="icon">
            <Twitter className="h-[1rem] w-[1rem]" />
          </Button>
        </a>
        <a href="https://github.com/PritishMishraa" target="_blank">
          <Button variant="outline" size="icon">
            <Github className="h-[1rem] w-[1rem]" />
          </Button>
        </a>
      </div>
    </footer>
  );
}
