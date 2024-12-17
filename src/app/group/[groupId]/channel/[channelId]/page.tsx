import { onGetChannelInfo } from "@/actions/channel";
import { onGetGroupInfo } from "@/actions/group";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { LeaderBoard } from "./_components/leaderboard";
import { CreateNewPost } from "./_components/create-post/create-new-post";
import { onGetUserDetails } from "@/actions/auth";
import { ChannelGroupSidebar } from "./_components/create-post/channel-group-sidebar";
import { PostFeed } from "./_components/create-post/post-feed";
import { ChannelNav } from "./_components/nav/channel-nav";

type Props = {
  params: Promise<{ channelId: string; groupId: string }>;
};
const ChannelId = async ({ params }: Props) => {
  const query = new QueryClient();
  const { channelId, groupId } = await params;
  await query.prefetchQuery({
    queryKey: ["channel-info"],
    queryFn: () => onGetChannelInfo(channelId, 1, 6),
  });
  await query.prefetchQuery({
    queryKey: ["group-info"],
    queryFn: () => onGetGroupInfo(groupId),
  });
  const user = await onGetUserDetails();
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="grid lg:grid-cols-4 gap-5 container">
        <div className="col-span-1">
          <LeaderBoard />
        </div>
        <div className="lg:col-span-2">
          <ChannelNav channelId={channelId} groupId={groupId} />
          <CreateNewPost
            channelId={channelId}
            userImage={
              user?.image ? user.image : "https://github.com/shadcn.png"
            }
            userName={user?.name as string}
          />
          <PostFeed channelId={channelId} userId={user?.id as string} />
        </div>
        <div className="col-span-1">
          <ChannelGroupSidebar groupId={groupId} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default ChannelId;
