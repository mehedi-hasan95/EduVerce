"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebarHooks } from "@/hooks/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { ChannelCreateModal } from "./channel-create-modal";

export function NavProjects({ groupId }: { groupId: string }) {
  const { groupChannels } = useSidebarHooks(groupId);
  const pathName = usePathname();
  const currentPage = pathName.split("/").pop();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Channels</SidebarGroupLabel>
      <SidebarMenu className="space-y-2">
        <SidebarMenuItem>
          {" "}
          <ChannelCreateModal
            groupId={groupId}
            buttonTrigger={
              <SidebarMenuButton>
                <PlusCircle className="h-4 w-4" /> Add Channel
              </SidebarMenuButton>
            }
          />
        </SidebarMenuItem>
        {groupChannels &&
          groupChannels.status === 200 &&
          groupChannels.channels?.map((channel) => (
            <SidebarMenuItem key={channel.id}>
              <SidebarMenuButton asChild>
                <Link
                  href={`/group/${groupId}/channel/${channel.id}`}
                  className={cn(
                    "bg-themeDarkGray",
                    currentPage === channel.id && "bg-[#09090B] border-[#27272A"
                  )}
                >
                  <Image
                    alt=""
                    src={channel.icon}
                    height={40}
                    width={40}
                    className="h-5 w-5 text-white"
                  />
                  <span className="capitalize">{channel.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
