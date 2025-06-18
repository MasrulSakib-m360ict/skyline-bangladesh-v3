import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setFilter, useFlightData } from "@/redux/slices/flight-data-slice";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

// Define a mapping of filter keys to display names
const filterDisplayNames: { [key: string]: string } = {
  carrier_operating: "Carrier",
  max_price: "Price",
  min_price: "Price",
  sort_by: "Sort",
  stoppage: "Stoppage",
  refundable: "Refundable",
  baggage: "Baggage",
  min_departure_time: "Departure Time",
  max_departure_time: "Departure Time",
  min_arrival_time: "Arrival Time",
  max_arrival_time: "Arrival Time",
};

const FilterAction = () => {
  const { filter } = useAppSelector(useFlightData);
  const dispatch = useAppDispatch();

  const displayedFilters = new Set<string>(); // Track displayed filter names

  const handleClearFilter = (key: string) => {
    const updatedFilter = { ...filter };

    // Clear related filter keys
    switch (key) {
      case "min_price":
      case "max_price":
        updatedFilter.min_price = undefined;
        updatedFilter.max_price = undefined;
        break;
      case "min_arrival_time":
      case "max_arrival_time":
        updatedFilter.min_arrival_time = "null";
        updatedFilter.max_arrival_time = "null";
        break;
      case "min_departure_time":
      case "max_departure_time":
        updatedFilter.min_departure_time = "null";
        updatedFilter.max_departure_time = "null";
        break;
      default:
        updatedFilter[key as keyof typeof filter] = undefined;
        break;
    }

    dispatch(setFilter(updatedFilter));
  };

  const appliedFilters = Object.keys(filter).filter(
    (key) =>
      filter[key as keyof typeof filter] !== undefined &&
      filter[key as keyof typeof filter] !== "" &&
      filter[key as keyof typeof filter] !== "null" &&
      ![
        "min_departure_time",
        "max_departure_time",
        "min_arrival_time",
        "max_arrival_time",
        "page",
      ].includes(key)
  );

  return (
    <div className="flex items-center gap-2">
      {appliedFilters.length > 0 && (
        <span className="text-sm text-gray-400">Filters:</span>
      )}

      <div className="flex gap-1">
        {appliedFilters.map((key) => {
          const displayName = filterDisplayNames[key] || key;
          if (displayedFilters.has(displayName)) {
            return null;
          }
          displayedFilters.add(displayName);
          return (
            <Tooltip key={key}>
              <TooltipContent>Clear filter by {displayName}</TooltipContent>
              <TooltipTrigger>
                <Button
                  size="sm"
                  onClick={() => handleClearFilter(key)}
                  className=""
                >
                  {displayName}
                </Button>
              </TooltipTrigger>
            </Tooltip>
          );
        })}

        {appliedFilters.length > 1 && (
          <Tooltip>
            <TooltipContent>Remove all filters</TooltipContent>

            <TooltipTrigger>
              <Button
                size="sm"
                onClick={() => dispatch(setFilter({}))}
                className=""
              >
                Remove Filters
              </Button>
            </TooltipTrigger>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default FilterAction;
