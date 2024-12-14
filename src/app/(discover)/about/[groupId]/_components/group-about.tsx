"use client";
import { HtmlParser } from "@/components/common/html-parser";
import { NoResult } from "@/components/common/no-result";
import { useGroupAbout, useGroupInfo } from "@/hooks/groups";
import Image from "next/image";

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
import Editor from "@/components/common/editor/editor";
import { onUpdateGroupSettings } from "@/actions/group";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/common/loading-button";
import { MediaGallery } from "./media-gallery";

const formSchema = z.object({
  htmldescription: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  jsondescription: z
    .string()
    .min(5, {
      message: "description must have atleast 5 characters",
    })
    .optional()
    .or(z.literal("").transform(() => undefined)),
});
type Props = {
  groupId: string;
  userId: string;
};
export const GroupAbout = ({ groupId, userId }: Props) => {
  const [isPending, statrTransaction] = useTransition();
  const router = useRouter();
  const { groupInfo, groupOwner } = useGroupInfo();
  const {
    setOnDescription,
    onDescription,
    setJsonDescription,
    onJsonDescription,
    onEditDescription,
    editor,
    activeMedia,
    onSetActiveMedia,
    onHtmlDescription,
    setOnHtmlDescription,
  } = useGroupAbout(
    groupInfo.description,
    groupInfo.jsonDescription,
    groupInfo.htmlDescription,
    groupInfo.gallery[0]
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      htmldescription: "",
      jsondescription: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      jsondescription: JSON.stringify(onJsonDescription),
      htmldescription: onHtmlDescription,
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

  if (!groupInfo) {
    return <NoResult />;
  }

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h2 className="font-bold text-[56px] leading-none md:leading-normal">
          {groupInfo.name}
        </h2>
      </div>
      {groupInfo.gallery.length > 0 && (
        <div className="relative rounded-xl">
          <div className="" />
          {activeMedia?.type === "IMAGE" ? (
            <Image
              src={activeMedia.url as string}
              height={500}
              width={500}
              alt="group-img"
              className="w-full h-auto aspect-video z-20 rounded-t-xl"
            />
          ) : activeMedia?.type === "LOOM" ? (
            <div className="w-full aspect-video">
              <iframe
                src={activeMedia.url}
                allowFullScreen
                className="absolute outline-none border-0 top-0 left-0 w-full h-full rounded-t-xl"
              ></iframe>
            </div>
          ) : (
            activeMedia?.type === "YOUTUBE" && (
              <div className="w-full aspect-video relative">
                <iframe
                  className="w-full absolute top-0 left-0 h-full rounded-xl"
                  src={activeMedia.url}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            )
          )}
        </div>
      )}

      <MediaGallery
        gallery={groupInfo.gallery}
        groupOwner={groupOwner}
        groupId={groupId}
        onActive={onSetActiveMedia}
      />

      {groupOwner ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-10"
            ref={editor}
          >
            <FormField
              control={form.control}
              name="jsondescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor
                      onEdit={onEditDescription}
                      max={10000}
                      // inline
                      min={5}
                      disabled={userId === groupInfo.userId ? false : true}
                      textContent={onDescription}
                      content={onJsonDescription}
                      setContent={setJsonDescription}
                      setTextContent={setOnDescription}
                      htmlContent={
                        groupInfo.htmlDescription as string | undefined
                      }
                      setHtmlContent={setOnHtmlDescription}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isPending ? (
              <LoadingButton />
            ) : (
              <Button type="submit" variant={"outline"}>
                Update
              </Button>
            )}
          </form>
        </Form>
      ) : (
        <HtmlParser html={groupInfo.htmlDescription || ""} />
      )}
    </div>
  );
};
