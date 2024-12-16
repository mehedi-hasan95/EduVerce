"use client";
import { HtmlParser } from "@/components/common/html-parser";
import { Card, CardContent } from "@/components/ui/card";
import { useChannelPage } from "@/hooks/channel";
import { PostAuthor } from "./post-author";
import { useInfiniteQuery } from "@tanstack/react-query";
import { onGetChannelInfo } from "@/actions/channel";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonType from "@/components/common/skeleton-type";
import { NoResult } from "@/components/common/no-result";

type Props = {
  userId: string;
  channelId: string;
};
export const PostFeed = ({ channelId, userId }: Props) => {
  const { data } = useChannelPage(channelId);

  const LIMIT = 6;

  const {
    data: channelPosts,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["channel-infinity-scroll"],
    queryFn: ({ pageParam = 1 }) =>
      onGetChannelInfo(channelId, pageParam, LIMIT),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.hasMore ? pages.length + 1 : undefined,
  });
  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>error...</div>;

  const groupLengh =
    channelPosts.pages.flatMap((page) => page?.channelInfo?.posts) ?? [];
  if (groupLengh.length < 1) {
    return (
      <div className="pt-5">
        <NoResult />
      </div>
    );
  }
  return (
    <div className="mt-5">
      <InfiniteScroll
        dataLength={groupLengh.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<SkeletonType element="POST" />}
      >
        <div className="flex flex-col gap-y-3">
          {groupLengh.map(
            (item) =>
              item !== undefined && (
                <Card
                  key={item.id}
                  className="first-letter:rounded-2xl overflow-hidden"
                >
                  <CardContent className="pt-3">
                    <PostAuthor
                      channel={data?.channelInfo?.name as string}
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
              )
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};
