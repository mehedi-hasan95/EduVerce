import { GroupSubscriptionForm } from "./_components/group-subscription-form";
import { SubscriptionItems } from "./_components/sbuscription-items";

type Props = {
  params: Promise<{
    groupId: string;
  }>;
};
const GroupSubscriptions = async ({ params }: Props) => {
  const { groupId } = await params;
  return (
    <div className="flex flex-col space-y-10">
      <h2 className="text-xl md:text-2xl lg:text-3xl">
        Group Subscription Settings
      </h2>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
        <GroupSubscriptionForm groupId={groupId} />
        <SubscriptionItems groupId={groupId} />
      </div>
    </div>
  );
};

export default GroupSubscriptions;
