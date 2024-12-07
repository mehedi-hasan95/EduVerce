"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSidebarHooks } from "@/hooks/navigation";
import Link from "next/link";
import Image from "next/image";

export function TeamSwitcher({ groupId }: { groupId: string }) {
  const { isMobile } = useSidebar();
  const { group } = useSidebarHooks(groupId);

  const activeGroup = group.groups?.find((group) => group.id === groupId);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {/* <activeTeam.logo className="size-4" /> */}
                <Image
                  src={
                    activeGroup?.icon
                      ? activeGroup.icon
                      : "https://utfs.io/f/bfQmhClAQk0hGZ4mY7gkC7qKALH1Uw83RI6Q4zXbg5iydsto"
                  }
                  alt=""
                  height={20}
                  width={20}
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeGroup?.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Groups
            </DropdownMenuLabel>

            {group &&
              group.status === 200 &&
              group.groups?.map((group) => (
                <Link
                  key={group.id}
                  href={`/group/${group.id}/channel/${group.channel[0].id}`}
                >
                  <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                    {group.icon && (
                      <Image
                        src={group.icon}
                        alt=""
                        height={20}
                        width={20}
                        className="h-4 w-4"
                      />
                    )}
                    {group.name}
                  </DropdownMenuItem>
                </Link>
              ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
