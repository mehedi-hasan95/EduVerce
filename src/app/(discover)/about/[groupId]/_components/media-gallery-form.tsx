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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadFile } from "@/lib/file-upload";
import { useTransition } from "react";
import { onUpdateGroupGallery } from "@/actions/group";
import { toast } from "sonner";
import { LoadingButton } from "@/components/common/loading-button";
import { UpdateGallerySchema } from "@/schemas/schemas";

type Props = {
  groupId: string;
};
export const MediaGalleryForm = ({ groupId }: Props) => {
  const [isPending, statrTransaction] = useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof UpdateGallerySchema>>({
    resolver: zodResolver(UpdateGallerySchema),
    defaultValues: {
      image: undefined,
      videourl: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof UpdateGallerySchema>) {
    if (values.image !== undefined) {
      statrTransaction(() => {
        onUpdateGroupGallery(groupId, values?.image as string).then((data) => {
          toast(data.status === 200 ? "Success" : "Error", {
            description: data.message,
          });
        });
      });
    }
    if (values.videourl !== undefined) {
      statrTransaction(() => {
        onUpdateGroupGallery(groupId, values.videourl as string).then(
          (data) => {
            toast(data.status === 200 ? "Success" : "Error", {
              description: data.message,
            });
          }
        );
      });
    }
    if (values.image && values.videourl !== undefined) {
      const data = [values.videourl, values.image];
      statrTransaction(() => {
        onUpdateGroupGallery(groupId, data as any).then((data) => {
          toast(data.status === 200 ? "Success" : "Error", {
            description: data.message,
          });
        });
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Image</FormLabel>
              <FormControl>
                <UploadFile
                  endPoint="chapterIcon"
                  onChange={(url) => field.onChange(url)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="videourl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Url</FormLabel>
              <FormControl>
                <Input placeholder="loom / youtube" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isPending ? (
          <LoadingButton />
        ) : (
          <Button type="submit" variant={"outline"}>
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};
