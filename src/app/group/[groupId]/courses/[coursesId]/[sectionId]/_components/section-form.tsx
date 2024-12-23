"use client";

import { onGetSectionInfo } from "@/actions/course";
import { useChannelSection } from "@/hooks/channel";
import { useQuery } from "@tanstack/react-query";
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
import { courseContentSchema } from "@/schemas/schemas";
import Editor from "@/components/common/editor/editor";
import { LoadingButton } from "@/components/common/loading-button";
import { HtmlParser } from "@/components/common/html-parser";
type Props = {
  groupOwner: boolean | undefined;
  sectionId: string;
};
export const SectionForm = ({ groupOwner, sectionId }: Props) => {
  const { data } = useQuery({
    queryKey: ["section-info"],
    queryFn: () => onGetSectionInfo(sectionId),
  });

  const {
    setOnDescription,
    onDescription,
    setJsonDescription,
    onJsonDescription,
    onEditDescription,
    editor,
    onHtmlDescription,
    setOnHtmlDescription,
    mutate,
    isPending,
  } = useChannelSection(
    sectionId,
    data?.section?.content || null,
    data?.section?.JsonContent || null,
    data?.section?.htmlContent || null
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof courseContentSchema>>({
    resolver: zodResolver(courseContentSchema),
    defaultValues: {
      content: undefined,
      htmlcontent: undefined,
      jsoncontent: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit() {
    mutate({
      content: onDescription,
      htmlcontent: onHtmlDescription,
      jsoncontent: JSON.stringify(onJsonDescription),
    });
  }
  return (
    <div>
      {groupOwner ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-10"
            ref={editor}
          >
            <FormField
              control={form.control}
              name="jsoncontent"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor
                      onEdit={onEditDescription}
                      max={10000}
                      inline
                      min={5}
                      disabled={groupOwner ? false : true}
                      textContent={onDescription}
                      content={JSON.parse(data?.section?.JsonContent as string)}
                      setContent={setJsonDescription}
                      setTextContent={setOnDescription}
                      htmlContent={
                        data?.section?.htmlContent as string | undefined
                      }
                      setHtmlContent={setOnHtmlDescription}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {onEditDescription &&
              (isPending ? (
                <LoadingButton />
              ) : (
                <Button type="submit" variant={"outline"}>
                  Update
                </Button>
              ))}
          </form>
        </Form>
      ) : (
        <HtmlParser html={data?.section?.htmlContent || ""} />
      )}
    </div>
  );
};
