"use server";

import { stripe } from "@/lib/stripe";

export const onGetStripeClientSecret = async () => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: 9900,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    if (paymentIntent) {
      return { secret: paymentIntent.client_secret };
    }
  } catch (error) {
    console.error(error);
    return { status: 400, message: "Failed to load form" };
  }
};

export const onTransferCommission = async (id: string) => {
  try {
    const transfer = await stripe.transfers.create({
      amount: 3960,
      currency: "usd",
      destination: id,
    });
    if (transfer) {
      return { status: 200 };
    }
  } catch (error) {
    console.error(error);
    return { status: 400 };
  }
};
