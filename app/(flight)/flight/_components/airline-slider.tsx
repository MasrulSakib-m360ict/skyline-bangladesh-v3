"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setFilter, useFlightData } from "@/redux/slices/flight-data-slice";
import { formatNumber } from "@/utils/date-time-formatter";
import { imageUrl } from "@/utils/image-url";
import Image from "next/image";

const AirlineSlider = () => {
  const dispatch = useAppDispatch();
  const { filter, flightFilterData } = useAppSelector(useFlightData);
  const { airlines } = flightFilterData;

  const filterAirlines = filter.carrier_operating?.split(",") ?? [];

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

  return (
    <Card className="mb-3 border-none shadow-md md:mb-4 ">
      <CardContent className="p-0">
        <Carousel>
          <CarouselContent>
            {airlines &&
              airlines.map((airline) => (
                <CarouselItem
                  className="flex h-auto w-full basis-28 justify-between  pl-0 md:basis-36"
                  key={airline.airline_code}
                >
                  <button
                    className={cn(
                      buttonVariants({}),
                      "relative flex h-auto basis-80 flex-col rounded-none bg-transparent text-center  hover:bg-[#1884ff31]",
                      filterAirlines.includes(airline.airline_code) &&
                        "bg-[#1884ff31]"
                    )}
                    onClick={() => handleAirline(airline.airline_code)}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={imageUrl(airline.airline_logo)}
                        alt={airline.airline_name}
                        height={30}
                        width={30}
                        objectFit="cover"
                        objectPosition="center"
                      />
                      <div className="text-start">
                        <p className="text-black">{airline.airline_code}</p>
                        <p className="text-xs ">
                          <span className="me-[4px] font-mono font-bold text-black ">
                            ৳
                          </span>
                          <span className="text-[#77818C]">
                            {formatNumber(airline.price)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </button>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default AirlineSlider;
