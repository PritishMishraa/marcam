"use client";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SubmitBookmark() {
  return (
    <div className="flex w-full items-center space-x-2">
      <Input type="text" placeholder="Link" className="my-4" />
      <Button type="submit">
        <Bookmark />
      </Button>
    </div>
  );
}
