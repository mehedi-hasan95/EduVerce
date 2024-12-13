import { onGetUserDetails } from "@/actions/auth";
import { onGetGroupInfo } from "@/actions/group";
import { onGetActiveSubscription } from "@/actions/subscription";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { GroupAbout } from "./_components/group-about";

type Props = {
  params: Promise<{
    groupId: string;
  }>;
};
const GroupId = async ({ params }: Props) => {
  const { groupId } = await params;
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["about-group-info"],
    queryFn: () => onGetGroupInfo(groupId),
  });

  await query.prefetchQuery({
    queryKey: ["active-subscription"],
    queryFn: () => onGetActiveSubscription(groupId),
  });
  const user = await onGetUserDetails();
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <GroupAbout groupId={groupId} userId={user?.id as string} />
    </HydrationBoundary>
  );
};

export default GroupId;
