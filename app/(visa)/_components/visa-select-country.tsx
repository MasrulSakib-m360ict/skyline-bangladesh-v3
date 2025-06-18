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
import { toast } from "sonner";

interface VisaSelectCountryProps {
  value: string;
  onChange: (value: string) => void;
  name: string;
}

const VisaSelectCountry: React.FC<VisaSelectCountryProps> = ({
  value,
  onChange,
  name,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data, isLoading } = useCountryListQuery(
    [
      { name: "name", value: debouncedSearchTerm },
      { name: "limit", value: 20 },
      { name: "skip", value: 0 },
    ],
    {
      refetchOnReconnect: false,
      refetchOnMountOrArgChange: true,
    }
  );

  const handleSetValues = (country: ICountry) => {
    const requiredFields = ["iso", "name"];
    const missingFields = requiredFields.filter(
      (field) => !country[field as keyof ICountry]
    );

    if (missingFields.length > 0) {
      toast.error(`Invalid country data: Missing ${missingFields.join(", ")}`);
      return;
    }
    onChange(country.iso + "-" + country.name);
    setIsOpen(false);
  };

  const [isoCode, countryName] = value?.split("-") || [];

  return (
    <div className="w-full text-black">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger className="w-full border rounded-md ">
          <div className="flex justify-between items-center p-4 h-10 rounded-md ">
            <p className="uppercase">
              {countryName ? `${countryName} (${isoCode})` : "Select Country"}
            </p>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-2 border rounded-md shadow-lg w-60">
          <Input
            name={name}
            type="text"
            placeholder="Search Countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-md p-2 mb-2"
          />
          <div className="text-sm h-72 overflow-auto">
            {isLoading ? (
              <div className="text-gray-500 p-2">Loading countries...</div>
            ) : (
              <>
                {data && data.data && data.data.length > 0 ? (
                  data.data.map((country, i) => (
                    <div
                      key={i}
                      onClick={() => handleSetValues(country)}
                      className="cursor-pointer hover:bg-gray-200 p-2 rounded-md flex justify-between items-center"
                    >
                      <p className="text-gray-800 text-sm truncate w-56 ">
                        {country.name}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 p-2">No countries found</div>
                )}
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default VisaSelectCountry;
