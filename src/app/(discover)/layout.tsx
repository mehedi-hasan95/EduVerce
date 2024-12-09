import { Logo } from "@/components/common/logo";
import { UserAction } from "@/components/common/user-action";
import { Separator } from "@/components/ui/separator";

const ExplorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen pb-10">
      <div className="flex justify-between items-center container mx-auto px-6 py-5">
        <Logo /> <UserAction />
      </div>
      <Separator className="-mt-2 mb-3" />
      {children}
    </div>
  );
};

export default ExplorLayout;
