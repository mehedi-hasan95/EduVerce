"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { GlassModal } from "@/components/common/glass-modal";
import { Card, CardContent } from "@/components/ui/card";
import { BadgePlus } from "lucide-react";
import { createCourseSchema } from "@/schemas/schemas";
import { FormGenerator } from "@/components/common/forms/form-generator";
import { COURSE_PRIVACY } from "@prisma/client";
import { useState, useTransition } from "react";
import { UploadFile } from "@/lib/file-upload";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { onCreateGroupCourse } from "@/actions/course";
import { toast } from "sonner";
import { LoadingButton } from "@/components/common/loading-button";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  groupId: string;
};
export const CourseCreate = ({ groupId }: Props) => {
  const [isPending, startTransaction] = useTransition();
  const [inImage, setInImage] = useState<string | "">("");
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof createCourseSchema>>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      name: "",
      description: "",
      thumbnail: "",
      privacy: COURSE_PRIVACY.OPEN,
      published: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createCourseSchema>) {
    startTransaction(() => {
      onCreateGroupCourse(groupId, values).then((data) =>
        toast(data.status === 200 ? "Success" : "Error", {
          description: data.message,
        })
      );
      form.reset();
      router.refresh();
    });
  }
  return (
    <GlassModal
      title="Add new course"
      description="Add new course for your community"
      trigger={
        <Card className="flex justify-center border-dashed border-themeTextGray bg-transparent cursor-pointer">
          <CardContent className="flex justify-center items-center py-10 px-16 gap-2">
            <BadgePlus />
            <p>Add New Course</p>
          </CardContent>
        </Card>
      }
    >
      <ScrollArea className="h-full w-full rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormGenerator
              form={form}
              inputType="input"
              name="name"
              label="Course Name"
              id="1"
              placeholder="e.g. Next.js"
              type="text"
              disabled={isPending}
            />
            <FormGenerator
              form={form}
              inputType="textarea"
              name="description"
              label="Course Description"
              id="2"
              placeholder="e.g. Next.js"
              type="text"
              disabled={isPending}
            />
            <FormField
              control={form.control}
              name="thumbnail"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Image</FormLabel>
                  {inImage && (
                    <Image src={inImage} alt="" height={200} width={200} />
                  )}
                  <FormControl>
                    <UploadFile
                      endPoint="courseImage"
                      onChange={(url) => {
                        field.onChange(url);
                        setInImage(url ? url : "");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                <FormItem className="space-y-3 border p-5">
                  <FormLabel>Course Permissions</FormLabel>
                  <FormControl>
                    <RadioGroup
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex gap-4">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={COURSE_PRIVACY.OPEN} />
                          </FormControl>
                          <FormLabel className="font-normal">Open</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={COURSE_PRIVACY.PRIVATE} />
                          </FormControl>
                          <FormLabel className="font-normal">Private</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value={COURSE_PRIVACY.LAVEL_UNLOCK}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Lavel Unlock
                          </FormLabel>
                        </FormItem>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Publish Course</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {isPending ? (
              <LoadingButton />
            ) : (
              <DialogClose asChild>
                <Button type="submit" variant={"outline"}>
                  Submit
                </Button>
              </DialogClose>
            )}
          </form>
        </Form>
      </ScrollArea>
    </GlassModal>
  );
};
