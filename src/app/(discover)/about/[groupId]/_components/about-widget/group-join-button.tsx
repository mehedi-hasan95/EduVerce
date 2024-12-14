"use client";

import { GlassModal } from "@/components/common/glass-modal";
import { StripeElements } from "@/components/common/stripe/stripe-elements";
import { Button } from "@/components/ui/button";
import { useActiveGroupSubscription, useJoinFreeGroup } from "@/hooks/payment";
import { GroupJoinForm } from "./group-join-form";

type Props = {
  groupOwner: boolean;
  groupId: string;
};
export const GroupJoinButton = ({ groupId, groupOwner }: Props) => {
  const { data } = useActiveGroupSubscription(groupId);
  const { onJoinFreeGroup } = useJoinFreeGroup(groupId);
  if (groupOwner) {
    return (
      <Button disabled={groupOwner} className="w-full mt-5" variant="outline">
        Group Owner
      </Button>
    );
  }

  if (!groupOwner) {
    if (data?.status === 200) {
      return (
        <GlassModal
          description="Pay now to join this community"
          title="Join this group"
          trigger={
            <Button className="w-full mt-5" variant="ghost">
              <p>Join ${data?.subscription?.price}/Month</p>
            </Button>
          }
        >
          <StripeElements>
            <GroupJoinForm groupId={groupId} />
          </StripeElements>
        </GlassModal>
      );
    }
  }
  return (
    <Button onClick={onJoinFreeGroup} className="w-full mt-5" variant="outline">
      Join now
    </Button>
  );
};
