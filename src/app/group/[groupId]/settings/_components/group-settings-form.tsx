"use client";

import { onGetGroupInfo, onUpdateGroupSettings } from "@/actions/group";
import { LoadingButton } from "@/components/common/loading-button";
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
import { GroupSettingsSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { JSONContent } from "novel";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Editor = dynamic(
  () =>
    import("@/components/common/editor/editor").then((data) => data.default),
  { ssr: false }
);
export const GroupSettingsForm = ({ groupId }: { groupId: string }) => {
  const [isPending, statrTransaction] = useTransition();
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["group-info"],
    queryFn: () => onGetGroupInfo(groupId),
  });
  const jsonContent = data?.groupInfo?.jsonDescription
    ? JSON.parse(data?.groupInfo?.jsonDescription as string)
    : undefined;

  const [onJsonDescription, setJsonDescription] = useState<
    JSONContent | undefined
  >(jsonContent);

  const [onDescription, setOnDescription] = useState<string | undefined>(
    data?.groupInfo?.description || undefined
  );
  const [htmlContent, setHtmlContent] = useState<string | undefined>(
    data?.groupInfo?.htmlDescription || undefined
  );
  const [isImage, setIsImage] = useState<string | undefined>("");
  const [isThumb, setIsThumb] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof GroupSettingsSchema>>({
    resolver: zodResolver(GroupSettingsSchema),
    defaultValues: {
      name: data?.groupInfo?.name,
      description: "",
      htmldescription: "",
      icon: "",
      jsondescription: "",
      thumbnail: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof GroupSettingsSchema>) {
    const data = {
      ...values,
      jsondescription: JSON.stringify(onJsonDescription),
      htmldescription: htmlContent,
      description: onDescription,
    };
    statrTransaction(() => {
      onUpdateGroupSettings(groupId, data, `/group/${groupId}/settings`).then(
        (data) => {
          toast(data.status === 200 ? "Success" : "Error", {
            description: data.message,
          });
          router.refresh();
        }
      );
    });
  }

  return (
    <div className="max-w-2xl mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Learn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Icon</FormLabel>
                {isImage && (
                  <Image
                    src={isImage}
                    alt=""
                    height={50}
                    width={50}
                    className="bg-themeTextGray"
                  />
                )}
                <FormControl>
                  <UploadFile
                    endPoint="chapterIcon"
                    onChange={(url) => field.onChange(url)}
                    value={setIsImage(field.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Thumbnail</FormLabel>
                {isThumb && (
                  <Image
                    src={isThumb}
                    alt=""
                    height={50}
                    width={50}
                    className="bg-themeTextGray"
                  />
                )}
                <FormControl>
                  <UploadFile
                    endPoint="chapterIcon"
                    onChange={(url) => field.onChange(url)}
                    value={setIsThumb(field.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jsondescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Description</FormLabel>

                <FormControl>
                  <Editor
                    min={5}
                    max={10000}
                    textContent={onDescription}
                    content={onJsonDescription}
                    setContent={setJsonDescription}
                    setTextContent={setOnDescription}
                    htmlContent={htmlContent}
                    setHtmlContent={setHtmlContent}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isPending ? (
            <LoadingButton />
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </form>
      </Form>
    </div>
  );
};
