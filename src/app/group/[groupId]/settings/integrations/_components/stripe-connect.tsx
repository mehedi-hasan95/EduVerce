import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

type Props = {
  connected: boolean;
  groupId: string;
};
export const StripeConnect = ({ connected, groupId }: Props) => {
  return (
    <DialogClose>
      <Button>{connected ? "Disconnect" : "Connect"}</Button>
    </DialogClose>
  );
};
