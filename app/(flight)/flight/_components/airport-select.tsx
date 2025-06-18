"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@/hooks/use-debounce";

import { Input } from "@/components/ui/input";
import { useAirportListQuery } from "@/redux/api/flight.api";
import { IAirportList } from "@/types/type.flight";
import { useState } from "react";

interface AirportSelectProps {
  value: string;
  onChange: (value: string) => void;
  name: string;
}

const AirportSelect: React.FC<AirportSelectProps> = ({
  value,
  onChange,
  name,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Apply debounce to the search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Use query to get the airport data
  const { data, isLoading } = useAirportListQuery(
    [
      { name: "name", value: debouncedSearchTerm },
      { name: "limit", value: 100 },
      { name: "skip", value: 0 },
    ],
    {
      refetchOnReconnect: false,
      refetchOnMountOrArgChange: true,
    }
  );

  const handleSetValues = (data: IAirportList) => {
    const formateData = `${data.iata_code} - ${data.name} - ${data.country_name}`;
    onChange(formateData);
    setIsOpen(false);
  };

  const [iataCode, trName, countryName] = value?.split(" - ") || [];

  return (
    <div className="w-full text-black">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger className="w-full border rounded-md focus:ring-2 focus:ring-blue-500">
          <div className=" flex justify-between items-center">
            <span className="h-12 w-full">
              {value ? (
                <div className="flex items-center  rounded-lg h-full p-4 overflow-hidden">
                  <p className="font-semibold text-[16px] text-gray-800">
                    {iataCode}
                  </p>
                  <div className="border border-gray-100 h-full mx-2"></div>
                  <div className="text-start p-2">
                    <p className="text-sm text-gray-500 truncate w-56">
                      {countryName}
                    </p>
                    <p className="text-sm text-gray-700 truncate w-56">
                      {trName}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex w-full h-full rounded-md items-center pl-4 border border-red-400">
                  <p className="text-gray-500">Select Airport</p>
                </div>
              )}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-2 border rounded-md shadow-lg w-72">
          <Input
            name={name}
            type="text"
            placeholder="Search Airports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-md p-2 mb-2"
          />

          <div className="text-sm h-72 overflow-auto">
            {isLoading ? (
              <div className="text-gray-500 p-2">Loading airports...</div>
            ) : (
              <>
                {data && data.data && data.data.length > 0 ? (
                  data.data.map((airport, i) => (
                    <div
                      key={i} // Ensure a unique key
                      onClick={() => handleSetValues(airport)}
                      className="cursor-pointer hover:bg-gray-200 p-2 rounded-md flex justify-between items-center"
                    >
                      <div className="flex items-center  rounded-lg h-12">
                        <p className="font-semibold text-[16px] text-gray-800 w-10 truncate">
                          {airport.iata_code}
                        </p>
                        <div className="border border-gray-100 h-full mx-2"></div>
                        <div className="text-start p-2">
                          <p className="text-sm w-36 truncate">
                            {airport.country_name}
                          </p>
                          <p className="text-sm  text-gray-700 truncate  w-36">
                            {airport.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 p-2">No airports found</div>
                )}
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AirportSelect;
