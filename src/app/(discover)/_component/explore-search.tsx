"use client";

import { Search } from "@/components/common/search";
import { usePathname } from "next/navigation";

export const ExploreSearch = () => {
  const pathName = usePathname();
  return (
    <>
      {pathName === "/explore" && (
        <Search
          placeholder="Search for group"
          searchType="GROUPS"
          glass
          inputStyle="lg:w-[500px] text-lg h-auto z-[9999]"
          className="rounded-3xl border-themeGray py-2 px-5 mt-10 mb-3"
        />
      )}
    </>
  );
};
