"use client";
import { NoResult } from "@/components/common/no-result";
import { usePostInfo } from "@/hooks/channel";
import { PostAuthor } from "../../_components/create-post/post-author";
import { HtmlParser } from "@/components/common/html-parser";
import { Interactions } from "../../_components/create-post/interactions";

type Props = {
  postId: string;
  userId: string;
};
export const PostInfo = ({ postId, userId }: Props) => {
  const { data } = usePostInfo(postId);
  if (data?.status !== 200 || !data.data) {
    return <NoResult />;
  }
  return (
    <div className="flex flex-col gap-y-5">
      <PostAuthor
        channel={data.data?.channel.name}
        image={
          data?.data?.author?.image
            ? data.data.author.image
            : "https://github.com/shadcn.png"
        }
        username={data.data.author.firstName}
      />
      <div className="flex flex-col gap-y-3">
        <h2 className="text-2xl font-bold">{data.data.title}</h2>
        <HtmlParser html={data.data.htmlContent as string} />
      </div>
      <Interactions
        comments={data.data._count.comments}
        id={postId}
        likes={data.data._count.likes}
        userId={userId}
        likedUser={
          data.data && data.data?.likes.length > 0
            ? data.data.likes[0].userId
            : undefined
        }
        likeid={
          data.data && data.data?.likes.length > 0
            ? data.data.likes[0].id
            : undefined
        }
      />
    </div>
  );
};
