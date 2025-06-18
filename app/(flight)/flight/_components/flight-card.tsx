import { AccordionTrigger } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { useFlightData } from "@/redux/slices/flight-data-slice";
import { IFlight } from "@/types/type.flight";
import {
  formatFlightDate,
  formatNumber,
  minutesToHoursAndMinutes,
  timeSlice,
} from "@/utils/date-time-formatter";
import { imageUrl } from "@/utils/image-url";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const FlightCard = ({ data }: { data: IFlight }) => {
  const searchId = useAppSelector(useFlightData).search_id;
  return (
    <div className="">
      <div className="relative items-center  justify-between gap-4 md:flex">
        <div className="absolute left-0 top-[10px] hidden items-center gap-2 md:flex">
          <div className="rounded bg-[#06aebd] px-2 py-[2px] text-[8px] text-white ">
            {!data.passengers[0].non_refundable
              ? "Refundable"
              : "nonRefundable"}
          </div>

          <div>
            <p className="bg-[#06aebd14] px-2 py-[2px] text-[9px] text-secondary">
              {data.passengers[0].availability[0].segments[0].available_seat}{" "}
              Seats
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2 px-3 pb-2 pt-3 ">
            <Image
              className="h-auto max-w-24 rounded"
              src={imageUrl(data.carrier_logo)}
              alt="airline_image"
              width={20}
              height={20}
              placeholder="blur"
              blurDataURL="data:image/webp;base64,UklGRngDAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggigEAAFAPAJ0BKokAiQA+7WaqTq01KKYumKtCoB2JZW7f+jwBwDiCr0Tt0Gy29sF5YFQjh9O84IStpshDU2KUryMR5lpzIBAiBBWUYV1UK62+nXZ5bGX4xxIU+U+cPzN8DXJ07YxMLmVCOhQbWZXrypCNt5B5zz/+7j9NlJxM8xcS//rr8GQAAP7wzJuF/q2WlbU9eOABfO/yU8HX/0qTIkJD2RBqfvUNYhE62jMc981x+r6aKUmeG7cpFHNR85rfxZLNlmO9f8pVl880VBDHUhLtWNgSxZFagJ7RmDGBUhRmCQcCE34Crds2Et5OiI21ogo03hTZNSxolshS+Orsj1u3hBIWhQt3+B9hHvvfOFWjo4K7Mnct5FT9j+/UWUrxzP4RmjIaIa0orxNPUSqpQc9b/HzcBj9cnvEFR4RH4zrXpUJJvLk3fLRp8KpIF8DUzGfLG0/bI2J5dqKKYerl1AAgwwhF67t7xoI1NhrfeH/NzS1Wt/GcvuwQCuDMbqx7QoOaB3dniQ9TdRMAAAA="
            />
            <p className="text-start text-xs ">{data.carrier_name}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded bg-[#06aebd] px-2 py-[2px] text-[8px] ">
              {!data.passengers[0].non_refundable
                ? "Refundable"
                : "nonRefundable"}
            </div>

            <div>
              <p className="bg-[#06aebd14] px-2 py-[2px] text-[9px] text-[#05939f]">
                {data.passengers[0].availability[0].segments[0].available_seat}{" "}
                Seats
              </p>
            </div>
          </div>
        </div>

        <div className="h-full w-full basis-10/12">
          <div
            className={cn(
              "top-0 flex-col py-0 pt-4 hover:no-underline md:flex [&>svg]:absolute [&>svg]:bottom-[17px] [&>svg]:left-[76%] [&>svg]:text-secondary [&>svg]:md:block md:[&>svg]:text-primary ",
              data?.flights.length < 2
                ? "[&>svg]:bottom-[12px] md:[&>svg]:bottom-[17px]"
                : "[&>svg]:bottom-[1.2vh] md:[&>svg]:bottom-[4.5vh]"
            )}
          >
            {data?.flights?.map((flights, index) => (
              <>
                <div
                  className="mb-2 hidden w-full gap-4 md:flex md:gap-8 "
                  key={index}
                >
                  <div className="flex basis-3/12 flex-col items-center md:basis-3/12 md:flex-row md:gap-2">
                    <Image
                      className="h-auto max-w-24 rounded"
                      src={imageUrl(data.carrier_logo)}
                      alt="airline_image"
                      width={55}
                      height={55}
                      placeholder="blur"
                      blurDataURL="data:image/webp;base64,UklGRngDAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggigEAAFAPAJ0BKokAiQA+7WaqTq01KKYumKtCoB2JZW7f+jwBwDiCr0Tt0Gy29sF5YFQjh9O84IStpshDU2KUryMR5lpzIBAiBBWUYV1UK62+nXZ5bGX4xxIU+U+cPzN8DXJ07YxMLmVCOhQbWZXrypCNt5B5zz/+7j9NlJxM8xcS//rr8GQAAP7wzJuF/q2WlbU9eOABfO/yU8HX/0qTIkJD2RBqfvUNYhE62jMc981x+r6aKUmeG7cpFHNR85rfxZLNlmO9f8pVl880VBDHUhLtWNgSxZFagJ7RmDGBUhRmCQcCE34Crds2Et5OiI21ogo03hTZNSxolshS+Orsj1u3hBIWhQt3+B9hHvvfOFWjo4K7Mnct5FT9j+/UWUrxzP4RmjIaIa0orxNPUSqpQc9b/HzcBj9cnvEFR4RH4zrXpUJJvLk3fLRp8KpIF8DUzGfLG0/bI2J5dqKKYerl1AAgwwhF67t7xoI1NhrfeH/NzS1Wt/GcvuwQCuDMbqx7QoOaB3dniQ9TdRMAAAA="
                    />
                    <p className="flex flex-col items-start gap-1">
                      <span className="text-[9px]  md:text-[13px]">
                        {data.carrier_name}
                      </span>
                    </p>
                  </div>

                  <div className="flex w-full justify-around">
                    <div className="">
                      <p className="md:text-[16px] md:font-bold">
                        {flights?.options[0]?.departure?.airport_code}
                        {" - "}
                        {timeSlice(flights?.options[0]?.departure?.time)}
                      </p>
                      <p className="text-xs text-secondary">
                        {format(
                          new Date(flights?.options[0]?.departure?.date),
                          "dd MMM, EEEE"
                        )}
                      </p>
                    </div>

                    <div className=" flex flex-col items-center justify-center">
                      <p className="text-xs">
                        {minutesToHoursAndMinutes(flights?.elapsed_time)?.time}
                      </p>
                      <div className="relative my-1 w-full border border-b md:w-[7vw]">
                        <div className="absolute left-[-1px] top-[-3px] hidden h-[6px] w-[6px] bg-muted md:block"></div>
                        <div className="absolute right-[-1px] top-[-3px] hidden h-[6px] w-[6px] bg-muted md:block"></div>
                      </div>
                      <p className="text-xs">
                        {flights?.stoppage + " Stop" || "Nonstop"}
                      </p>
                    </div>

                    <div>
                      <p className="md:text-[16px] md:font-bold">
                        {
                          flights?.options[flights?.options.length - 1]?.arrival
                            ?.airport_code
                        }
                        {" - "}
                        {timeSlice(
                          flights?.options[flights?.options.length - 1]?.arrival
                            ?.time
                        )}
                      </p>
                      <p className="text-xs text-secondary">
                        {format(
                          new Date(
                            flights?.options[
                              flights?.options.length - 1
                            ].arrival.date
                          ),
                          "dd MMM, EEEE"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                {/* mobile */}
                <div className="block w-full md:hidden">
                  <div className="rounded-lg bg-white px-4 py-2 dark:rounded-none dark:bg-black">
                    <div className="flex w-full items-center justify-between gap-6">
                      <div className="flex flex-col items-start">
                        <p className=" text-[14px]  font-bold leading-4">
                          {timeSlice(flights?.options[0]?.departure?.time)}
                        </p>
                        <p className="text-[12px]">
                          {flights?.options[0]?.departure?.city.split("-")[0]}
                        </p>
                        <p className="text-[11px] text-secondary">
                          {formatFlightDate(
                            flights?.options[0]?.departure?.date
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold">
                          {
                            minutesToHoursAndMinutes(flights?.elapsed_time)
                              ?.time
                          }
                        </p>
                        <div className="relative flex w-full items-center md:w-[10vw]">
                          <Image
                            className="h-auto max-w-24 rounded"
                            src={imageUrl(data.carrier_logo)}
                            alt="airline_image"
                            width={27}
                            height={27}
                            placeholder="blur"
                            blurDataURL="data:image/webp;base64,UklGRngDAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggigEAAFAPAJ0BKokAiQA+7WaqTq01KKYumKtCoB2JZW7f+jwBwDiCr0Tt0Gy29sF5YFQjh9O84IStpshDU2KUryMR5lpzIBAiBBWUYV1UK62+nXZ5bGX4xxIU+U+cPzN8DXJ07YxMLmVCOhQbWZXrypCNt5B5zz/+7j9NlJxM8xcS//rr8GQAAP7wzJuF/q2WlbU9eOABfO/yU8HX/0qTIkJD2RBqfvUNYhE62jMc981x+r6aKUmeG7cpFHNR85rfxZLNlmO9f8pVl880VBDHUhLtWNgSxZFagJ7RmDGBUhRmCQcCE34Crds2Et5OiI21ogo03hTZNSxolshS+Orsj1u3hBIWhQt3+B9hHvvfOFWjo4K7Mnct5FT9j+/UWUrxzP4RmjIaIa0orxNPUSqpQc9b/HzcBj9cnvEFR4RH4zrXpUJJvLk3fLRp8KpIF8DUzGfLG0/bI2J5dqKKYerl1AAgwwhF67t7xoI1NhrfeH/NzS1Wt/GcvuwQCuDMbqx7QoOaB3dniQ9TdRMAAAA="
                          />
                        </div>
                        <p className="text-[11px]">
                          {flights?.stoppage > 0
                            ? flights?.stoppage + " Stop"
                            : "Nonstop"}
                        </p>
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="leading-2 text-[14px] font-bold">
                          {timeSlice(
                            flights?.options[flights?.options.length - 1]
                              ?.arrival?.time
                          )}
                        </p>
                        <p className="text-[12px] ">
                          {
                            flights?.options[
                              flights?.options.length - 1
                            ]?.arrival?.city.split("-")[0]
                          }
                        </p>
                        <p className="text-[12px] text-secondary">
                          {formatFlightDate(
                            flights?.options[flights?.options.length - 1]
                              ?.arrival?.date
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between px-2 pb-2 md:hidden">
          <div className="flex items-center gap-2">
            <p className="flex items-center justify-end gap-1 text-[15px] font-[600] text-primary">
              <span className="font-mono text-[15px] ">৳</span>
              {formatNumber(data?.fare?.payable)}
            </p>
            <p className="text-[12px] text-destructive line-through">
              <span className="font-mono">৳</span>
              {formatNumber(data?.fare?.total_price)}
            </p>
          </div>
          <div className="flex gap-4">
            <Tooltip>
              <TooltipTrigger>
                <AccordionTrigger className="" />
              </TooltipTrigger>
              <TooltipContent>show details</TooltipContent>
            </Tooltip>
            <Link
              href={`/flight/${data.flight_id}?searchId=${searchId}`}
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "mt-1 h-6 w-full rounded px-4  md:h-7 search-button"
              )}
            >
              View <span className="ms-[3px] hidden md:block">Deal</span>
            </Link>
          </div>
        </div>

        <div className="relative hidden basis-3/12 md:block py-2">
          <div className="w-full md:ps-4">
            <div className="text-end">
              <p className="flex items-center justify-end gap-1 text-[18px] font-[600]">
                <span className="font-mono text-[15px]">৳</span>
                {formatNumber(data?.fare?.payable)}
              </p>
              <p className="mr-2 text-[12px] text-destructive line-through">
                <span className="font-mono">৳</span>
                {formatNumber(data?.fare?.total_price)}
              </p>
            </div>

            <div className="flex w-full gap-2 items-end">
              <Tooltip>
                <TooltipTrigger>
                  <AccordionTrigger className="" />
                </TooltipTrigger>
                <TooltipContent>show details</TooltipContent>
              </Tooltip>

              <Link
                href={`/flight/${data.flight_id}?searchId=${searchId}`}
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "mt-1 h-6 w-full rounded  md:h-7 search-button"
                )}
              >
                View <span className="ms-[3px] hidden md:block">Deal</span>
              </Link>
            </div>
          </div>
        </div>
        <Separator
          orientation="vertical"
          className="absolute right-[25%] top-0 hidden h-[100%]  w-[1px] md:block"
        />
      </div>
    </div>
  );
};

export { FlightCard };
