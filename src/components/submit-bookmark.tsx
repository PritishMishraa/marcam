"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { Bookmark } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ThreeDotsLoader } from "./three-dots-loader";
import { createBookmark } from "@/apis/dashboard-apis";

const formSchema = z.object({
  url: z
    .string()
    .refine((value) => value.startsWith("https://leetcode.com/discuss/"), {
      message: "URL must start with 'https://leetcode.com/discuss/'",
    }),
});

export default function SubmitBookmark() {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return await createBookmark(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmark"],
      });
      form.reset();
      toast.success("Bookmark created successfully!");
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await mutation.mutateAsync(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 mb-4"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="font-mono placeholder:text-slate-400 overflow-auto"
                  placeholder="https://leetcode.com/discuss/interview-question/123456/your-question"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Enter a valid LeetCode Disccus URL
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full font-medium items-baseline" type="submit">
          {mutation.isPending ? <ThreeDotsLoader /> : <Bookmark />}
        </Button>
      </form>
    </Form>
  );
}
