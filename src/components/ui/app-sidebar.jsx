"use client";

import {
  Bike,
  LayoutDashboard,
  PackagePlus,
  Send,
  MapPin,
  History,
  Wallet,
  Receipt,
  UserCheck,
  Users,
} from "lucide-react";

import Logo from "@/components/Logo";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import useRole from "../../hooks/useRole";

export function AppSidebar(props) {
  const { role } = useRole();

  console.log("use role:", role);

  const data = {
    user: {
      name: "Zap Shift",
      email: "dashboard@zapshift.com",
      avatar: "/assets/customer-top.png",
    },

    navMain: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
      },

      // if role are admin
      ...(role === "admin"
        ? [
            {
              title: "Users Management",
              url: "/dashboard/users-management",
              icon: Users,
            },
          ]
        : []),

      {
        title: "My Parcels",
        url: "/dashboard/my-parcels",
        icon: Send,
      },

      {
        title: "Create Parcel",
        url: "/dashboard/create-parcel",
        icon: PackagePlus,
      },

      {
        title: "Parcel Tracking",
        url: "/dashboard/tracking",
        icon: MapPin,
      },

      {
        title: "Payment History",
        url: "/dashboard/payment-history",
        icon: Receipt,
      },

      {
        title: "Parcel History",
        url: "/dashboard/history",
        icon: History,
      },

      {
        title: "Wallet",
        url: "/dashboard/wallet",
        icon: Wallet,
      },

      // if role are admin
      ...(role === "admin"
        ? [
            {
              title: "Approve Riders",
              url: "/dashboard/approve-riders",
              icon: UserCheck,
            },
          ]
        : []),
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

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-16 justify-center border-b px-4 py-0 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2">
        <Logo
          className="flex h-9 min-w-0 items-center overflow-hidden"
          imageClassName="h-full w-auto"
        />
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
