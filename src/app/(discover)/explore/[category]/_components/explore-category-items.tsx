"use client";
import { onGetAllGroup } from "@/actions/group";
import SkeletonType from "@/components/common/skeleton-type";

import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { GroupStateProps } from "@/zustand/search-slice";
import { GroupCard } from "../../_components/group-card";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { descLength } from "@/lib/utils";
import { NoResult } from "@/components/common/no-result";

type Props = {
  category: string;
};
export const ExploreCategoryItems = ({ category }: Props) => {
  const LIMIT = 6;

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["groups-infinity-scroll"],
    queryFn: ({ pageParam = 1 }) => onGetAllGroup(pageParam, LIMIT, category),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });
  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>error...</div>;

  const groupLengh = data?.pages.flatMap((page) => page.groups) ?? [];

  return groupLengh[0]?.id ? (
    <>
      <InfiniteScroll
        dataLength={groupLengh.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<SkeletonType element="POST" />}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
          {groupLengh.map(
            (item) =>
              item != undefined && (
                <Card key={item.id}>
                  <CardHeader>
                    <Image
                      src={item?.thumbnail ? item.thumbnail : "/no-preview.jpg"}
                      alt=""
                      height={300}
                      width={300}
                      className="w-full opacity-70 aspect-video"
                    />
                  </CardHeader>
                  <div className="p-6">
                    <h3 className="text-lg text-themeTextGray font-bold">
                      {item?.name}
                    </h3>
                    <p className="text-base text-themeTextGray">
                      {item?.description && descLength(item.description, 200)}
                    </p>
                  </div>
                </Card>
              )
          )}
        </div>
      </InfiniteScroll>
    </>
  ) : (
    <NoResult />
  );
};
