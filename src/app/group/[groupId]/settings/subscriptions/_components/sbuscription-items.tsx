"use client";

import { Card } from "@/components/ui/card";
import { useAllSubscriptions } from "@/hooks/payment";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export const SubscriptionItems = ({ groupId }: { groupId: string }) => {
  const { data, mutate } = useAllSubscriptions(groupId);
  return data?.subscriptions && data.status === 200 ? (
    data.subscriptions.map((item) => (
      <Card
        key={item.id}
        onClick={() => mutate({ id: item.id })}
        className={cn(
          "bg-themeBlack cursor-pointer text-themeTextGray flex flex-col gap-y-3 justify-center aspect-video items-center",
          item.active && "border-purple-800 border-2"
        )}
      >
        <h3 className="text-2xl">${item.price}/month</h3>
        <div className="flex items-center gap-x-2 text-sm">
          <User size={20} />
          <p>{data.sbuscriberCount} Members</p>
        </div>
      </Card>
    ))
  ) : (
    <></>
  );
};
