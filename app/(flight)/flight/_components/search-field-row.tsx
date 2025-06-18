"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setFlightRoute,
  setPassenger,
  setTicketClass,
  useFlightSearch,
} from "@/redux/slices/flight-search.slice";

import { TFlightClass, TFlightRoute } from "@/types/type.flight";
import {
  decodeQueryPassengers,
  decodeQuerySegments,
  formatQuerySegments,
} from "@/utils/formatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { IoMdRemoveCircle } from "react-icons/io";
import { MdAddCircle, MdSwapHoriz } from "react-icons/md";
import { z } from "zod";
import AirportSelect from "./airport-select";

// ----------------------- Schema Definitions -----------------------
const flightSegmentSchema = z.object({
  from: z.string().min(1, { message: "From airport is required." }),
  to: z.string().min(1, { message: "To airport is required." }),
  date: z.array(z.date()).min(1, { message: "Date is required." }),
});

const roundTripSegmentSchema = flightSegmentSchema.extend({
  date: z
    .tuple([
      z
        .date()
        .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
          message: "Departure date is required.",
        }),
      z
        .date()
        .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
          message: "Return date is required.",
        }),
    ])
    .refine(
      ([departureDate, returnDate]) => {
        if (!departureDate || !returnDate) {
          return true;
        }
        return returnDate > departureDate;
      },
      {
        message: "Return date must be after departure date.",
        path: ["date", 1],
      }
    ),
});

const baseSchema = z.object({
  segments: z
    .array(flightSegmentSchema)
    .min(1, { message: "At least one flight segment is required." }),
});

const roundTripSchema = z.object({
  segments: z
    .array(roundTripSegmentSchema)
    .min(1, { message: "At least one flight segment is required." }),
});

const getFormSchema = (flightRoute: string) => {
  return flightRoute === "roundway" ? roundTripSchema : baseSchema;
};

export type FlightFormValues = z.infer<ReturnType<typeof getFormSchema>>;

// ----------------------- FlightSearch Component -----------------------

