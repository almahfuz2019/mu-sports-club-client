"use client";

import { MoreHorizontal, type LucideIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
    items: { title: string; icon: LucideIcon; theme?: string; url?: string }[];
  }[];
}) {
  const { isMobile } = useSidebar();
  const { setTheme } = useTheme();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <div className="cursor-pointer">
                <item.icon />
                <span>{item.name}</span>
              </div>
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
                {item.items.map(
                  (info, index) =>
                    index !== item.items.length - 1 && (
                      <>
                        {info.url ? (
                          <Link href={info.url} key={info.title}>
                            <DropdownMenuItem
                              onClick={() => setTheme(info.theme || "default")}
                              className="cursor-pointer"
                            >
                              <info.icon className="text-muted-foreground" />
                              <span className="">{info.title}</span>
                            </DropdownMenuItem>
                          </Link>
                        ) : (
                          <DropdownMenuItem
                            key={info.title}
                            onClick={() => setTheme(info.theme || "default")}
                            className="cursor-pointer"
                          >
                            <info.icon className="text-muted-foreground" />
                            <span className="">{info.title}</span>
                          </DropdownMenuItem>
                        )}
                      </>
                    )
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  {item.items?.length > 0 &&
                    React.createElement(
                      item.items[item.items.length - 1].icon,
                      { className: "text-muted-foreground" }
                    )}
                  <span>{item.items[item.items.length - 1].title}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
