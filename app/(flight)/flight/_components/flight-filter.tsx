"use client";
import { Icons } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setFilter, useFlightData } from "@/redux/slices/flight-data-slice";
import { useFlightSearch } from "@/redux/slices/flight-search.slice";
import { formatNumber } from "@/utils/date-time-formatter";
import { imageUrl } from "@/utils/image-url";
import { Separator } from "@radix-ui/react-select";
import Image from "next/image";
import { useEffect, useState } from "react";

const FlightFilter = ({ loading }: { loading: boolean }) => {
  const dispatch = useAppDispatch();
  const { filter, flightFilterData } = useAppSelector(useFlightData);
  const { baggage, airlines } = flightFilterData;

  const handleAirline = (code: string) => {
    let carrierOperating = filter.carrier_operating
      ? filter.carrier_operating.split(",")
      : [];

    if (carrierOperating.includes(code)) {
      carrierOperating = carrierOperating.filter((item) => item !== code);
    } else {
      carrierOperating.push(code);
    }

    const data =
      carrierOperating.length > 0 ? carrierOperating.join(",") : undefined;
    dispatch(setFilter({ ...filter, carrier_operating: data, page: 1 }));
  };

  const handleRefundable = (value: string) => {
    dispatch(setFilter({ ...filter, refundable: value, page: 1 }));
  };

  const handleBaggage = (code: string, event: string | boolean) => {
    console.log("called");
    let baggage = filter.baggage ? filter.baggage.split(",") : [];
    if (event === true) {
      if (!baggage.includes(code)) {
        baggage.push(code);
      }
    } else {
      baggage = baggage.filter((item) => item !== code);
    }
    const data = baggage.length > 0 ? baggage.join(",") : undefined;
    dispatch(setFilter({ ...filter, baggage: data, page: 1 }));
  };

  return (
    <section>
      <>
        <h3 className="mb-2 font-bold ">Refundable</h3>
        <Separator className="my-1 h-px w-full bg-gray-300" />
        <RadioGroup
          disabled={loading}
          className="mt-2 flex space-x-4"
          value={filter.refundable || ""}
          onValueChange={handleRefundable}
        >
          <label className="inline-flex items-center">
            <RadioGroupItem
              value="true"
              className="text-secondary focus:ring-secondary"
            />
            <span className="ml-2 text-gray-800">Refundable</span>
          </label>
          <label className="inline-flex items-center">
            <RadioGroupItem
              value="false"
              className="text-secondary focus:ring-secondary"
            />
            <span className="ml-2 text-gray-800">Non-Refundable</span>
          </label>
        </RadioGroup>
      </>

      <>
        <h3 className="mb-2 font-bold mt-4">Airlines</h3>
        <Separator className="my-2 mb-3 h-px w-full bg-gray-300" />
        {airlines?.map((airline, index) => (
          <div className="mb-1 flex items-center space-x-2" key={index}>
            <Checkbox
              disabled={loading}
              value={airline.airline_code}
              checked={
                filter.carrier_operating?.includes(airline.airline_code) ??
                false
              }
              onCheckedChange={() => handleAirline(airline.airline_code)}
              id={airline.airline_code}
              className="border-2 border-secondary"
            />
            <Label
              htmlFor={airline.airline_code}
              className="flex w-full cursor-pointer items-center justify-between"
            >
              <div className="flex w-[70%] items-center">
                <Image
                  src={imageUrl(airline.airline_logo)}
                  alt={airline.airline_name}
                  height={20}
                  width={20}
                  objectFit="cover"
                  objectPosition="center"
                />
                <p className="ms-1 w-[65%] truncate">{airline.airline_name}</p>
              </div>
              <div className="text-[12px] whitespace-nowrap">
                <span className="font-mono">৳</span>{" "}
                {formatNumber(airline.price)}
              </div>
            </Label>
          </div>
        ))}
      </>
      <PriceRangeFilter />

      <>
        <h3 className="mb-2 font-bold mt-4">Baggage</h3>
        <Separator className="my-2 h-px w-full bg-gray-300" />
        {baggage?.map((baggage, index) => (
          <div className="mb-1 flex items-center space-x-2" key={index}>
            <Checkbox
              disabled={loading}
              value={baggage}
              checked={filter.baggage?.includes(baggage) ?? false}
              onCheckedChange={(event) => handleBaggage(baggage, event)}
              id={baggage}
              className="border-2 border-secondary"
            />
            <Label
              htmlFor={baggage}
              className="flex w-full cursor-pointer items-center justify-between"
            >
              <div className="flex w-[70%] items-center">
                <p className="ms-1 w-[80%] truncate">{baggage}</p>
              </div>
            </Label>
          </div>
        ))}
      </>

      <>
        <h3 className="mb-2 font-bold mt-4">Flight Schedules</h3>
        <Tabs defaultValue="departure" className="bg-[#E2E8F0]">
          <TabsList className="bg-inherit">
            <TabsTrigger value="departure">Departure Time</TabsTrigger>
            <TabsTrigger value="arrival">Arrival Time</TabsTrigger>
          </TabsList>
          <TabsContent value="departure">
            <TimeFilter type="departure" />
          </TabsContent>
          <TabsContent value="arrival">
            <TimeFilter type="arrival" />
          </TabsContent>
        </Tabs>
      </>
    </section>
  );
};

export default FlightFilter;

// ! Price Range Filter

