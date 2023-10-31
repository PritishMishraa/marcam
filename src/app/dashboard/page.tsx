import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SubmitBookmark from "@/components/submit-bookmark";

const links = [
  { url: "https://example.com", text: "Example Website" },
  { url: "https://example2.com", text: "Another Example" },
  { url: "https://example3.com", text: "One More Example" },
  {
    url: "https://leetcode.com/discuss/general-discussion/352724/suggestion-bookmark-post",
    text: "Suggestion Bookmark Post",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-2xl w-full">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Dashboard
        </h1>
        <SubmitBookmark />
        <div>
          <div className="flex items-center rounded-md rounded-b-none border border-b-0 border-input bg-background py-2 px-4">
            <div className="flex-grow font-medium text-2xl text-blue-500 hover:underline">
              Suggestion Bookmark Post
            </div>
            <Button className="bg-red-100 hover:bg-red-200 rounded-full p-3">
              <Trash2 className="text-red-500 h-5 w-5" />
            </Button>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>12 Links found in the post.</AccordionTrigger>
              <AccordionContent>
                <Separator />
                <ul className="flex flex-col space-y-2 px-6 py-2">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        className="text-blue-500 hover:underline"
                      >
                        - {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
