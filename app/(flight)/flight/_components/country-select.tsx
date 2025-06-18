"use client";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@/hooks/use-debounce";
import { useCountryListQuery } from "@/redux/api/flight.api";
import { ICountry } from "@/types/type.flight";
import { useState } from "react";

const CountrySelect: React.FC<any> = ({ ...props }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Apply debounce to the search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Use query to get the country data, triggering a new search when debouncedSearchTerm changes
  const { data, isLoading } = useCountryListQuery(
    [
      { name: "limit", value: 50 },
      { name: "name", value: debouncedSearchTerm },
    ],
    {
      refetchOnReconnect: false,
      refetchOnMountOrArgChange: true,
    }
  );

  const handleSetValues = (country: ICountry) => {
    props.onChange(country.iso3);
    setIsOpen(false);
  };

  return (
    <div className="w-full text-black">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger className="w-full">
          <Input {...props} className="py-1 text-sm" placeholder="Select " />
        </PopoverTrigger>
        <PopoverContent className="p-1 border rounded shadow-md w-60">
          <Input
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded p-1 mb-1 text-sm"
          />

          <div className="text-sm h-56 overflow-auto">
            {isLoading ? (
              <div className="text-gray-500 p-1">Loading countries...</div>
            ) : (
              <>
                {data && data.data && data.data.length > 0 ? (
                  data.data.map((country, i) => (
                    <div
                      key={i}
                      onClick={() => handleSetValues(country)}
                      className="cursor-pointer hover:bg-gray-100 p-1 rounded flex justify-between items-center"
                    >
                      <p className="font-medium text-[14px] text-gray-800 truncate">
                        {country.name}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 p-1">No countries found</div>
                )}
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CountrySelect;
