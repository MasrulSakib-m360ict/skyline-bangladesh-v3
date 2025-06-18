// Passenger.tsx

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  decrementPassenger,
  incrementPassenger,
  resetPassenger,
  useFlightSearch,
} from "@/redux/slices/flight-search.slice";
import {
  Baby,
  ChevronDown,
  Minus,
  Plus,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import React from "react";

// Define the types for passenger categories
type PassengerType = "adult" | "child" | "kid" | "infant";

// Passenger category data
const passengerTypes: {
  type: PassengerType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    type: "adult",
    label: "Adults",
    description: "12 years & above",
    icon: UserCheck,
  },
  {
    type: "child",
    label: "Children",
    description: "From 5 to under 12",
    icon: Users,
  },
  {
    type: "kid",
    label: "Kids",
    description: "From 2 to under 5",
    icon: User,
  },
  {
    type: "infant",
    label: "Infants",
    description: "Under 2 years",
    icon: Baby,
  },
];

// Reusable PassengerCounter component
const PassengerCounter: React.FC<{
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}> = ({ label, description, icon: Icon, count, onIncrement, onDecrement }) => (
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center space-x-3">
      <Icon className="w-6 h-6 text-gray-600" />
      <div>
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-xs text-gray-500">{description}</span>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onDecrement}
        disabled={count === 0}
        aria-label={`Decrease ${label}`}
      >
        <Minus size={16} />
      </Button>
      <span className="text-center text-sm">{count}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={onIncrement}
        aria-label={`Increase ${label}`}
      >
        <Plus size={16} />
      </Button>
    </div>
  </div>
);

// Main Passenger component
const Passenger: React.FC = () => {
  const dispatch = useAppDispatch();
  const { passenger } = useAppSelector(useFlightSearch);
  const [open, setOpen] = React.useState(false);

  // Calculate total passengers
  const totalPassengers =
    passenger.adult + passenger.child + passenger.kid + passenger.infant;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size={"sm"}
          variant="outline"
          className="flex items-center space-x-2 w-full"
          aria-haspopup="dialog"
        >
          <Users size={18} className="hidden md:block" />
          <span className="text-sm">
            {totalPassengers} {totalPassengers > 1 ? "Travelers" : "Traveler"}
          </span>
          <ChevronDown
            size={20}
            className={`transform transition-transform duration-500 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 pl-4 ml-4 md:ml-0">
        <div className="mb-4 ">
          <h4 className=" font-semibold">Passengers</h4>
          <p className="text-xs text-gray-500">
            Select the number of passengers
          </p>
        </div>
        {passengerTypes.map(({ type, label, description, icon }) => (
          <PassengerCounter
            key={type}
            label={label}
            description={description}
            icon={icon}
            count={passenger[type]}
            onIncrement={() => dispatch(incrementPassenger(type))}
            onDecrement={() => dispatch(decrementPassenger(type))}
          />
        ))}
        <div className="flex justify-end mt-1 gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => dispatch(resetPassenger())}
          >
            Reset
          </Button>

          <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
            Ok
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { Passenger };
