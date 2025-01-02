import { onGetUserDetails } from "@/actions/auth";
import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const groupId = searchParams.get("groupId");

    const account = await stripe.accounts.create({
      type: "standard",
      country: "US",
      business_type: "individual",
    });
    if (account) {
      const user = await onGetUserDetails();
      const integrateStripeAccount = await db.user.update({
        where: {
          id: user?.id,
        },
        data: {
          stripeId: account.id,
        },
      });

      if (integrateStripeAccount) {
        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: `${process.env.BASE_URL}/callback/stripe/refresh`,
          return_url: `${process.env.BASE_URL}/group/${groupId}/settings/integrations`,
          type: "account_onboarding",
        });
        return Response.json({
          url: accountLink.url,
        });
      }
    }
  } catch (error) {
    return new Response(
      "An error occurred when calling the Stripe API to create an account:"
    );
  }
}
