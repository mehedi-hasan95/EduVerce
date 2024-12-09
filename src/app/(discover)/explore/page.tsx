import { onGetExploreGroup } from "@/actions/group";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ExploreContent } from "./_components/explore-content";

const ExplorePage = async () => {
  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ["next.js"],
    queryFn: () => onGetExploreGroup("next.js", 0),
  });
  await query.prefetchQuery({
    queryKey: ["react"],
    queryFn: () => onGetExploreGroup("react", 0),
  });
  await query.prefetchQuery({
    queryKey: ["javascript"],
    queryFn: () => onGetExploreGroup("javascript", 0),
  });
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <ExploreContent layout="SLIDER" />
    </HydrationBoundary>
  );
};

export default ExplorePage;
