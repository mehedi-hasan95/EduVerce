import { onGetVeririedAffiliateLink } from "@/actions/group";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ affiliatesId: string }>;
};
const AffiliatesIdPage = async ({ params }: Props) => {
  const { affiliatesId } = await params;
  const validAffiliate = await onGetVeririedAffiliateLink(affiliatesId);
  if (validAffiliate.status === 200) {
    return redirect(`/group/create?affiliate=${affiliatesId}`);
  }
  if (validAffiliate.status !== 200) {
    return redirect(`/`);
  }
};

export default AffiliatesIdPage;
