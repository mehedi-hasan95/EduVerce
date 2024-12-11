import { onGetAllGroup } from "@/actions/group";
import SkeletonType from "@/components/common/skeleton-type";

import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { GroupCard } from "./group-card";
import { GroupStateProps } from "@/zustand/search-slice";
export const InfinityGroups = () => {
  const LIMIT = 6;

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["groups-infinity-scroll"],
    queryFn: ({ pageParam = 1 }) => onGetAllGroup(pageParam, LIMIT),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });
  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>error...</div>;

  const groupLengh = data?.pages.flatMap((page) => page.groups) ?? [];
  return (
    <InfiniteScroll
      dataLength={groupLengh.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<SkeletonType element="POST" />}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
        {groupLengh.map((item) => (
          <GroupCard item={item as GroupStateProps} key={item?.id} />
        ))}
      </div>
    </InfiniteScroll>
  );
};
