import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar-home";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative ">
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
