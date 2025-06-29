import SearchEngine from "@/app/(flight)/flight/_components/search-engine";
import VisaForm from "@/app/(visa)/_components/visa-form";
import Container from "@/components/container";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, FileText, Map, Plane } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Hero = () => {
  const words = ["Affordable", "Convenient", "Fast", "Trusted"];
  const tabs = [
    { value: "flight", label: "Flight", icon: Plane },
    { value: "visa", label: "Visa", icon: FileText },
    { value: "hotel", label: "Hotel", icon: Building2 },
    { value: "tour", label: "Tour", icon: Map },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(tab || "flight");

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    router.push(`/?tab=${value}`);
  };

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  return (
    <div className="bg-cover bg-center bg-[url('/images/pexels-austin-zhang-925030-2441844.jpg')]  relative min-h-[75vh] flex items-center">
      <Container className="relative z-10 ">
        <div className=" mt-28 md:mt-16 mb-12 md:mb-0">
          <Tabs
            value={activeTab}
            onValueChange={handleTabClick}
            className="w-full relative"
          >
            <TabsList className="grid h-auto w-full grid-cols-2 sm:grid-cols-4 z-10 gap-2 p-2 bg-[#007C9E] rounded-t-lg rounded-b-none shadow-md text-white">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="transition duration-500 ease-in-out 
                 hover:bg-[#00A8C6] hover:text-white 
                 data-[state=active]:bg-white data-[state=active]:text-[#007C9E] 
                 flex items-center justify-center p-2 rounded-md"
                >
                  <tab.icon className="mr-2 h-5 w-5" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="relative w-full shadow-sm">
              <div className="relative h-full rounded-b-lg bg-white">
                {activeTab === "flight" ? (
                  <SearchEngine />
                ) : activeTab === "visa" ? (
                  <VisaForm />
                ) : (
                  <>
                    <div className="h-40 flex items-center justify-center">
                      <p className="text-2xl text-gray-400">Coming Soon</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Tabs>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
