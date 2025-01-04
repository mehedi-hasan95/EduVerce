"use client";

import { useAllComment, useReply } from "@/hooks/channel";
import { UserComment } from "./user-comment";

type Props = {
  postId: string;
};
export const PostComment = ({ postId }: Props) => {
  const { data } = useAllComment(postId);
  const { onReply, onSetReply, onSetActiveComment, activeComment } = useReply();
  return (
    <div className="pt-5">
      {data?.comments && data.status === 200 ? (
        data.comments.map((comment) => (
          <UserComment
            content={comment.content}
            id={comment.id}
            image={
              comment.user.image
                ? comment.user.image
                : "https://github.com/shadcn.png"
            }
            postId={comment.postId}
            username={comment.user.firstName}
            key={comment.id}
            onReply={() => onSetReply(comment.id)}
            replyCount={comment._count.reply}
            activeComment={activeComment}
            onActiveComment={() => onSetActiveComment(comment.id)}
            commentId={comment.commentId}
            replied={comment.replied}
            reply={onReply}
          />
        ))
      ) : (
        <p className="text-themeGray">No Comments</p>
      )}
    </div>
  );
};
