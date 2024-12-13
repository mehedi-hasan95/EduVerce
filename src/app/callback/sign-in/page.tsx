import { onSigninUser } from "@/actions/auth";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const CallbackSignIn = async () => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const authUser = await onSigninUser(user.id);
  if (authUser.status === 207) {
    return redirect(`/group/${authUser.groupId}/channel/${authUser.channelId}`);
  }
  if (authUser.status === 200) {
    return redirect("/group/create");
  }
  if (authUser.status === 400) {
    return redirect("/sign-in");
  }
};

export default CallbackSignIn;
