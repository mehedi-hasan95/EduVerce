"use client";
import { onCreateNewGroupSubscription } from "@/actions/subscription";
import { FormGenerator } from "@/components/common/forms/form-generator";
import { GlassModal } from "@/components/common/glass-modal";
import { LoadingButton } from "@/components/common/loading-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  groupId: string;
};

const formSchema = z.object({
  price: z.coerce.number(),
});
export const GroupSubscriptionForm = ({ groupId }: Props) => {
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransaction(() => {
      onCreateNewGroupSubscription(groupId, values.price).then((data) =>
        toast(data?.status === 200 ? "Success" : "Error", {
          description: data?.message,
        })
      );
      router.refresh();
    });
  }
  return (
    <GlassModal
      description="Your selling price"
      title="Add Price"
      trigger={
        <Card className="border-dashed border-themeGray hover:bg-themeBlack bg-transparent cursor-pointer flex items-center">
          <CardContent className="flex justify-center items-center py-10 px-16 gap-2 w-full">
            <BadgePlus /> Add Price
          </CardContent>
        </Card>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormGenerator
            form={form}
            id="1"
            name="price"
            inputType="input"
            placeholder="e.g. $99"
          />
          {isPending ? (
            <LoadingButton />
          ) : (
            <Button type="submit" variant={"outline"}>
              Set Price
            </Button>
          )}
        </form>
      </Form>
    </GlassModal>
  );
};
