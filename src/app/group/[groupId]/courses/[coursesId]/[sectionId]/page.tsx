import { onGetGroupInfo } from "@/actions/group";
import { SectionForm } from "./_components/section-form";

type Props = {
  params: Promise<{ groupId: string; sectionId: string }>;
};
const SectionId = async ({ params }: Props) => {
  const { groupId, sectionId } = await params;
  const data = await onGetGroupInfo(groupId);
  return (
    <div>
      <SectionForm groupOwner={data?.groupOwner} sectionId={sectionId} />
    </div>
  );
};

export default SectionId;
