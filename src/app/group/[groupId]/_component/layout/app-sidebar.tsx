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
import { NavLogo } from "./nav-logo";

export function AppSidebar({ groupId }: { groupId: string }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavLogo />
        <TeamSwitcher groupId={groupId} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects groupId={groupId} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser groupId={groupId} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
