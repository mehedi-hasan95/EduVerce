"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGroupInfo } from "@/hooks/groups";
import { descLength } from "@/lib/utils";
import Image from "next/image";
import { GroupJoinButton } from "./group-join-button";

type Props = {
  groupId?: string;
  userId?: string;
};
export const AboutGroupWidget = ({ groupId, userId }: Props) => {
  const { groupInfo, groupOwner } = useGroupInfo();
  return (
    <Card className="lg:sticky top-5 mt-10 overflow-hidden">
      <CardContent className="py-3 flex flex-col gap-y-3">
        <Image
          src={groupInfo?.thumbnail ? groupInfo.thumbnail : "/no-preview.jpg"}
          alt="Group Info"
          height={500}
          width={500}
          className="h-auto w-full"
        />
        <Separator />
        {groupInfo.description && descLength(groupInfo.description, 100)}
        {groupId && (
          <GroupJoinButton groupId={groupId} groupOwner={groupOwner} />
        )}
      </CardContent>
    </Card>
  );
};
