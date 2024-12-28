import { onGetAffiliateLink } from "@/actions/group";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { CopyButton } from "./_components/copy-button";

type Props = {
  params: Promise<{ groupId: string }>;
};
const AffiliatesPage = async ({ params }: Props) => {
  const { groupId } = await params;
  const affiliate = await onGetAffiliateLink(groupId);
  return (
    <div className="max-w-screen-md pr-5">
      <Card className="p-5 bg-themeDarkGray">
        <CardTitle>Affiliate Link</CardTitle>
        <CardDescription>Create and share an invitations link</CardDescription>
        <div className="my-5 flex justify-between p-3 items-center rounded-2xl gap-8 bg-themeBlack">
          {`${process.env.AFFILIATES_URL}/${affiliate.affiliate?.id}`}
          <CopyButton
            content={`${process.env.AFFILIATES_URL}/${affiliate.affiliate?.id}`}
          />
        </div>
        <CardDescription>
          This lnk will redirect users to the main page <br />
          where they can purchase or request memberships
        </CardDescription>
      </Card>
    </div>
  );
};

export default AffiliatesPage;
