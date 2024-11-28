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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { CreateChannelSchema } from "@/schemas/schemas";
import { v4 } from "uuid";
import { LoadingButton } from "@/components/common/loading-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createChannelIcon } from "@/constants/channel";
import Image from "next/image";
import { useChannelHooks } from "@/hooks/channel";

type Props = {
  buttonTrigger: React.ReactElement;
  groupId: string;
};
export function ChannelCreateModal({ buttonTrigger, groupId }: Props) {
  const { isPending, mutate } = useChannelHooks(groupId);
  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateChannelSchema>>({
    resolver: zodResolver(CreateChannelSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreateChannelSchema>) {
    const id = v4();
    mutate({ id, name: values.name, icon: values.icon });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{buttonTrigger}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-none">
        <DialogHeader>
          <DialogTitle>Create a Channel</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Event" {...field} />
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
                  <FormLabel>Channel Icon</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an Icon" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {createChannelIcon.map((item) => (
                        <SelectItem key={item.id} value={item.value}>
                          <Image
                            src={item.value}
                            alt=""
                            height={20}
                            width={20}
                          />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                {isPending ? (
                  <LoadingButton />
                ) : (
                  <Button
                    className="bg-themeGray hover:bg-themeBlack"
                    variant={"outline"}
                    type="submit"
                  >
                    Submit
                  </Button>
                )}
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
