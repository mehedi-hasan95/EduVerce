import { onSearchGroups } from "@/actions/group";
import { useSearchStore } from "@/zustand/search-slice";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
export const useSearch = (search: "GROUPS" | "POSTS") => {
  const {
    setIsSearching,
    setData,
    setStatus,
    setDebounce,
    clearSearch,
    debounce,
  } = useSearchStore();

  const [query, setQuery] = useState<string>("");

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebounce(query);
    }, 1000);
    return () => clearTimeout(delayInputTimeoutId);
  }, [query, setDebounce]);

  const { refetch, data, isFetched, isFetching } = useQuery({
    queryKey: ["search-data", debounce],
    queryFn: async ({ queryKey }) => {
      if (search === "GROUPS") {
        const groups = await onSearchGroups(search, queryKey[1]);
        return groups;
      }
      if (search === "POSTS") {
        const posts = await onSearchGroups(search, queryKey[1]);
        return posts;
      }
    },
    enabled: false,
  });

  useEffect(() => {
    if (isFetching) {
      setIsSearching(true);
      setData([]);
    }

    if (isFetched) {
      setIsSearching(false);
      setStatus(data?.status);
      setData(data?.groups || []);
    }
  }, [isFetching, isFetched, data, setIsSearching, setStatus, setData]);

  useEffect(() => {
    if (debounce) refetch();
    else clearSearch();
  }, [debounce, refetch, clearSearch]);

  return { query, onSearchQuery };
};
