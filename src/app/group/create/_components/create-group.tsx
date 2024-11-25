import { StripeElements } from "@/components/common/stripe/stripe-elements";
import { PaymentForm } from "./payment-form";

type Props = {
  userId: string;
  affiliate: boolean;
  stripeId?: string;
};
export const CreateGroup = ({ affiliate, userId, stripeId }: Props) => {
  return (
    <StripeElements>
      <PaymentForm affiliate={affiliate} userId={userId} stripeId={stripeId} />
    </StripeElements>
  );
};
