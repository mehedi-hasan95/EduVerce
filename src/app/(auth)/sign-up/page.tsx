"use client";

import { onCreateAccount } from "@/actions/auth";
import { FormGenerator } from "@/components/common/forms/form-generator";
import { REGISTER_FORM } from "@/components/common/forms/form-list";
import { LoadingButton } from "@/components/common/loading-button";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { RegisterSchema } from "@/schemas/auth.schema";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Menu } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const OTPInput = dynamic(
  () => import("@/components/common/otp-input").then((data) => data.default),
  { ssr: false }
);

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [creating, setCreating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
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

  // Get the email and password for verification code
  const onGenerateCode = async (email: string, password: string) => {
    if (!isLoaded)
      return toast("Error", {
        description: "Oops! something went wrong",
      });
    try {
      setLoading(true);
      if (email && password) {
        await signUp.create({
          emailAddress: email,
          password: password,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setLoading(true);
        setVerifying(true);
      } else {
        setLoading(false);
        return toast("Error", {
          description: "Fill the required fields",
        });
      }
    } catch (error: any) {
      if (error.status === 422) {
        setLoading(false);
        return toast("Error", { description: error.errors[0].message });
      }
    }
  };

  // After the code
  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    if (!isLoaded)
      return toast("Error", { description: "Something went wrong" });
    try {
      setCreating(true);
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      console.log(signUpAttempt);
      if (signUpAttempt.status !== "complete") {
        return toast("Error", {
          description: "Oops! something went wrong",
        });
      }
      if (signUpAttempt.status === "complete") {
        if (!signUp.createdUserId) return;
        const user = await onCreateAccount({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          clerkId: signUp.createdUserId,
          image: "",
          userRole: values.userRole,
        });
        if (user.status === 200) {
          toast("Success", { description: user.message });
          await setActive({ session: signUpAttempt.createdSessionId });
          router.push(`/group/create`);
        }
        if (user.status !== 200) {
          toast("Error", {
            description: user.message,
          });
          router.refresh();
        }
        setCreating(false);
        setVerifying(false);
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        return toast("Error", { description: "Something went wrong" });
      }
    } catch (error: any) {
      setCreating(false);
      return toast("Error", { description: error.errors[0].longMessage });
    }
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
            {verifying ? (
              <div className="flex mb-5 flex-col items-center">
                <h2 className="dark:text-gradient text-2xl font-bold pb-3">
                  Add your Verification Code:
                </h2>
                <OTPInput otp={code} setOtp={setCode} />
              </div>
            ) : (
              <>
                {REGISTER_FORM.map((item) => (
                  <FormGenerator key={item.id} {...item} form={form} />
                ))}
              </>
            )}
            {verifying ? (
              <>
                {creating ? (
                  <LoadingButton />
                ) : (
                  <Button
                    disabled={creating}
                    type="submit"
                    className="rounded-2xl w-full"
                    variant={"outline"}
                  >
                    Continue <ChevronRight />
                  </Button>
                )}
              </>
            ) : (
              <>
                {loading ? (
                  <LoadingButton />
                ) : (
                  <Button
                    type="button"
                    className="rounded-2xl w-full"
                    variant={"outline"}
                    onClick={() =>
                      onGenerateCode(
                        form.getValues("email"),
                        form.getValues("password")
                      )
                    }
                  >
                    Continue <ChevronRight />
                  </Button>
                )}
              </>
            )}
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