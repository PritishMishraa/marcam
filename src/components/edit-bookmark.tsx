"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateBookmark } from "@/apis/dashboard-apis";
import { ThreeDotsLoader } from "./three-dots-loader";

const formSchema = z.object({
  url: z
    .string()
    .refine((value) => value.startsWith("https://leetcode.com/discuss/"), {
      message: "URL must start with 'https://leetcode.com/discuss/'",
    }),
  title: z
    .string()
    .max(64, {
      message: "Title must be less than 64 characters",
    })
    .optional(),
  note: z
    .string()
    .max(2048, {
      message: "Note must be less than 2048 characters",
    })
    .optional(),
});

export default function EditBookmark({
  id,
  url,
  note,
  title,
}: {
  id: number;
  url: string;
  note: string | null;
  title: string | null;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url,
      title: title || "",
      note: note || "",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const res: any = await updateBookmark({
        id,
        ...values,
      });

      if (res?.error) {
        throw new Error(JSON.stringify(res?.error));
      }

      return res;
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["bookmark"],
      });
    },
    onError: (error) => {
      return toast.error(JSON.parse(error.message).message);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await mutation.mutateAsync(values);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex h-full w-full items-center justify-between rounded-sm p-1 px-2 text-[0.675rem]">
        <p className="text-foreground/80">Edit</p>
        <Pencil className="h-3 w-3 text-foreground/80" />
      </SheetTrigger>
      <SheetContent className="w-11/12 sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-sm">
            Let&apos;s edit the Bookmark
          </SheetTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-5 py-5 font-mono text-xs"
            >
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <FormLabel className="absolute -top-[9px] left-4 bg-background px-2 text-xs text-foreground/70">
                          URL
                        </FormLabel>
                        <Input
                          className="font-sans text-xs overflow-auto"
                          placeholder="https://leetcode.com/discuss/"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <FormLabel className="absolute -top-[9px] left-4 bg-background px-2 text-xs text-foreground/70">
                          Title
                        </FormLabel>
                        <Input
                          className="font-sans text-xs placeholder:text-foreground/40"
                          placeholder="The DP Approach"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <div className="relative">
                        <FormLabel className="absolute -top-[9px] left-4 bg-background px-2 text-xs text-foreground/70">
                          Note
                        </FormLabel>
                        <Textarea
                          placeholder="I learned this..."
                          className="resize-none font-sans text-xs placeholder:text-foreground/40"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">
                {mutation.isPending ? <ThreeDotsLoader /> : "Submit"}
              </Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
