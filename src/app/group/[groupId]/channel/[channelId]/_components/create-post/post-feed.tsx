"use client";
import { HtmlParser } from "@/components/common/html-parser";
import { Card, CardContent } from "@/components/ui/card";
import { useChannelPage } from "@/hooks/channel";
import { PostAuthor } from "./post-author";

type Props = {
  userId: string;
  channelId: string;
};
export const PostFeed = ({ channelId, userId }: Props) => {
  const { data } = useChannelPage(channelId);

  return (
    <div className="mt-5">
      {data?.channelInfo?.posts.length ? (
        data?.channelInfo?.posts.map((item) => (
          <Card
            key={item.id}
            className="first-letter:rounded-2xl overflow-hidden"
          >
            <CardContent className="pt-3">
              <PostAuthor
                channel={data.channelInfo.name}
                image={
                  item?.author?.image
                    ? item?.author?.image
                    : "https://github.com/shadcn.png"
                }
                username={item.author.firstName}
              />
              <h2 className="text-2xl pt-5">{item.title}</h2>
              <HtmlParser html={item.htmlContent!} />
            </CardContent>
          </Card>
        ))
      ) : (
        <>No post in this channel</>
      )}
    </div>
  );
};
