import { ChannelNavItems } from "./channel-nav-items";

interface Props {
  groupId: string;
  channelId: string;
}
export const ChannelNav = ({ channelId, groupId }: Props) => {
  return (
    <div className="pb-3 lg:sticky top-5 z-50 ">
      <ChannelNavItems
        oriantation="Desktop"
        channelId={channelId}
        groupId={groupId}
      />
      <ChannelNavItems
        oriantation="Mobile"
        channelId={channelId}
        groupId={groupId}
      />
    </div>
  );
};
