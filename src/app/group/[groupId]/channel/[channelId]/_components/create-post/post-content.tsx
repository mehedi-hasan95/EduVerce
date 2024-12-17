"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCrateChannelPost } from "@/hooks/channel";
import { createPostSchema } from "@/schemas/schemas";
import Editor from "@/components/common/editor/editor";
import { useTransition } from "react";
import { onCreatePost } from "@/actions/post";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/common/loading-button";

export const PostContent = ({ channelId }: { channelId: string }) => {
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();
  const {
    onDescription,
    onHtmlDescription,
    onJsonDescription,
    setJsonDescription,
    setOnDescription,
    setOnHtmlDescription,
  } = useCrateChannelPost(channelId);
  // 1. Define your form.
  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: undefined,
      htmlContent: undefined,
      jsonContent: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createPostSchema>) {
    startTransaction(() => {
      onCreatePost(
        channelId,
        values.title!,
        onDescription!,
        onHtmlDescription!,
        JSON.stringify(onJsonDescription)
      ).then((data) => {
        toast(data.status === 200 ? "Success" : "Error", {
          description: data.message,
        });
        router.refresh();
      });
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="write your post"
                  {...field}
                  className="border-none focus-visible:ring-0 !text-2xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Editor
                  disabled={isPending}
                  content={onJsonDescription}
                  max={10000}
                  min={5}
                  setContent={setJsonDescription}
                  setTextContent={setOnDescription}
                  textContent={onDescription}
                  htmlContent={onHtmlDescription}
                  setHtmlContent={setOnHtmlDescription}
                  inline
                  onEdit
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isPending ? <LoadingButton /> : <Button type="submit">Create</Button>}
      </form>
    </Form>
  );
};
