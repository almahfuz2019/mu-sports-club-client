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
      title: "Notice",
      url: "#",
      icon: Building,
      isActive: false,
      items: [
        {
          title: "Add Notice",
          url: "/dashboard/add-notice",
          icon: Building2,
        },
        {
          title: "Manage Notice",
          url: "/dashboard/manage-notice",
          icon: Building2Icon,
        },
      ],
    },
    {
      title: "Sponsor",
      url: "#",
      icon: Building,
      isActive: false,
      items: [
        {
          title: "Add Sponsor",
          url: "/dashboard/add-sponsor",
          icon: Building2,
        },
        {
          title: "Manage Sponsor",
          url: "/dashboard/manage-sponsor",
          icon: Building2Icon,
        },
      ],
    },
    {
      title: "Player",
      url: "#",
      icon: Building,
      isActive: false,
      items: [
        {
          title: "Add Player",
          url: "/dashboard/add-player",
          icon: Building2,
        },
        {
          title: "Manage Player",
          url: "/dashboard/manage-player",
          icon: Building2Icon,
        },
      ],
    },
    {
      title: "Committee",
      url: "#",
      icon: Building,
      isActive: false,
      items: [
        {
          title: "Add Committee",
          url: "/dashboard/add-committee",
          icon: Building2,
        },
        {
          title: "Manage Committee",
          url: "/dashboard/manage-committee",
          icon: Building2Icon,
        },
      ],
    },
    {
      title: "All Committee",
      url: "#",
      icon: Building,
      isActive: false,
      items: [
        {
          title: "Add All Committee",
          url: "/dashboard/add-all-committee",
          icon: Building2,
        },
        {
          title: "Manage All Committee",
          url: "/dashboard/manage-all-committee",
          icon: Building2Icon,
        },
      ],
    },
    {
      title: "Performer",
      url: "#",
      icon: Building,
      isActive: false,
      items: [
        {
          title: "Add Performer",
          url: "/dashboard/add-performer",
          icon: Building2,
        },
        {
          title: "Manage Performer",
          url: "/dashboard/manage-performer",
          icon: Building2Icon,
        },
      ],
    },
    {
      title: "Achievement",
      url: "#",
      icon: Building,
      isActive: false,
      items: [
        {
          title: "Add Achievement",
          url: "/dashboard/add-achievement",
          icon: Building2,
        },
        {
          title: "Manage Achievement",
          url: "/dashboard/manage-achievement",
          icon: Building2Icon,
        },
      ],
    },
    {
      title: "Gallery",
      url: "#",
      icon: Building,
      isActive: false,
      items: [
        {
          title: "Add Gallery",
          url: "/dashboard/add-gallery",
          icon: Building2,
        },
        {
          title: "Manage Gallery",
          url: "/dashboard/manage-gallery",
          icon: Building2Icon,
        },
      ],
    },
    {
      title: "Video",
      url: "#",
      icon: Building,
      isActive: false,
      items: [
        {
          title: "Add Video",
          url: "/dashboard/add-video",
          icon: Building2,
        },
        {
          title: "Manage Video",
          url: "/dashboard/manage-video",
          icon: Building2Icon,
        },
      ],
    },
    {
      title: "Stats",
      url: "#",
      icon: Building,
      isActive: false,
      items: [
        {
          title: "Add Stats",
          url: "/dashboard/add-stats",
          icon: Building2,
        },
        {
          title: "Manage Stats",
          url: "/dashboard/manage-stats",
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
