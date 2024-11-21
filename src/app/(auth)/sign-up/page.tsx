"use client";

import { FormGenerator } from "@/components/common/forms/form-generator";
import { REGISTER_FORM } from "@/components/common/forms/form-list";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { RegisterSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignUp = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      userRole: "USER",
      password: "",
      cPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="relative">
      <div className="text-center">
        <h5 className="font-bold text-base text-themeTextWhite">Sign Up</h5>
        <p className="text-themeTextGray leading-tight">
          Network with people from around the world, join groups, create your
          own, watch courses and become the best version of yourself.
        </p>
      </div>
      <div className="z-50 pt-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {REGISTER_FORM.map((item) => (
              <FormGenerator key={item.id} {...item} form={form} />
            ))}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <div className="my-10 w-full relative">
        <div className="bg-black p-3 absolute text-themeTextGray text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          OR CONTINUE WITH
        </div>
        <Separator orientation="horizontal" className="bg-themeGray" />
      </div>
      <Menu className="h-6 w-6" />
      {/* to do  */}
      <p className="flex justify-end gap-2">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-blue-500">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
