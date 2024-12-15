import { onGetUserDetails } from "@/actions/auth";
import { onGetGroupInfo } from "@/actions/group";
import { onGetActiveSubscription } from "@/actions/subscription";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { GroupAbout } from "./_components/group-about";
import { AboutGroupWidget } from "./_components/about-widget/about-group-widget";

type Props = {
  params: Promise<{
    groupId: string;
  }>;
};
const GroupId = async ({ params }: Props) => {
  const { groupId } = await params;
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["group-info"],
    queryFn: () => onGetGroupInfo(groupId),
  });

  // await query.prefetchQuery({
  //   queryKey: ["active-subscription"],
  //   queryFn: () => onGetActiveSubscription(groupId),
  // });
  const user = await onGetUserDetails();
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="grid lg:grid-cols-3 gap-10 container mx-auto px-6">
        <div className="lg:col-span-2">
          <GroupAbout groupId={groupId} userId={user?.id as string} />
        </div>
        <div className="col-span-1">
          <AboutGroupWidget groupId={groupId} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default GroupId;
