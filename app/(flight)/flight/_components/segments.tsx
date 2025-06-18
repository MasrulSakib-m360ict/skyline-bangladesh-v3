import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IFlight, IOption } from "@/types/type.flight";
import {
  formatFlightDate,
  minutesToHoursAndMinutes,
  timeSlice,
} from "@/utils/date-time-formatter";
import { imageUrl } from "@/utils/image-url";
import Image from "next/image";
import { useState } from "react";
import { FaPlane } from "react-icons/fa6";

interface ITab {
  id?: string;
  label: string;
  content: IOption[];
  layover: number[] | string[];
}

interface FlightSegmentProps {
  code: string;
  time: string;
  date: string;
  airport: string;
  terminal?: string;
}

const FlightSegment: React.FC<FlightSegmentProps> = ({
  code,
  time,
  date,
  airport,
  terminal,
}) => (
  <div className="flex-1">
    <div className="text-lg font-semibold">
      {code} - {timeSlice(time)}
    </div>
    <div className="text-sm">{formatFlightDate(date)}</div>
    <div className="text-xs">
      {airport}
      {terminal && (
        <span className="ml-1 text-xs text-gray-500">
          (Terminal - {terminal})
        </span>
      )}
    </div>
  </div>
);

const FlightInfo = ({ item }: { item: IOption }) => (
  <div className="flex items-center justify-between gap-3 mb-3">
    <Image
      className="h-auto rounded max-w-24"
      src={imageUrl(item.carrier.carrier_marketing_logo)}
      alt="airline_image"
      width={48}
      height={48}
    />
    <div>
      <div className="flex gap-2">
        <div className="font-bold text-md">
          {item?.carrier?.carrier_marketing_airline}
        </div>
        <div className="text-sm">
          ({item?.carrier?.carrier_marketing_code || ""}-
          {item?.carrier?.carrier_marketing_flight_number})
        </div>
      </div>
      <div className="text-sm font-semibold">
        Aircraft: <span>{item?.carrier?.carrier_aircraft_name}</span>
      </div>
      <div className="text-sm">
        Operated by: {item?.carrier?.carrier_operating_airline || ""}
      </div>
    </div>
  </div>
);

const FlightDuration = ({ elapsedTime }: { elapsedTime: number }) => (
  <div className="flex-1">
    <FaPlane className="flex justify-center w-full text-2xl" />
    <p className="mt-1 text-sm font-semibold text-center">
      {minutesToHoursAndMinutes(elapsedTime)?.time}
    </p>
  </div>
);

const CombineComponents = ({ item }: { item: IOption }) => (
  <div className="flex flex-col items-start justify-between gap-4 px-3 pb-3 md:items-center md:gap-0 md:flex-row">
    <FlightSegment
      code={item?.departure?.airport_code}
      time={item?.departure?.time}
      date={item?.departure?.date}
      airport={item?.departure?.airport}
      terminal={item?.departure?.terminal}
    />
    <FlightDuration elapsedTime={item.elapsedTime} />
    <FlightSegment
      code={item?.arrival?.airport_code}
      time={item?.arrival?.time}
      date={item?.arrival?.date}
      airport={item?.arrival?.airport}
      terminal={item?.arrival?.terminal}
    />
  </div>
);

const FlightLayover = ({
  layover,
  index,
  item,
}: {
  layover: number[] | string[];
  index: number;
  item: IOption;
}) => (
  <div className="">
    {Number(layover[index]) !== 0 && (
      <>
        <div className="text-center bg-[#F4F4F5] py-3">
          <h4 className="text-sm font-semibold">
            Flight Layover
            <span className="hidden px-1 md:inline-block">at</span>
            <span className="hidden md:inline-block">
              {item.arrival?.airport}
            </span>
            <span className="hidden px-1 md:inline-block">for</span> -{" "}
            <span className="text-secondary">
              {minutesToHoursAndMinutes(Number(layover[index]))?.time}
            </span>
          </h4>
        </div>
      </>
    )}
  </div>
);
const FlightCard = ({
  item,
  layover,
  index,
  cabin_code,
  cabin_type,
}: {
  item: IOption;
  layover: number[] | string[];
  index: number;
  cabin_code: string;
  cabin_type: string;
}) => (
  <div key={index}>
    <Card>
      <div className="flex flex-col items-start justify-between border-b pr-3 pt-3 md:flex-row md:items-center mb-2">
        <div className="flex items-center justify-between w-full">
          <FlightInfo item={item} />
          <div className="">
            <div className="text-sm font-semibold">
              {cabin_type} - {cabin_code}
            </div>
          </div>
        </div>
      </div>

      <CombineComponents item={item} />
    </Card>
    <FlightLayover layover={layover} index={index} item={item} />
  </div>
);

const FlightSegments = ({ Item }: { Item: IFlight }) => {
  const cabinCode =
    Item?.passengers?.[0]?.availability[0]?.segments[0]?.booking_code || "";

  const cabinType =
    Item?.passengers?.[0]?.availability[0]?.segments[0]?.cabin_type || "";

  const flights = Item?.flights;

  const tabs_data: ITab[] =
    flights?.map((flight, index) => {
      const departure_airport = flight?.options[0]?.departure?.airport_code;
      const arrival_airport =
        flight?.options[flight.options.length - 1].arrival?.airport_code;
      const content = flight?.options;
      const flight_layover = flight?.layover_time || [];

      return {
        label: `${departure_airport}-${arrival_airport}`,
        layover: flight_layover,
        content,
        id: String(index),
      };
    }) || [];

  const [activeTab, setActiveTab] = useState(tabs_data[0]?.id || "0");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <Tabs defaultValue={activeTab} className="relative mt-0">
      <TabsList className=" bg-transparent h-7 flex justify-start border-b rounded-none w-full space-x-1">
        {tabs_data.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id || ""}
            onClick={() => handleTabChange(tab.id!)}
            className="px-2 py-[2px] "
          >
            <p className="text-sm font-bold">{tab.label}</p>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs_data.map((tab) => (
        <TabsContent key={tab.id} className="" value={tab.id || ""}>
          {tab.content.map((item, index) => (
            <FlightCard
              key={index}
              item={item}
              layover={tab.layover}
              index={index}
              cabin_code={cabinCode}
              cabin_type={cabinType}
            />
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default FlightSegments;
