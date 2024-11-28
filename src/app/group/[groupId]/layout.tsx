import { onGetUserDetails } from "@/actions/auth";
import {
  onGetGroupChannels,
  onGetGroupInfo,
  onGetGroupSubscriptions,
  onGetUserGroups,
} from "@/actions/group";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { AppSidebar } from "./_component/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";

type Props = {
  children: React.ReactNode;
  params: Promise<{ groupId: string }>;
};
const GroupIdLayout = async ({ children, params }: Props) => {
  const user = await onGetUserDetails();
  if (!user) {
    redirect("/sign-in");
  }
  const { groupId } = await params;
  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ["group-info"],
    queryFn: () => onGetGroupInfo(groupId),
  });
  await query.prefetchQuery({
    queryKey: ["group-user-info"],
    queryFn: () => onGetUserGroups(user.id!),
  });
  await query.prefetchQuery({
    queryKey: ["group-channels"],
    queryFn: () => onGetGroupChannels(groupId),
  });
  await query.prefetchQuery({
    queryKey: ["group-subscriptions"],
    queryFn: () => onGetGroupSubscriptions(groupId),
  });
  // await query.prefetchQuery({
  //   queryKey: ["group-members"],
  //   queryFn: () => onGetAllGroupMembers(groupId),
  // });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <SidebarProvider>
        <AppSidebar groupId={groupId} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
          <Separator orientation="horizontal" className="-mt-2 mb-3" />
          <div className="px-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </HydrationBoundary>
  );
};

export default GroupIdLayout;
