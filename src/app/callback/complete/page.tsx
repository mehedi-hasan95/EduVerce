import { onCreateAccount } from "@/actions/auth";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CallbackCompletePage = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const createdUser = await onCreateAccount({
    firstName: user.firstName as string,
    lastName: user.lastName as string,
    clerkId: user.id,
    email: user.emailAddresses[0].emailAddress,
    image: user.imageUrl,
    userRole: "USER",
  });
  if (createdUser.status === 200) {
    redirect("/group/create");
  }
  if (createdUser.status !== 200) {
    redirect("/sign-in");
  }
};

export default CallbackCompletePage;
