import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar-home";
import { Suspense } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative ">
      <Navbar />
      <Suspense fallback={<div className="">Loading...</div>}>
        <div className="min-h-[67vh]">{children}</div>
      </Suspense>
      <Footer />
    </div>
  );
};

export default layout;
