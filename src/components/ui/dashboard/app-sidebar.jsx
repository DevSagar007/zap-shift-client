"use client";

import {
  Bike,
  Boxes,
  LayoutDashboard,
  PackagePlus,
  Send,
  Truck,
} from "lucide-react";

import Logo from "@/components/Logo";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Zap Shift",
    email: "dashboard@zapshift.com",
    avatar: "/assets/customer-top.png",
  },
  teams: [
    {
      name: "Zap Shift",
      logo: Truck,
      plan: "Courier",
    },
    {
      name: "Merchant",
      logo: Boxes,
      plan: "Business",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Parcels",
      url: "/dashboard/my-parcels",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Send Parcel",
      url: "/send-parcel",
      icon: PackagePlus,
    },
    {
      name: "Rider Register",
      url: "/rider",
      icon: Bike,
    },
  ],
};

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex h-10 items-center px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <Logo />
        </div>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
