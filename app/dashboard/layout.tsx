import { auth } from "@/auth";
import { AppSidebar } from "@/components/layout/app-sidebar";
import Navbar from "@/components/layout/nav-bar";
import { SidebarLayout } from "@/components/ui/sidebar";
import siteInfo from "@/config/site.info";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: `${siteInfo.name} - Dashboard`,
  description: "Dashboard -  app",
};

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect(`/login`);
  }
  return (
    <SidebarLayout defaultOpen={true}>
      <AppSidebar />
      <main className="flex flex-1 flex-col  relative overflow-auto">
        <Navbar />
        {children}
      </main>
    </SidebarLayout>
  );
};

export default layout;
