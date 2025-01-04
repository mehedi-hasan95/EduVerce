"use client";

import { useAllComment } from "@/hooks/channel";
import { UserComment } from "./user-comment";

type Props = {
  postId: string;
};
export const PostComment = ({ postId }: Props) => {
  const { data } = useAllComment(postId);
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
            optimistic
            key={comment.id}
          />
        ))
      ) : (
        <p className="text-themeGray">No Comments</p>
      )}
    </div>
  );
};