const PriceRangeFilter = () => {
  const dispatch = useAppDispatch();
  const { filter, flightFilterData, type } = useAppSelector(useFlightData);
  const { price_rage } = flightFilterData;
  const { max_price, min_price } = filter;

  const handlePriceChange = (value: number[]) => {
    dispatch(
      setFilter({
        ...filter,
        min_price: value[0],
        max_price: value[1],
        page: 1,
      })
    );
  };

  return (
    <div className="mb-10">
      <h3 className="mb-2 font-bold mt-4">Price Range</h3>
      <Slider
        max={parseFloat((price_rage?.max + 100).toFixed(2))}
        min={parseFloat((price_rage?.min - 100).toFixed(2))}
        step={1}
        value={[min_price ?? price_rage?.min, max_price ?? price_rage?.max]}
        handleAfterSliderChange={handlePriceChange}
        minStepsBetweenThumbs={0}
        className="my-3 bg-secondary"
        trackClassName="h-[3px]"
      />
      <div className="flex justify-between">
        <p className="text-sm text-gray-500">
          <span className="font-mono">৳</span>{" "}
          {formatNumber(min_price ?? price_rage?.min)}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-mono">৳</span>{" "}
          {formatNumber(max_price ?? price_rage?.max)}
        </p>
      </div>
    </div>
  );
};

// ! time filter
interface BoxContent {
  id: string;
  label: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
  minTime: string;
  maxTime: string;
}

interface TimeFilterProps {
  type: "departure" | "arrival";
}

const TimeFilter = ({ type }: TimeFilterProps) => {
  const { fields } = useAppSelector(useFlightSearch);
  const { filter, flightFilterData, loading } = useAppSelector(useFlightData);

  const filterItems =
    type === "departure"
      ? flightFilterData?.departure_time
      : flightFilterData?.arrival_time;

  const dispatch = useAppDispatch();

  const [activeBoxes, setActiveBoxes] = useState<string[]>(
    new Array(filterItems?.length || 0).fill(null)
  );

  const boxContent: BoxContent[] = [
    {
      id: "1",
      label: "00 - 06 AM",
      icon: <Icons.moonNight />,
      activeIcon: <Icons.activeMoonNight />,
      minTime: "00:00:00",
      maxTime: "06:00:00",
    },
    {
      id: "2",
      label: "06 - 12 PM",
      icon: <Icons.afterMoonNight />,
      activeIcon: <Icons.ActiveAfterMoonNight />,
      minTime: "06:00:00",
      maxTime: "12:00:00",
    },
    {
      id: "3",
      label: "12 - 06 PM",
      icon: <Icons.daySun />,
      activeIcon: <Icons.ActiveDaySun />,
      minTime: "12:00:00",
      maxTime: "18:00:00",
    },
    {
      id: "4",
      label: "06 - 12 AM",
      icon: <Icons.afterSun />,
      activeIcon: <Icons.ActiveAfterSun />,
      minTime: "18:00:00",
      maxTime: "00:00:00",
    },
  ];

  useEffect(() => {
    const minTimes: string[] = [];
    const maxTimes: string[] = [];

    activeBoxes.forEach((activeBox, index) => {
      if (activeBox) {
        const time = boxContent.find((box) => box.id === activeBox);
        const filterTime = filterItems?.[index];
        if (time && filterTime) {
          minTimes.push(
            `${filterTime.min.split("T")[0]}T${time.minTime}+${
              filterTime.min.split("+")[1]
            }`
          );
          maxTimes.push(
            `${filterTime.min.split("T")[0]}T${time.maxTime}+${
              filterTime.min.split("+")[1]
            }`
          );
        }
      } else {
        minTimes.push("null");
        maxTimes.push("null");
      }
    });

    const min_time = minTimes.join(",");
    const max_time = maxTimes.join(",");

    const timeFilter = {
      ...filter,
      ...(min_time !== null && {
        [type === "departure" ? "min_departure_time" : "min_arrival_time"]:
          min_time,
      }),
      ...(max_time !== null && {
        [type === "departure" ? "max_departure_time" : "max_arrival_time"]:
          max_time,
      }),
    };

    dispatch(setFilter(timeFilter));
  }, [activeBoxes, filterItems]);

  const handleBox = (index: number, id: string) => {
    if (loading) return;
    const newActiveBoxes = [...activeBoxes];
    if (newActiveBoxes[index] === id) {
      newActiveBoxes[index] = "";
    } else {
      newActiveBoxes[index] = id;
    }
    setActiveBoxes(newActiveBoxes);

    dispatch(setFilter({ ...filter, page: 1 }));
  };

  return (
    <div>
      {filterItems?.map((_, index) => (
        <div key={index} className="my-4">
          <p className="flex gap-2 text-sm font-bold text-start">
            {type.charAt(0).toUpperCase() + type.slice(1)} -
            {fields.map((_, index) => (
              <div key={index}>
                {/* {type === "departure"
                  ? `${field?.origin?.city_name ?? ""} - ${
                      field?.departure?.city_name ?? ""
                    }`
                  : `${field?.departure?.city_name ?? ""} - ${
                      field?.origin?.city_name ?? ""
                    }`} */}
              </div>
            ))}
          </p>
          <div className="flex items-center justify-between gap-0 p-1 mt-2">
            {boxContent.map((content) => (
              <div
                key={content.id}
                className={cn(
                  "cursor-pointer rounded shadow-sm",
                  activeBoxes[index] === content.id && "bg-muted",
                  loading && "cursor-not-allowed opacity-50"
                )}
                onClick={() => handleBox(index, content.id)}
              >
                <div className="flex flex-col items-center gap-1 px-1.5 py-2">
                  <p>
                    {activeBoxes[index] === content.id
                      ? content.activeIcon
                      : content.icon}
                  </p>
                  <p className="text-[10px] text-[#77818C]">{content.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
