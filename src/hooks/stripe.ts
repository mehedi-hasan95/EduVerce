import { loadStripe } from "@stripe/stripe-js";

export const useStripElements = () => {
  const StripePromise = async () =>
    await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY as string);

  return { StripePromise };
};
