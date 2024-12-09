import { useInfiniteScrollStore } from "@/zustand/infinity-scroll-store";
import { GroupCard } from "./group-card";

const PaginatedGroups = () => {
  const { data } = useInfiniteScrollStore();

  return data.map((item: any) => <GroupCard item={item} key={item.id} />);
};

export default PaginatedGroups;
