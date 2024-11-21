import { Logo } from "@/components/common/logo";
import { LandingMenu } from "./landing-menu";
import { UserAction } from "@/components/common/user-action";

export const LandingMenuItem = () => {
  return (
    <div className="flex justify-between items-center container mx-auto px-6 pt-5 sticky top-3">
      <Logo />
      <LandingMenu oriantation="Desktop" />
      <div className="flex gap-2">
        <LandingMenu oriantation="Mobile" />
        <UserAction />
      </div>
    </div>
  );
};
