"use client";
import InfiniteScrollObserver from "@/components/common/infinite-scroll";
import { Loader } from "@/components/common/loader";
import { NoResult } from "@/components/common/no-result";
import { Card } from "@/components/ui/card";
import { truncateString } from "@/lib/utils";
import { GroupStateProps } from "@/redux/slice/search-slice";
import Image from "next/image";
import Link from "next/link";
import PaginatedGroups from "./paginated-groups";
import { GroupCard } from "./group-card";

type Props = {
  searching: boolean;
  data: GroupStateProps[];
  query?: string;
};
export const SearchedGroup = ({ data, searching, query }: Props) => {
  // wp: Use Redux.
  return (
    <div className="container grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 mt-36">
      <Loader loading={searching} className="lg:col-span-3 md:col-span-2">
        {data.length > 0 ? (
          data.map((item) => (
            // <Link href={`/about/${item.id}`} key={item.id}>
            //   <Card className="bg-themeBlack border-themeGray rounded-xl overflow-hidden">
            //     <Image
            //       src={item.thumbnail ? item.thumbnail : "/no-image.svg"}
            //       alt=""
            //       height={300}
            //       width={300}
            //       className="w-full opacity-70 h-56"
            //     />
            //     <div className="p-6">
            //       <h3 className="text-lg text-themeTextGray font-bold">
            //         {item.name}
            //       </h3>
            //       <p className="text-base text-themeTextGray">
            //         {item.description && truncateString(item.description)}
            //       </p>
            //     </div>
            //   </Card>
            // </Link>
            <GroupCard item={item} key={item.id} />
          ))
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
