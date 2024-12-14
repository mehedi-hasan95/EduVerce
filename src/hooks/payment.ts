import { onGetGroupChannels, onJoinGroup } from "@/actions/group";
import { onGetGroupSubscriptionPaymentIntent } from "@/actions/stripe";
import { onGetActiveSubscription } from "@/actions/subscription";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useActiveGroupSubscription = (groupId: string) => {
  const { data } = useQuery({
    queryKey: ["active-subscription"],
    queryFn: () => onGetActiveSubscription(groupId),
  });

  return { data };
};

export const useJoinFreeGroup = (groupid: string) => {
  const router = useRouter();
  const onJoinFreeGroup = async () => {
    const member = await onJoinGroup(groupid);
    if (member?.status === 200) {
      const channels = await onGetGroupChannels(groupid);
      router.push(`/group/${groupid}/channel/${channels?.channels?.[0].id}`);
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