const FlightSearch = ({
  onSubmitAddition,
}: {
  onSubmitAddition?: () => void;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  // path mane
  const pathname = usePathname();

  const [isRotated, setIsRotated] = useState<boolean[]>([]);
  const [openDates, setOpenDates] = useState<boolean[]>([]);
  const { flightRoute, passenger, ticketClass } =
    useAppSelector(useFlightSearch);
  const formSchema = getFormSchema(flightRoute);

  // Initialize the form with react-hook-form
  const form = useForm<FlightFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      segments: [
        {
          from: "DAC - Dhaka - Hazrat Shahjalal International Airport - Bangladesh",
          to: "JFK - New York - John F. Kennedy International Airport - United States",
          date:
            flightRoute === "roundway"
              ? [addDays(new Date(), 5), addDays(new Date(), 10)]
              : [addDays(new Date(), 5)],
        },
      ],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "segments",
  });

  // Handler to add a new flight segment
  const handleAddSegment = () => {
    const currentSegments = form.getValues("segments");
    const lastSegment = currentSegments[currentSegments.length - 1];
    const newDate = addDays(new Date(lastSegment.date[0]), 3);
    append({
      from: lastSegment.to,
      to: "",
      date:
        flightRoute === "roundway" ? [newDate, addDays(newDate, 5)] : [newDate],
    });
  };

  // Handler to swap the "From" and "To" airports
  const handleSwap = (index: number) => {
    const currentSegments = form.getValues("segments");
    const fromAirport = currentSegments[index].from;
    const toAirport = currentSegments[index].to;
    // Swap the values
    form.setValue(`segments.${index}.from`, toAirport);
    form.setValue(`segments.${index}.to`, fromAirport);
    setIsRotated((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handleOpenChange = (index: number, isOpen: boolean) => {
    setOpenDates((prev) => {
      const updated = [...prev];
      updated[index] = isOpen;
      return updated;
    });
  };

  const getMinDateForNextSegment = (index: number) => {
    const selectedDate = form.getValues(`segments.${index}.date.0`);
    return selectedDate ? selectedDate : new Date();
  };

  const onSubmit: SubmitHandler<FlightFormValues> = (data) => {
    const segments = formatQuerySegments(data.segments, flightRoute);

    const passengers = `adults=${passenger.adult}&children=${passenger.child}&infants=${passenger.infant}&kids=${passenger.kid}`;
    router.push(
      `/flight?${passengers}&ticketClass=${ticketClass}&${segments}&tripType=${flightRoute}`
    );
    if (onSubmitAddition) {
      onSubmitAddition();
    }
  };

  useEffect(() => {
    const currentSegments = form.getValues("segments");
    let requiredSegments = 1;

    if (flightRoute === "multiway") {
      requiredSegments = Math.max(currentSegments.length, 2);
    }
    if (currentSegments.length < requiredSegments) {
      const segmentsToAdd = requiredSegments - currentSegments.length;
      const lastSegment = currentSegments[currentSegments.length - 1];
      const newSegments = Array(segmentsToAdd)
        .fill(null)
        .map((_, index) => {
          const from = index === 0 && lastSegment ? lastSegment.to : "";
          const date = addDays(
            lastSegment ? lastSegment.date[0] : new Date(),
            3 * (index + 1)
          );
          return {
            from,
            to: "",
            date:
              flightRoute === "roundway" ? [date, addDays(date, 5)] : [date],
          };
        });
      append(newSegments);
    } else if (
      currentSegments.length > requiredSegments &&
      (flightRoute === "oneway" || flightRoute === "roundway")
    ) {
      replace(currentSegments.slice(0, requiredSegments));
    }
  }, [flightRoute, append, replace, form]);

  useEffect(() => {
    if (pathname !== "/flight") return; // Only run on the flight page
    const queryString = searchParams.toString();
    console.log("queryString", queryString);
    const ticketClass = searchParams.get("ticketClass");
    if (ticketClass) {
      dispatch(setTicketClass(ticketClass as TFlightClass));
    }
    const tripType = searchParams.get("tripType");
    if (tripType) {
      dispatch(setFlightRoute(tripType as TFlightRoute));
    }
    if (queryString) {
      const decodedSegments = decodeQuerySegments(queryString);
      const searchPassengers = decodeQueryPassengers(queryString);
      dispatch(setPassenger(searchPassengers));
      form.reset({ segments: decodedSegments });
    }
  }, [searchParams, pathname]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(" text-black relative", {
          "text-end": flightRoute === "multiway",
        })}
      >
        {fields.map((field, index) => (
          <div key={field.id}>
            {/* From Airport Field */}
            <div className="flex flex-col lg:flex-row w-full items-center  gap-2">
              <div className="flex flex-col lg:flex-row w-full lg:w-2/3 gap-2 relative">
                <FormField
                  control={form.control}
                  name={`segments.${index}.from`}
                  render={({ field }) => (
                    <FormItem className=" w-full text-start min-h-[72px]">
                      {/* <FormLabel>From Airport</FormLabel> */}
                      <FormControl>
                        <AirportSelect
                          name={`segments.${index}.from`}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* To Airport Field */}
                <FormField
                  control={form.control}
                  name={`segments.${index}.to`}
                  render={({ field }) => (
                    <FormItem className=" w-full text-start min-h-[72px] ">
                      {/* <FormLabel>To Airport</FormLabel> */}
                      <FormControl>
                        <AirportSelect
                          name={`segments.${index}.to`}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Swap Button */}
                <div className="absolute top-[50px] rotate-90 lg:rotate-0  lg:top-4 left-[85%] lg:left-[48.6%]">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className={`transition-transform duration-300 lg:rounded-full h-5 w-5 ${
                          isRotated[index] ? "rotate-180" : ""
                        }`}
                        onClick={() => handleSwap(index)}
                      >
                        <MdSwapHoriz className="w-6 h-6" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Swap</TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Date Field */}
              <FormField
                control={form.control}
                name={`segments.${index}.date`}
                render={({ field }) => {
                  const isRoundWay = flightRoute === "roundway";
                  const dates = field.value as Date[] | undefined;
                  return (
                    <FormItem className="w-full lg:w-1/3  text-start min-h-[72px]">
                      <FormControl>
                        <Popover
                          key={index}
                          open={openDates[index] || false}
                          onOpenChange={(isOpen: boolean) =>
                            handleOpenChange(index, isOpen)
                          }
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal h-12",
                                !dates?.length && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dates && dates.length > 0
                                ? isRoundWay
                                  ? dates[0] && dates[1]
                                    ? `${format(
                                        dates[0],
                                        "LLL dd, y"
                                      )} - ${format(dates[1], "LLL dd, y")}`
                                    : dates[0]
                                    ? `${format(
                                        dates[0],
                                        "LLL dd, y"
                                      )} - Pick a return date`
                                    : dates[1]
                                    ? `Pick a departure date - ${format(
                                        dates[1],
                                        "LLL dd, y"
                                      )}`
                                    : "Pick departure and return dates"
                                  : format(dates[0], "LLL dd, y")
                                : `Pick ${isRoundWay ? "dates" : "a date"}`}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            {isRoundWay ? (
                              <Calendar
                                initialFocus
                                numberOfMonths={2}
                                mode="range"
                                defaultMonth={dates?.[0]}
                                selected={{
                                  from: dates?.[0],
                                  to: dates?.[1],
                                }}
                                onSelect={(newDate) => {
                                  field.onChange([newDate?.from, newDate?.to]);
                                }}
                                disabled={(date) => date <= new Date()}
                              />
                            ) : (
                              <Calendar
                                mode="single"
                                selected={dates?.[0]}
                                onSelect={(selectedDate) => {
                                  if (!selectedDate) return;
                                  field.onChange([selectedDate]);
                                }}
                                disabled={(date) =>
                                  date < new Date() ||
                                  (flightRoute === "multiway" &&
                                    date < getMinDateForNextSegment(index - 1))
                                }
                                initialFocus
                              />
                            )}

                            <div className="flex justify-end pr-4 pb-2 gap-2">
                              <Button
                                size={"sm"}
                                variant={"destructive"}
                                type="button"
                                onClick={() => {
                                  form.setValue(`segments.${index}.date`, [
                                    addDays(new Date(), 5),
                                    addDays(new Date(), 10),
                                  ]);
                                }}
                              >
                                Reset
                              </Button>

                              <Button
                                size={"sm"}
                                type="button"
                                onClick={() => handleOpenChange(index, false)}
                              >
                                Ok
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {flightRoute === "multiway" && (
                <>
                  {index > 1 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant={"link"}
                          size={"icon"}
                          onClick={() => remove(index)}
                          className=""
                        >
                          <IoMdRemoveCircle className="w-6 h-6 text-red-600" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Remove Flight</TooltipContent>
                    </Tooltip>
                  )}
                </>
              )}
            </div>
          </div>
        ))}

        <div
          className={cn("flex  ", {
            "justify-between": flightRoute === "multiway",
            "justify-center": flightRoute !== "multiway",
          })}
        >
          {flightRoute === "multiway" && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={"outline"}
                  size={"default"}
                  onClick={handleAddSegment}
                  className="flex gap-2"
                >
                  <MdAddCircle className=" text-primary" />
                  <span>Add Flight</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add Flight</TooltipContent>
            </Tooltip>
          )}
          {/* Submit Button */}
          <Button
            variant={"secondary"}
            type="submit"
            className="search-button lg:mt-0"
          >
            Search Flights
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FlightSearch;
