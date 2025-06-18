"use client";
import { classFields } from "@/const/select-field";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setFlightRoute,
  setTicketClass,
  useFlightSearch,
} from "@/redux/slices/flight-search.slice";
import { TFlightClass, TFlightRoute } from "@/types/type.flight";
import { ArrowLeftRight, ArrowRight, MapPin } from "lucide-react";
import { Suspense } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Passenger } from "./passenger";
import FlightSearch from "./search-field-row";

const SearchEngine = ({ onSubmit }: { onSubmit?: () => void }) => {
  const dispatch = useAppDispatch();

  const { flightRoute, ticketClass } = useAppSelector(useFlightSearch);

  //  * state for flightRoute
  const flightRoutes: {
    label: string;
    value: TFlightRoute;
    Icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { label: "One Way", value: "oneway", Icon: ArrowRight },
    { label: "Round Trip", value: "roundway", Icon: ArrowLeftRight },
    { label: "Multi City", value: "multiway", Icon: MapPin },
  ];
  const handleRouteClick = (value: TFlightRoute) => {
    dispatch(setFlightRoute(value)); // Update the flight route
  };
  // ! state end for flightRoute

  return (
    <div className=" p-4 pt-10">
      {/* //! header of search engine  */}
      <div className="flex flex-col gap-4 md:flex-row justify-between w-full ">
        {/* Route */}
        <RadioGroup
          value={flightRoute}
          onValueChange={(value) => handleRouteClick(value as TFlightRoute)}
          className="flex gap-4"
        >
          {flightRoutes.map(({ label, value, Icon }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={value} />
              <label htmlFor={value} className="flex items-center space-x-2">
                <span className="md:text-base text-sm">{label}</span>
              </label>
            </div>
          ))}
        </RadioGroup>

        <div className="text-black flex gap-2 items-center">
          {/* trailers */}
          <Passenger />
          {/* Class */}
          <Select
            value={ticketClass}
            onValueChange={(value) =>
              dispatch(setTicketClass(value as TFlightClass))
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Classes</SelectLabel>
                {classFields.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* //! end of header section */}

      {/* //! body of search engine */}
      <div className=" mt-2">
        <Suspense fallback={<div>Loading...</div>}>
          <FlightSearch onSubmitAddition={onSubmit} />
        </Suspense>
      </div>
    </div>
  );
};

export default SearchEngine;
