import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Dashboard - Booking Requests`,
  description: "Dashboard -  app",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default layout;
