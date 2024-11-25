"use client";

import { Elements } from "@stripe/react-stripe-js";
import { useStripElements } from "@/hooks/stripe";

export const StripeElements = ({ children }: { children: React.ReactNode }) => {
  const { StripePromise } = useStripElements();
  const promise = StripePromise();

  return promise && <Elements stripe={promise}>{children}</Elements>;
};
