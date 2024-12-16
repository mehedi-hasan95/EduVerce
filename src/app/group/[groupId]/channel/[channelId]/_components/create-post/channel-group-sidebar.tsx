"use client";
import GlassCard from "@/components/common/glass-card";
import { CardContent, CardHeader } from "@/components/ui/card";
import { useGroupInfo } from "@/hooks/groups";
import { descLength } from "@/lib/utils";
import Image from "next/image";

type Props = {
  groupId: string;
};
export const ChannelGroupSidebar = ({ groupId }: Props) => {
  const { groupInfo } = useGroupInfo();
  return (
    <div className="lg:sticky lg:top-5 mt-10 lg:mt-0 rounded-xl overflow-hidden">
      <GlassCard>
        <CardHeader>
          <Image
            src={
              groupInfo?.thumbnail ? groupInfo?.thumbnail : "/no-preview.jpg"
            }
            alt="group info"
            height={300}
            width={300}
            className="h-auto w-full"
          />
        </CardHeader>
        <CardContent>
          <h2 className="text-xl md:text-2xl font-bold">{groupInfo.name}</h2>
          {groupInfo?.description && (
            <p>{descLength(groupInfo?.description, 150)}</p>
          )}
        </CardContent>
      </GlassCard>
    </div>
  );
};
