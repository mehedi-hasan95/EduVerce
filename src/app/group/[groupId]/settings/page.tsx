import { GroupSettingsForm } from "./_components/group-settings-form";

type Props = {
  params: Promise<{ groupId: string }>;
};
const Settings = async ({ params }: Props) => {
  const { groupId } = await params;
  return (
    <div>
      <h3 className="text-2xl md:text-3xl lg:text-4xl">Group Settings</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur,
        nemo!
      </p>
      <GroupSettingsForm groupId={groupId} />
    </div>
  );
};

export default Settings;
