import { onGetPaginatedPosts, onSearchGroups } from "@/actions/group";
import { useInfiniteScrollStore } from "@/zustand/infinity-scroll-store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export const useInfiniteScroll = (
  action: "GROUPS" | "CHANNEL" | "POSTS",
  identifier: string,
  paginate: number,
  search?: boolean,
  query?: string
) => {
  const observerElement = useRef<HTMLDivElement>(null);
  const { data, onInfiniteScroll } = useInfiniteScrollStore();

  const {
    refetch,
    isFetching,
    isFetched,
    data: paginatedData,
  } = useQuery({
    queryKey: [
      "infinite-scroll",
      action,
      identifier,
      paginate + data.length,
      search,
      query,
    ],
    queryFn: async () => {
      if (search) {
        if (action === "GROUPS") {
          const response = await onSearchGroups(
            action,
            query as string,
            paginate + data.length
          );
          if (response && response.groups) {
            return response.groups;
          }
        }
      } else {
        if (action === "POSTS") {
          const response = await onGetPaginatedPosts(
            identifier,
            paginate + data.length
          );
          if (response && response.posts) {
            return response.posts;
          }
        }
      }
      return null;
    },
    enabled: false,
  });

  useEffect(() => {
    if (isFetched && paginatedData) {
      onInfiniteScroll(paginatedData);
    }
  }, [isFetched, paginatedData, onInfiniteScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) refetch();
    });
    if (observerElement.current) {
      observer.observe(observerElement.current);
    }
    return () => observer.disconnect();
  }, [refetch]);

  return { observerElement, isFetching };
};
