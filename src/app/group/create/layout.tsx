import BackdropGradient from "@/components/common/backdrop-gradient";
import GlassCard from "@/components/common/glass-card";
import { TextGradient } from "@/components/common/text-gradient";
import { PRICING_HIGHLIGHTS } from "./_components/pricing-highlight";
import { Logo } from "@/components/common/logo";
import { UserAction } from "@/components/common/user-action";

const GroupCreateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto px-6">
      <div className="flex justify-between items-center py-10">
        <Logo />
        <UserAction />
      </div>
      <div className="grid lg:grid-cols-2 gap-5 lg:gap-10 mt-20">
        <BackdropGradient
          containerClass="flex flex-col items-center"
          className="w-4/12 h-2/6 opacity-40"
        >
          <GlassCard className="p-7">
            <TextGradient element="H1" className="lg:text-center">
              EduVerse{" "}
              <p className="text-base font-normal">
                Enroll group only for $99/month. Manage users, courses, and
                platform settings. Cancel any time. No hidden fees
              </p>
            </TextGradient>
            <div className="space-y-2 pt-10 text-themeTextWhite">
              {PRICING_HIGHLIGHTS.map((price) => (
                <li key={price.id} className="flex gap-2 lg:items-center">
                  <price.icon className="h-4 w-4" />
                  {price.label}
                </li>
              ))}
            </div>
          </GlassCard>
        </BackdropGradient>
        <BackdropGradient
          containerClass="flex flex-col items-center"
          className="w-4/12 h-2/6 opacity-40"
        >
          <GlassCard className="p-7">{children}</GlassCard>
        </BackdropGradient>
      </div>
    </div>
  );
};

export default GroupCreateLayout;
