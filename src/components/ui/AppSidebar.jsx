import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Home, Package, PlusCircle, User } from "lucide-react";
import { NavLink } from "react-router";
import Logo from "../Logo";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My Parcels",
    url: "/dashboard/my-parcels",
    icon: Package,
  },
  {
    title: "Send Parcel",
    url: "/send-parcel",
    icon: PlusCircle,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <NavLink to="/" className="flex items-center gap-3">
          <Logo />
        </NavLink>

        <p className="mt-3 text-sm text-muted-foreground">
          Manage parcel bookings and delivery activity.
        </p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url} end={item.url === "/dashboard"}>
                    {({ isActive }) => (
                      <SidebarMenuButton asChild isActive={isActive}>
                        <span>
                          <item.icon className="h-5 w-5" />

                          <span>{item.title}</span>
                        </span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="rounded-lg bg-lime-100 p-4 text-sm text-[#03373d]">
          <p className="font-bold">ZapShift Dashboard</p>
          <p className="mt-1 text-xs text-[#03373d]/75">
            Track your parcel work from one clean place.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
