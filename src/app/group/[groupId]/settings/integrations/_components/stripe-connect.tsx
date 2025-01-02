"use client";
import { Loader } from "@/components/common/loader";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useStripeConnect } from "@/hooks/payment";

type Props = {
  connected: boolean;
  groupId: string;
};
export const StripeConnect = ({ connected, groupId }: Props) => {
  const { onStripeAccountPending, onStripeConnect } = useStripeConnect(groupId);
  return (
    <Button disabled={connected} onClick={onStripeConnect}>
      <Loader loading={onStripeAccountPending}>
        {connected ? "Connected" : "Connect to stripe"}
      </Loader>
    </Button>
  );
};
