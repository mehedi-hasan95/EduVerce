import { useLikeChannelPost } from "@/hooks/channel";
import { cn } from "@/lib/utils";
import { Heart, MessageCircle, ThumbsUp } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
type InteractionsProps = {
  id: string;
  optimisitc?: boolean;
  userid?: string;
  likedUser?: string;
  likes: number;
  comments: number;
  likeid?: string;
  page?: boolean;
};

export const Interactions = ({
  id,
  optimisitc,
  userid,
  likedUser,
  likes,
  comments,
  likeid,
  page,
}: InteractionsProps) => {
  const { mutate, isPending } = useLikeChannelPost(id);
  return (
    <div
      className={cn(
        "flex items-center justify-between py-2",
        page ? "" : "px-6"
      )}
    >
      <div className="flex gap-5 text-[#757272] text-sm">
        <span className="flex gap-1 justify-center items-center">
          {optimisitc ? (
            <ThumbsUp className="h-5 w-5" />
          ) : isPending ? (
            <span className="cursor-pointer">
              {userid === likedUser ? (
                <ThumbsUp className="h-5 w-5" />
              ) : (
                <ThumbsUp className="fill-red-600 h-5 w-5" />
              )}
            </span>
          ) : likedUser === userid ? (
            <span
              onClick={() =>
                mutate({
                  likeid: likeid!,
                })
              }
              className="cursor-pointer"
            >
              <ThumbsUp className="fill-red-600 h-5 w-5" />
            </span>
          ) : (
            <span
              className="cursor-pointer"
              onClick={() =>
                mutate({
                  likeid: uuidv4(),
                })
              }
            >
              <ThumbsUp className="h-5 w-5" />
            </span>
          )}
          {isPending ? (likedUser === userid ? likes - 1 : likes + 1) : likes}
        </span>

        <span className="flex gap-1 justify-center items-center">
          <MessageCircle className="h-5 w-5" />
          {comments}
        </span>
      </div>
    </div>
  );
};
