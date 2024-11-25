import { onGetUserDetails } from "@/actions/auth";
import { onGetAffiliateInfo } from "@/actions/group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { redirect } from "next/navigation";
import { CreateGroup } from "./_components/create-group";

const GroupCreatePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [affiliate: string]: string }>;
}) => {
  const user = await onGetUserDetails();
  if (!user || !user.id) {
    redirect("/sign-in");
  }
  const { affiliate } = await searchParams;
  const affiliateUser = await onGetAffiliateInfo(affiliate);
  return (
    <div>
      <h5 className="font-bold text-base text-themeTextWhite">
        Payment Method
      </h5>
      <p className="text-themeTextGray leading-tight">
        Free for 14 days, then $99/month. Cancel anytime.All features. Unlimited
        everything. No hidden fees.
      </p>
      {affiliateUser.status === 200 && (
        <div className="mt-5 flex justify-center items-center gap-x-2 italic text-themeTextGray text-sm">
          You are refer by{" "}
          <Avatar>
            <AvatarImage
              src={
                affiliateUser.affiliateUser?.Group?.User.image
                  ? affiliateUser.affiliateUser?.Group?.User.image
                  : "https://github.com/shadcn.png"
              }
              alt="@shadcn"
            />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          {affiliateUser.affiliateUser?.Group?.User.firstName}{" "}
          {affiliateUser.affiliateUser?.Group?.User.lastName}
        </div>
      )}
      <CreateGroup
        affiliate={affiliateUser.status === 200 ? true : false}
        userId={user.id}
        stripeId={affiliateUser.affiliateUser?.Group?.User.stripeId || ""}
      />
    </div>
  );
};

export default GroupCreatePage;
