import { onGetUserDetails } from "@/actions/auth";
import { onGetChannelInfo } from "@/actions/channel";
import { onGetGroupInfo } from "@/actions/group";
import { QueryClient } from "@tanstack/react-query";

type Props = {
  params: Promise<{ channelId: string; groupId: string }>;
};
const ChannelId = async ({ params }: Props) => {
  const query = new QueryClient();
  const authUser = await onGetUserDetails();
  const { channelId, groupId } = await params;
  await query.prefetchQuery({
    queryKey: ["channel-info"],
    queryFn: () => onGetChannelInfo(channelId),
  });
  await query.prefetchQuery({
    queryKey: ["group-info"],
    queryFn: () => onGetGroupInfo(groupId),
  });

  return <div>Channel</div>;
};

export default ChannelId;
