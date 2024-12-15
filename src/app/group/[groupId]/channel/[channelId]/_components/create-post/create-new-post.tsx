"use client";
import { GlassModal } from "@/components/common/glass-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { useChannelPage } from "@/hooks/channel";
import { PostContent } from "./post-content";

type Props = {
  userImage: string;
  userName: string;
  channelId: string;
};
export const CreateNewPost = ({ channelId, userImage, userName }: Props) => {
  const { data, mutation } = useChannelPage(channelId);
  const { name } = data?.channelInfo as { name: string };
  return (
    <>
      <GlassModal
        trigger={
          <span>
            <Card className="border-themeGray cursor-pointer first-letter:rounded-2xl overflow-hidden">
              <CardContent className="p-3 bg-[#1A1A1D] flex gap-x-6 items-center ">
                <Avatar className="cursor-pointer">
                  <AvatarImage src={userImage} alt="user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <CardDescription className="text-themeTextGray">
                  Type / to add elements to your post...
                </CardDescription>
              </CardContent>
            </Card>
          </span>
        }
        description=""
        title={`Posting in > ${name}`}
      >
        <PostContent channelId={channelId} />
      </GlassModal>
    </>
  );
};
