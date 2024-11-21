"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { REGISTER_FORM } from "./form-list";
import { FormGenerator } from "./form-generator";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  role: z.string(),
});

export const FormOutput = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      bio: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {REGISTER_FORM.map((item) => (
          <FormGenerator key={item.id} {...item} form={form} />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
