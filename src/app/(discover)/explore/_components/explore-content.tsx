"use client";
import { useAppSelector } from "@/redux/store";
import { SearchedGroup } from "./searched-group";

type Props = {
  layout: "SLIDER" | "LIST";
  category?: string;
};
export const ExploreContent = ({ layout, category }: Props) => {
  // wp: Use redux. convert this into zustand
  const { isSearching, data, status, debounce } = useAppSelector(
    (state) => state.searchReducer
  );
  console.log(status, data);
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
