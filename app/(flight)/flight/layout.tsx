import Navbar from "@/components/layout/navbar-home";
import siteInfo from "@/config/site.info";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: `${siteInfo.name} - Flight Search`,
  description: "Search for flights",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#E2E8F0] relative">
      <div className="">
        <Navbar isHidable={false} />
      </div>
      <Suspense fallback={<div className="">Loading...</div>}>
        <div className="min-h-[90vh]">{children}</div>
      </Suspense>
    </div>
  );
};

export default layout;
