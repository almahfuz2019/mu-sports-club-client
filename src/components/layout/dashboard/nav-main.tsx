"use client";
import { CornerUpRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
  }[];
}) {
  const path = usePathname();
  const { theme } = useTheme();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>General</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="cursor-pointer "
                >
                  {item.items ? (
                    <>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </>
                  ) : (
                    <>
                      {item.icon && <item.icon />}
                      <Link href="/dashboard">{item.title}</Link>
                    </>
                  )}
                  {item?.items && (
                    <CornerUpRight className="ml-auto text-gray-700 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item?.items && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          className={`
                          flex items-center gap-1  transition-colors rounded-sm
                          ${
                            path === subItem.url
                              ? "bg-gray-200 dark:bg-gray-700"
                              : ""
                          }
                          hover:bg-gray-200 dark:hover:bg-gray-700
                          ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }
                        `}
                        >
                          <Link
                            href={subItem.url}
                            className="flex items-center gap-1 w-full px-2 py-1"
                          >
                            {subItem.icon && <subItem.icon />}
                            <span className="capitalize">{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
