import { onGetUserDetails } from "@/actions/auth";
import BackdropGradient from "@/components/common/backdrop-gradient";
import GlassCard from "@/components/common/glass-card";
import Link from "next/link";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await onGetUserDetails();
  if (user?.status === 200) {
    redirect("/callback/sign-in");
  }
  return (
    <div className="container min:h-screen flex justify-center items-center mx-auto">
      <div className="flex flex-col w-full items-center py-24">
        <Link href="/" className="text-4xl font-bold text-themeTextWhite">
          EduVarse.
        </Link>
        <BackdropGradient
          containerClass="flex flex-col items-center"
          className="w-4/12 h-2/6 opacity-40"
        >
          <GlassCard className="xs:w-full md:w-7/12 lg:w-5/12 xl:w-4/12 p-7 mt-16">
            {children}
          </GlassCard>
        </BackdropGradient>
      </div>
    </div>
  );
};

export default AuthLayout;
