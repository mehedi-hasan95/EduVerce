"use client";

import { FormGenerator } from "@/components/common/forms/form-generator";
import { LOGIN_FORM } from "@/components/common/forms/form-list";
import { LoadingButton } from "@/components/common/loading-button";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { LoginSchema } from "@/schemas/auth.schema";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    if (!isLoaded) {
      return toast("Error", { description: "Opps! Something went" });
    }
    try {
      setLoading(true);
      const signInAttempt = await signIn.create({
        identifier: values.email,
        password: values.password,
      });
      if (signInAttempt.status === "complete") {
        form.reset();
        await setActive({ session: signInAttempt.createdSessionId });
        toast("Success", { description: "Welcome back!❤️❤️" });
        setLoading(false);
        router.push("/callback/sign-in");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error: any) {
      if (error.errors[0].code === "form_identifier_not_found")
        toast("Error", {
          description: "email/password is incorrect try again 😣😣",
        });
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <h5 className="font-bold text-base text-themeTextWhite">Login</h5>
      <p className="text-themeTextGray leading-tight">
        Network with people from around the world, join groups, create your own,
        watch courses and become the best version of yourself.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {LOGIN_FORM.map((item) => (
            <FormGenerator key={item.id} {...item} form={form} />
          ))}
          {loading ? (
            <LoadingButton className="w-full" />
          ) : (
            <Button
              type="submit"
              className="w-full bg-themeDarkGray"
              variant={"outline"}
            >
              Continue <ChevronRight />
            </Button>
          )}
        </form>
      </Form>
      <div className="my-10 w-full relative">
        <div className="bg-black p-3 absolute text-themeTextGray text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          OR CONTINUE WITH
        </div>
        <Separator orientation="horizontal" className="bg-themeGray" />
      </div>
      {/* to do  */}
      <p className="flex justify-end gap-2">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default SignIn;
