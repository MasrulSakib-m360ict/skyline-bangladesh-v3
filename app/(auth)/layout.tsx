import { auth } from "@/auth";
import Navbar from "@/components/layout/navbar-home";
import siteInfo from "@/config/site.info";

import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  if (user) {
    redirect("/");
  }

  return (
    <div className="bg-[url('/images/hero.jpg')] h-screen bg-fixed bg-center bg-cover   bg-gray-600 ">
      <div className="w-full h-full backdrop-blur flex flex-col items-center justify-center ">
        <Navbar />
        {children}
        <p className="mt-4 text-white text-sm">
          © 2024 - {siteInfo.name} All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default layout;
