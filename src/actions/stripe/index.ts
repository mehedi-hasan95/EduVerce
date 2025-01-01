"use server";

import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { onGetUserDetails } from "../auth";

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

export const onGetGroupSubscriptionPaymentIntent = async (groupid: string) => {
  try {
    const price = await db.subscription.findFirst({
      where: {
        groupId: groupid,
        active: true,
      },
      select: {
        price: true,
        Group: {
          select: {
            User: {
              select: {
                stripeId: true,
              },
            },
          },
        },
      },
    });

    if (price && price.price) {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: price.price * 100,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      if (paymentIntent) {
        return { secret: paymentIntent.client_secret };
      }
    }
  } catch (error) {
    return { status: 400, message: "Failed to load form" };
  }
};

export const onGetStripeIntegration = async () => {
  try {
    const user = await onGetUserDetails();
    const stripeId = await db.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        stripeId: true,
      },
    });

    if (stripeId) {
      return stripeId.stripeId;
    }
  } catch (error) {
    console.log(error);
  }
};
