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
import { onCreatePost } from "@/actions/post";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/common/loading-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  channelId: string;
  onCloseModal: () => void;
};
export const PostContent = ({ channelId, onCloseModal }: Props) => {
  const router = useRouter();
  const query = useQueryClient();
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

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-post"],
    mutationFn: async (values: z.infer<typeof createPostSchema>) =>
      onCreatePost(
        channelId,
        values.title!,
        onDescription!,
        onHtmlDescription!,
        JSON.stringify(onJsonDescription)
      ),

    onSuccess: (data) => {
      toast(data.status === 200 ? "Success" : "Error", {
        description: data.message,
      });
      onCloseModal();
      router.refresh();
    },
    onSettled: async () => {
      return await query.invalidateQueries({
        queryKey: ["channel-infinity-scroll"],
      });
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createPostSchema>) {
    mutate(values);
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
        {isPending ? (
          <LoadingButton />
        ) : (
          <Button variant={"outline"} type="submit">
            Create
          </Button>
        )}
      </form>
    </Form>
  );
};
