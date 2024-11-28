"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSidebarHooks } from "@/hooks/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { ChannelCreateModal } from "./channel-create-modal";

import { Folder, Forward, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChannelHooks } from "@/hooks/channel";
export function NavProjects({ groupId }: { groupId: string }) {
  const { isMobile } = useSidebar();
  const { groupChannels } = useSidebarHooks(groupId);
  const { onDeleteChannel } = useChannelHooks(groupId);
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <Folder className="text-muted-foreground" />
                    <span>View Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="text-muted-foreground" />
                    <span>Share Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {channel.name !== "general" &&
                    channel.name !== "anouncements" && (
                      <DropdownMenuItem
                        onClick={() => onDeleteChannel(groupId, channel.id)}
                        className="cursor-pointer"
                      >
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
