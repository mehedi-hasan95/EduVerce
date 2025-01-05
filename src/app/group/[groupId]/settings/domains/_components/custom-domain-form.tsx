"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormGenerator } from "@/components/common/forms/form-generator";
import { useCustomDomain } from "@/hooks/groups";
import { cn } from "@/lib/utils";
import { CircleAlert, CircleCheck } from "lucide-react";

const formSchema = z.object({
  domain: z.string().min(2, {
    message: "Domain must be at least 2 characters.",
  }),
});
type Props = {
  groupId: string;
};
export const CustomDomainForm = ({ groupId }: Props) => {
  const { data, isPending, mutate } = useCustomDomain(groupId);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }
  return (
    <div className="flex flex-col gap-y-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormGenerator
            form={form}
            id="123"
            inputType="input"
            name="domain"
            label="Domain Name"
            placeholder="mehedi.com"
          />
          <Button disabled={isPending} type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <div
        className={cn(
          "flex gap-x-5 bg-themeBlack p-4 rounded-xl text-sm items-center",
          data?.status.misconfigured ? "text-red-500" : "text-white"
        )}
      >
        {data?.status.misconfigured ? (
          <CircleAlert size={20} />
        ) : (
          <CircleCheck size={20} />
        )}
        <p>
          {data?.status.misconfigured
            ? "DNS not configured correctly"
            : "DNS configured correctly"}
        </p>
      </div>
    </div>
  );
};
