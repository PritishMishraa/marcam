"use client";

import { toast } from "sonner";
import { ExternalLink, Settings, StickyNote, Trash } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { relativeTime } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import EditBookmark from "@/components/edit-bookmark";
import { Separator } from "@/components/ui/separator";
import { ThreeDotsLoader } from "@/components/three-dots-loader";
import { deleteBookmark, getBookmarks } from "@/apis/dashboard-apis";

export default function Bookmarks() {
  const queryClient = useQueryClient();

  const { isPending, isError, data } = useQuery({
    queryKey: ["bookmark"],
    queryFn: async () => {
      return (await getBookmarks()).sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await deleteBookmark({
        id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmark"],
      });
    },
  });

  if (isError) {
    return (
      <div className="mt-[92px] flex items-center justify-center">
        <p className="mb-[388px] text-slate-500">Something went wrong</p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="mt-[92px] flex items-center justify-center">
        <ThreeDotsLoader />
      </div>
    );
  }

  return (
    <>
      {data?.map((bookmark) => (
        <div
          className="flex flex-col space-y-1.5 rounded-md border bg-background shadow-md p-3 text-sm mb-4"
          key={bookmark.id}
        >
          <div className="flex flex-col gap-1.5 font-mono text-xs">
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-1.5 rounded-lg bg-blue-50 p-1 px-2 text-[0.6rem]">
                <div className="text-black">
                  {relativeTime(bookmark.createdAt)}
                </div>

                <div className="h-1 w-1 rounded-full bg-slate-500/30" />

                <a href={bookmark.url} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-3.5 w-3.5 cursor-pointer text-slate-500" />
                </a>

                <div className="h-1 w-1 rounded-full bg-slate-500/30" />

                <Menubar className="relative h-min rounded-full border-none p-0">
                  <MenubarMenu>
                    <MenubarTrigger className="bg-blue-50 p-0 focus:bg-blue-50 data-[state=open]:bg-blue-50">
                      <Settings className="h-3.5 w-3.5 cursor-pointer text-blue-600" />
                    </MenubarTrigger>
                    <MenubarContent className="absolute -right-[35px] top-0.5">
                      <EditBookmark
                        id={bookmark.id}
                        url={bookmark.url}
                        note={bookmark.note}
                        title={bookmark.title}
                      />

                      <MenubarSeparator />

                      <AlertDialog>
                        <AlertDialogTrigger className="flex h-full w-full items-center justify-between rounded-sm p-1 px-2 text-[0.675rem]">
                          <p className="text-foreground/80">Delete</p>
                          <Trash className="h-3 w-3 text-red-500" />
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-11/12 rounded-md font-mono">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-sm">
                              Do you want to delete this bookmark?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="line-clamp-2 break-all text-xs">
                              URL: {bookmark.url}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex gap-2">
                            <AlertDialogCancel className="px-8 text-xs">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 px-8 text-xs text-white"
                              onClick={() => {
                                mutation.mutate({ id: bookmark.id });
                                toast.info("Deleted");
                              }}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </div>

            {bookmark.title && (
              <p className="-mb-1 mt-0.5 text-sm font-semibold">
                {bookmark.title}
              </p>
            )}

            <p className="mt-0.5 line-clamp-2 break-all text-[0.65rem] text-foreground/70">
              {bookmark.url}
            </p>
          </div>

          {bookmark.note && (
            <>
              <Separator />
              <Accordion className="block" type="single" collapsible>
                <AccordionItem className="-my-4 !border-b-0" value="item-1">
                  <AccordionTrigger className="text-foreground/70">
                    <p className="flex items-center gap-2 font-sans text-[0.6rem] font-light text-foreground/70">
                      <StickyNote className="h-3 w-3" />
                    </p>
                  </AccordionTrigger>
                  <AccordionContent className="!p-1">
                    <Textarea
                      readOnly
                      value={bookmark.note}
                      className="resize-none cursor-default font-sans text-xs text-foreground"
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          )}
        </div>
      ))}
    </>
  );
}
