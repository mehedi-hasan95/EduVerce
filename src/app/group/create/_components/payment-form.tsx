"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
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
import { CreateGroupSchema } from "@/schemas/schemas";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY_MENUS } from "@/constants/menus";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  onGetStripeClientSecret,
  onTransferCommission,
} from "@/actions/stripe";
import { useState } from "react";
import { StripeCardElement } from "@stripe/stripe-js";
import { toast } from "sonner";
import { onCreateNewGroup } from "@/actions/group";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoadingButton } from "@/components/common/loading-button";

type Props = {
  userId: string;
  affiliate: boolean;
  stripeId?: string;
};
export const PaymentForm = ({ affiliate, userId, stripeId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateGroupSchema>>({
    resolver: zodResolver(CreateGroupSchema),
    defaultValues: {
      name: "",
      category: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CreateGroupSchema>) {
    try {
      setIsLoading(true);
      const data = await onGetStripeClientSecret();
      if (!stripe || !elements || !data) {
        return null;
      }
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.secret!,
        {
          payment_method: {
            card: elements.getElement(CardElement) as StripeCardElement,
          },
        }
      );
      if (error) {
        return toast("Error", {
          description: "Oops! something went wrong, try again later",
        });
      }
      if (paymentIntent?.status === "succeeded") {
        if (affiliate) {
          await onTransferCommission(stripeId!);
        }
        const createGroup = await onCreateNewGroup(userId, values);
        if (createGroup.status === 200) {
          toast("Success", { description: createGroup.message });
          router.push(
            `/group/${createGroup.group?.group[0].id}/channel/${createGroup.group?.group[0].channel[0].id}`
          );
        }
        if (createGroup.status !== 200) {
          form.reset();
          toast("Error", { description: createGroup.message });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="pt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. EduVerse" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Group Category</FormLabel>
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="max-w-2xl"
                >
                  <CarouselContent>
                    {CATEGORY_MENUS.map((item) => (
                      <CarouselItem key={item.id} className="basis-auto">
                        <Card
                          className={cn(
                            "bg-themeGray border-themeGray bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-60 p-1 md:flex hidden rounded-xl",
                            form.getValues("category") === item.path &&
                              "bg-[#09090B] border-[#27272A] rounded-2xl"
                          )}
                        >
                          <CardContent className="flex gap-2 p-0">
                            <FormControl>
                              <Label htmlFor={item.id}>
                                <Input
                                  placeholder="e.g. EduVerse"
                                  {...field}
                                  id={item.id}
                                  type="radio"
                                  value={item.path}
                                  className="hidden"
                                />
                                <div
                                  className={cn(
                                    "flex gap-1 items-center cursor-pointer px-3"
                                  )}
                                >
                                  <item.icon className="h-5 w-5" /> {item.label}
                                </div>
                              </Label>
                            </FormControl>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <FormMessage />
              </FormItem>
            )}
          />
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#B4B0AE",
                  "::placeholder": {
                    color: "#B4B0AE",
                  },
                },
              },
            }}
            className="bg-themeBlack border-[1px] border-themeGray outline-none rounded-lg p-3"
          />
          <div className="px-7 flex flex-col gap-5">
            <p className="text-sm text-themeTextGray">
              Cancel anytime with 1-click. By clicking below, you accept
              our terms.
            </p>
            <Link className="text-sm text-themeTextGray" href={"/explore"}>
              Skip for now
            </Link>
          </div>
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button
              variant={"outline"}
              className="bg-themeGray hover:bg-themeBlack border-themeGray"
              type="submit"
            >
              Create Group
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
