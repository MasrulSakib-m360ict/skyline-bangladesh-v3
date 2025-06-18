"use client";
import {
  Frame,
  LifeBuoy,
  Map,
  Package,
  PieChart,
  Plane,
  Send,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "@/components/ui/sidebar";
import siteInfo from "@/config/site.info";
import Image from "next/image";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const data = {
  navMain: [
    {
      title: "Account",
      url: "/dashboard",
      icon: PieChart,
    },

    {
      title: "flight bookings ",
      url: "/dashboard/booking-requests",
      icon: Plane,
    },

    {
      title: "Visa bookings ",
      url: "/dashboard/visa-requests",
      icon: Package,
    },
    {
      title: "Travelers",
      url: "/dashboard/travelers",
      icon: Map,
    },
  ],

  navSecondary: [
    {
      title: "Support",
      url: "/dashboard/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href={"/"}
          className="flex items-center gap-1.5 overflow-hidden px-2  text-left text-sm transition-all"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary text-primary-foreground">
            <Image
              src={siteInfo.logo}
              alt={siteInfo.name}
              width={20}
              height={20}
            />
          </div>
          <div className="line-clamp-1 flex-1 pr-2 font-semibold">
            {siteInfo.name}
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Platform</SidebarLabel>
          <NavMain items={data.navMain} />
        </SidebarItem>

        <SidebarItem className="mt-auto">
          <SidebarLabel>Help</SidebarLabel>
          <NavSecondary items={data.navSecondary} />
        </SidebarItem>
        <SidebarItem>{/* <StorageCard /> */}</SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
