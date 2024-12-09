"use client";
import { useSearchStore } from "@/zustand/search-slice";
import { SearchedGroup } from "./searched-group";

type Props = {
  layout: "SLIDER" | "LIST";
  category?: string;
};
export const ExploreContent = ({ layout, category }: Props) => {
  const { isSearching, data, status, debounce } = useSearchStore();
  return (
    <div>
      {isSearching || debounce ? (
        <SearchedGroup
          data={data as any}
          searching={isSearching as boolean}
          query={debounce}
        />
      ) : (
        <>Nothing</>
      )}
    </div>
  );
};
