import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavUser } from "./nav-user";
import { NavProjects } from "./nav-projects";

export function AppSidebar({ groupId }: { groupId: string }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher groupId={groupId} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects groupId={groupId} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
