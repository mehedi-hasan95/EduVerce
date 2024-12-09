import { useAppSelector } from "@/redux/store";
import { GroupCard } from "./group-card";

const PaginatedGroups = () => {
  // wp: redux
  const { data } = useAppSelector((state) => state.infiniteScrollReducer);

  return data.map((item: any) => <GroupCard item={item} key={item.id} />);
};

export default PaginatedGroups;
