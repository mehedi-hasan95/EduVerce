"use client";
import axios from "axios";
import {
  onGetGroupChannels,
  onGetGroupSubscriptions,
  onJoinGroup,
} from "@/actions/group";
import { onGetGroupSubscriptionPaymentIntent } from "@/actions/stripe";
import {
  onActivateSubscription,
  onGetActiveSubscription,
} from "@/actions/subscription";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useActiveGroupSubscription = (groupId: string) => {
  const { data } = useQuery({
    queryKey: ["active-subscription"],
    queryFn: () => onGetActiveSubscription(groupId),
  });

  return { data };
};

export const useJoinFreeGroup = (groupId: string) => {
  const router = useRouter();
  const onJoinFreeGroup = async () => {
    const member = await onJoinGroup(groupId);
    if (member?.status === 200) {
      const channels = await onGetGroupChannels(groupId);
      router.push(`/group/${groupId}/channel/${channels?.channels?.[0].id}`);
    }
  };

  return { onJoinFreeGroup };
};

export const useJoinGroup = (groupId: string) => {
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  const { data: Intent } = useQuery({
    queryKey: ["group-payment-intent"],
    queryFn: () => onGetGroupSubscriptionPaymentIntent(groupId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!stripe || !elements || !Intent) {
        return null;
      }
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        Intent.secret!,
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
        const member = await onJoinGroup(groupId);
        if (member?.status === 200) {
          const channels = await onGetGroupChannels(groupId);
          router.push(
            `/group/${groupId}/channel/${channels?.channels?.[0].id}`
          );
        }
      }
    },
  });

  const onPayToJoin = () => mutate();

  return { onPayToJoin, isPending };
};

export const useAllSubscriptions = (groupId: string) => {
  const { data } = useQuery({
    queryKey: ["group-subscriptions"],
    queryFn: () => onGetGroupSubscriptions(groupId),
  });

  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["group-subscriptions"],
    mutationFn: (data: { id: string }) => onActivateSubscription(data.id),
    onSuccess: (data) =>
      toast(data?.status === 200 ? "Success" : "Error", {
        description: data?.message,
      }),
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: ["group-subscriptions"],
      });
    },
  });
  return { data, mutate };
};

export const useStripeConnect = (groupId: string) => {
  const [onStripeAccountPending, setOnStripeAccountPending] =
    useState<boolean>(false);

  const onStripeConnect = async () => {
    try {
      setOnStripeAccountPending(true);
      const response = await fetch(`/api/stripe/connect?groupId=${groupId}`, {
        method: "GET",
      });
      if (response.ok) {
        const account = await response.json();
        setOnStripeAccountPending(false);
        if (account && account.url) {
          window.location.href = account.url;
        }
      } else {
        console.error("Failed to connect to Stripe:", response.statusText);
        setOnStripeAccountPending(false);
      }
    } catch (error) {
      console.error(error);
      setOnStripeAccountPending(false);
    }
  };

  return { onStripeConnect, onStripeAccountPending };
};
