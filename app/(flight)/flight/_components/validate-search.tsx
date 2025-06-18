"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { classFields } from "@/const/select-field";
import { decodeQueryPassengers, decodeQuerySegments } from "@/utils/formatter";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import SearchEngine from "./search-engine";

const ValidateSearch = () => {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const decodedSegments = decodeQuerySegments(queryString);
  const searchPassengers = decodeQueryPassengers(queryString);
  const tripType = searchParams.get("tripType");
  const ticketClass = searchParams.get("ticketClass");

  const totalTravelers =
    searchPassengers.adult +
    searchPassengers.child +
    searchPassengers.kid +
    searchPassengers.infant;

  const ticketClassValue = classFields.find(
    (item) => item.value === ticketClass
  )?.label;

  const firstSegment = decodedSegments[0];
  const lastSegment = decodedSegments[decodedSegments.length - 1] || {};

  const firstSegmentDate = dayjs(firstSegment.date[0]).format("DD-MMM");
  const lastSegmentDate = dayjs(
    lastSegment.date[lastSegment.date.length - 1]
  ).format("DD-MMM");

  const [origin, originCity] = firstSegment.from.split(" - ") || [];
  const [destination, destinationCity] = lastSegment.to.split(" - ") || [];

  const [isSearchEngineOpen, setSearchEngineOpen] = useState(false);

  const handleModifySearch = () => {
    setSearchEngineOpen((prev) => !prev);
  };

  return (
    <div className="duration-1000 relative">
      {!isSearchEngineOpen && (
        <div className="flex justify-between py-2 pt-6">
          <div className="">
            <div className="font-bold leading-3 flex gap-2">
              <span className="md:text-[18px]">{origin}</span>—
              <span className="md:text-[18px]">{destination}</span>
            </div>

            <div className="flex gap-2 text-sm mt-2">
              <p className="capitalize hidden md:block">{tripType}</p>
              <span className="mx-1 hidden md:block">•</span>
              <p className="flex gap-3">
                {firstSegmentDate} - {lastSegmentDate}
              </p>
              <span className="mx-1">•</span>
              <p>
                {totalTravelers} {totalTravelers > 1 ? "Travelers" : "Traveler"}
              </p>
              <span className="mx-1 hidden md:block">•</span>
              <p className="capitalize hidden md:block">{ticketClassValue}</p>
            </div>
          </div>
          <div className="">
            <Button
              variant="secondary"
              size="sm"
              className="mt-1"
              onClick={handleModifySearch}
            >
              Modify
              <span className="hidden md:block pl-1"> Search</span>
            </Button>
          </div>
        </div>
      )}
      <div className="">
        <Accordion
          type="single"
          value={isSearchEngineOpen ? "search" : ""}
          onValueChange={(value) => setSearchEngineOpen(value === "search")}
        >
          <AccordionItem value="search" className="border-none">
            <AccordionContent className="pt-4">
              <SearchEngine onSubmit={() => setSearchEngineOpen(false)} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {isSearchEngineOpen && (
        <Button
          onClick={handleModifySearch}
          variant={"link"}
          className="absolute -bottom-5 right-0"
        >
          <Tooltip>
            <TooltipTrigger>
              <MdCancel className="text-[#F87171] text-3xl 2" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-sm">Close Search</div>
            </TooltipContent>
          </Tooltip>
        </Button>
      )}
    </div>
  );
};

export default ValidateSearch;
