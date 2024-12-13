"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

export function NavLogo() {
  const pathName = usePathname();
  const currentPage = pathName.split("/").pop();
  if (currentPage?.includes("settings")) {
    return (
      <SidebarGroup className="p-0">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={`/`} className={cn("bg-themeDarkGray text-xl")}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Home className="h-4 w-4" />
                </div>

                <span className="capitalize">EduVerse</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }
}
