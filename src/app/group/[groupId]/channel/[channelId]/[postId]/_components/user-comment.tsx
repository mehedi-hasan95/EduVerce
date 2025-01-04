import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { MessageCircleMore, User } from "lucide-react";

type Props = {
  image: string;
  username: string;
  content: string;
  optimistic?: boolean;
  onReply?(): void;
  reply?: { comment?: string; reply: boolean };
  id: string;
  postId: string;
  replyCount?: number;
  commentid?: string | null;
  replied?: boolean | null;
  activeComment?: string;
  onActiveComment?(): void;
  noReply?: boolean;
};
export const UserComment = ({
  image,
  username,
  content,
  optimistic,
  onReply,
  reply,
  id,
  postId,
  replyCount,
  activeComment,
  onActiveComment,
  noReply,
}: Props) => {
  return (
    <div className={cn("flex gap-x-3", optimistic ? "opacity-50" : "")}>
      <div className="flex flex-col gap-y-1">
        <Avatar>
          <AvatarImage src={image} alt="user" />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <Separator
          orientation="vertical"
          className="flex-1 h-0 self-center bg-themeGray"
        />
      </div>
      <div className="flex flex-col items-start mt-2 w-full pb-5 gap-y-2">
        <h3 className="font-semibold text-sm">{username}</h3>
        <p className="font-light text-sm">{content}</p>
        {!noReply && (
          <span
            {...(!optimistic && {
              onClick: onReply,
            })}
            className="flex items-center cursor-pointer text-themeTextGray text-xs gap-x-1"
          >
            <MessageCircleMore />
            Reply
          </span>
        )}
      </div>
    </div>
  );
};
