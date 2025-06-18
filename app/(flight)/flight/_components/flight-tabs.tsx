import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IFlight } from "@/types/type.flight";
import { useState } from "react";
import Baggages from "./baggages";
import FarePassenger from "./fare-passenger";
import FareSummary from "./fare-summary";
import { FlightCard } from "./flight-card";
import Policy from "./policy";
import FlightSegments from "./segments";

type Props = {
  flight: IFlight;
};

const FlightTabs = ({ flight }: Props) => {
  const [activeTab, setActiveTab] = useState("Flight Details");
  const tabs = [
    {
      label: "Flight Details",
      element: <FlightSegments Item={flight} />,
    },
    {
      label: "Fare Summery",
      element: (
        <div className="justify-between md:flex">
          <FarePassenger passengers={flight.passengers} />
          <FareSummary fare={flight.fare} />
        </div>
      ),
    },
    {
      label: "Baggages",
      element: <Baggages passengers={flight.passengers} />,
    },

    // {
    //   label: "Passenger",
    //   element: <Passenger passengers={flight.passengers} />,
    // },
    {
      label: "Refund-Reissue Policy",
      element: <Policy />,
    },
  ];

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem
          value={flight.carrier_code as string}
          className="border-0 px-2 md:px-0"
        >
          <Card className="mt-2">
            <CardContent className="py-2">
              <FlightCard data={flight} />
            </CardContent>
          </Card>

          <AccordionContent className="bg-white pb-0">
            <Tabs defaultValue={activeTab}>
              <ScrollArea className="w-screen md:w-full rounded-none  overflow-x-scroll  scrollbar-hide">
                <TabsList className="overflow-x-auto w-full whitespace-nowrap">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.label}
                      value={tab.label}
                      onClick={() => setActiveTab(tab.label)}
                      className="px-2 py-1"
                    >
                      <p className="flex items-center text-[14px] font-bold md:gap-1">
                        {tab.label}
                      </p>
                    </TabsTrigger>
                  ))}
                </TabsList>
                <ScrollBar orientation="horizontal" className="invisible" />
              </ScrollArea>

              {tabs.map((tab) => (
                <TabsContent key={tab.label} value={tab.label}>
                  {tab.element}
                </TabsContent>
              ))}
            </Tabs>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FlightTabs;
