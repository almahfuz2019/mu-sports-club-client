"use client";

import * as React from "react";
import {
  BadgeCheck,
  Home,
  Users,
  UserCog,
  Building,
  Building2,
  Building2Icon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-users";

const data = {
  user: {
    name: "Joy das",
    email: "joy600508@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "RC Management",
      logo: BadgeCheck,
      plan: "RC Management",
      url: "/",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: false,
      // items: [
      //   {
      //     title: "Dashboard",
      //     url: "/dashboard",
      //     icon: LucideLayoutDashboard,
      //   },
      // ],
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
      isActive: false,
      items: [
        {
          title: "Manage Users",
          url: "/dashboard/manage-user",
          icon: UserCog,
        },
      ],
    },
    {
      title: "Event Category",
      url: "#",
      icon: Building,
      isActive: false,
      items: [
        {
          title: "Add Event Category",
          url: "/dashboard/add-event-category",
          icon: Building2,
        },
        {
          title: "Manage Event Category",
          url: "/dashboard/manage-event-category",
          icon: Building2Icon,
        },
      ],
    },
    {
      title: "Contact",
      url: "#",
      icon: Building,
      isActive: false,
      items: [
        {
          title: "Manage Contact",
          url: "/dashboard/manage-contact",
          icon: Building2Icon,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
