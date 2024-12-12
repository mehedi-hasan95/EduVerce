"use client";
import InfiniteScrollObserver from "@/components/common/infinite-scroll";
import { Loader } from "@/components/common/loader";
import { NoResult } from "@/components/common/no-result";
import PaginatedGroups from "./paginated-groups";
import { GroupCard } from "./group-card";
import { GroupStateProps } from "@/zustand/search-slice";

type Props = {
  searching: boolean;
  data: GroupStateProps[];
  query?: string;
};
export const SearchedGroup = ({ data, searching, query }: Props) => {
  return (
    <div className="container grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 mt-5 md:mt-8">
      <Loader loading={searching} className="lg:col-span-3 md:col-span-2">
        {data.length > 0 ? (
          data.map((item) => <GroupCard item={item} key={item.id} />)
        ) : (
          <NoResult />
        )}
      </Loader>
      {data.length > 5 && (
        <InfiniteScrollObserver
          action="GROUPS"
          identifier={query as string}
          paginate={data.length}
          search
        >
          <PaginatedGroups />
        </InfiniteScrollObserver>
      )}
    </div>
  );
};
