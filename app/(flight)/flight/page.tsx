"use client";

import ValidateSearch from "@/app/(flight)/flight/_components/validate-search";
import Container from "@/components/container";
import InfiniteScroll from "@/components/infinite-scroll";
import SkeletonLoader from "@/components/skeleton-loader";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import planeAnimation from "@/public/lottie/no_flight.json";
import {
  useFlightFilterQuery,
  useFlightInitialDataMutation,
} from "@/redux/api/flight.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  resetFilter,
  restDataSlice,
  setFilter,
  useFlightData,
} from "@/redux/slices/flight-data-slice";
import { resetFlightData } from "@/redux/slices/flight-search.slice";
import { IFilterState, TFlightClass, TFlightRoute } from "@/types/type.flight";
import {
  decodeQueryPassengers,
  decodeQuerySegments,
  flightRequestFormatter,
} from "@/utils/formatter";
import { AccordionItem } from "@radix-ui/react-accordion";
import { Render } from "keep-render";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { lazy, useEffect, useState } from "react";
import { FaSlidersH } from "react-icons/fa";
import Swal from "sweetalert2";
import AirlineSlider from "./_components/airline-slider";
import FilterAction from "./_components/filter-action";
import FlightFilter from "./_components/flight-filter";
import FlightTabs from "./_components/flight-tabs";
import TimeCounter from "./_components/time-counter";
const Lottie = lazy(() => import("lottie-react"));

const Flight = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const decodedSegments = decodeQuerySegments(queryString);
  const searchPassengers = decodeQueryPassengers(queryString);
  const tripType = searchParams.get("tripType") as TFlightRoute;
  const ticketClass = searchParams.get("ticketClass") as TFlightClass;

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  const {
    count,
    data,
    filter,
    type,
    loading,
    search_id,
    flightFilterData,
    hasMore,
  } = useAppSelector(useFlightData);

  const isFilterEmpty = (filter: IFilterState): boolean => {
    const { page, ...rest } = filter;
    if (page === 1) {
      return !Object.values(rest).some(
        (value) => value !== null && value !== "null" && value !== ""
      );
    }
    return !Object.values(filter).some(
      (value) => value !== null && value !== "null" && value !== ""
    );
  };

  const [flightInitialData, { isLoading, isError }] =
    useFlightInitialDataMutation();

  const loadInitialData = async () => {
    await flightInitialData(
      flightRequestFormatter({
        fields: decodedSegments,
        passenger: searchPassengers,
        ticketClass,
        flightRoute: tripType,
      })
    );
  };

  const {
    isError: searchError,
    error,
    isLoading: filterLoading,
    isFetching: filterIsFetching,
  } = useFlightFilterQuery(
    [
      { name: "search_id", value: search_id },
      { name: "max_price", value: filter?.max_price },
      { name: "min_price", value: filter?.min_price },
      { name: "refundable", value: filter?.refundable },
      { name: "sort_by", value: filter?.sort_by },
      { name: "carrier_operating", value: filter?.carrier_operating },
      { name: "baggage", value: filter?.baggage },
      { name: "stoppage", value: filter?.stoppage ? [filter?.stoppage] : "" },
      { name: "min_departure_time", value: filter?.min_departure_time },
      { name: "max_departure_time", value: filter?.max_departure_time },
      { name: "min_arrival_time", value: filter?.min_arrival_time },
      { name: "max_arrival_time", value: filter?.max_arrival_time },
      { name: "page", value: filter.page },
      { name: "size", value: 25 },
    ],
    {
      skip: isFilterEmpty(filter) && type === "init",
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    dispatch(resetFilter());
    loadInitialData();
  }, [searchParams]);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: " No flight found !!",
        timer: 3000,
      });
      router.push("/");
    }
  }, [isError]);

  // ! handle error is data is lost
  useEffect(() => {
    if (searchError) {
      const message = error as any;
      if (message?.data?.message == "Data lost! Search again.") {
        dispatch(resetFlightData());
        dispatch(restDataSlice());
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data lost! Search again.",
          timer: 3000,
        });
        router.push("/");
      }
    }
  }, [searchError, error]);

  const handleTabChange = (value: string) => {
    dispatch(setFilter({ ...filter, sort_by: value, page: 1 }));
  };

  return (
    <div className="min-h-screen">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Filter profile</DrawerTitle>
          </DrawerHeader>
          <Card className="w-full bg-inherit">
            <CardContent className="p-0 pb-1 pt-2 px-3 max-h-[65vh] overflow-auto">
              <FlightFilter loading={loading || isLoading} />
            </CardContent>
          </Card>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Ok</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="bg-[#FAFBFC] border-b shadow-md sticky top-[63px] z-20 mt-[70px]">
        <Container className="">
          <ValidateSearch />
        </Container>
      </div>
      <Container className="px-1 md:px-4 mt-4">
        <div className="flex relative lg:gap-4">
          <div className="">
            <div className="flex-1 hidden lg:block h-fit overflow-auto sticky top-24 mt-2  ">
              <TimeCounter />
              <Card className="w-full bg-inherit">
                <CardContent className="p-0 pb-1 pt-2 px-3 ">
                  <FlightFilter loading={loading || isLoading} />
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="w-full lg:w-[70%] mb-5">
            <div className="mt-2 mx-2 md:mx-0">
              <div className="md:hidden">
                <TimeCounter />
              </div>
              <AirlineSlider />
            </div>
            <div className="mt-4 flex flex-col md:flex-row w-full justify-between px-3 md:px-0">
              <div className="flex gap-4">
                <Button
                  variant={"link"}
                  onClick={toggleDrawer}
                  className="lg:hidden"
                >
                  <FaSlidersH className="text-secondary " />
                  <span className="mx-2">More</span>
                </Button>

                <h1 className="text-lg font-semibold text-gray-800 flex gap-4">
                  {loading || isLoading ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-secondary"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    count
                  )}{" "}
                  Flights Found
                </h1>
              </div>

              <FilterAction />
            </div>

            <Tabs
              className="mt-2 mx-2 md:mx-0"
              value={filter.sort_by ?? ""}
              onValueChange={(value) => handleTabChange(value as string)}
            >
              <TabsList className="flex w-full justify-between">
                <TabsTrigger
                  className="w-full"
                  value="CHEAPEST"
                  disabled={loading}
                >
                  <div className="flex flex-col md:flex-row  md:gap-4 my-1">
                    Cheapest
                    <p>{flightFilterData?.cheapest} ৳</p>
                  </div>
                </TabsTrigger>

                <TabsTrigger
                  className="w-full"
                  value="EARLIEST"
                  disabled={loading}
                >
                  <div className="flex flex-col md:flex-row  md:gap-4 my-1">
                    Earliest
                    <p>{flightFilterData?.earliest} ৳</p>
                  </div>
                </TabsTrigger>

                <TabsTrigger
                  className="w-full"
                  value="FASTEST"
                  disabled={loading}
                >
                  <div className="flex flex-col md:flex-row  md:gap-4 my-1">
                    Fastest
                    <p>{flightFilterData?.fastest} ৳</p>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Render isLoading={loading || isLoading}>
              <Render.When isTrue={data.length > 0}>
                {data.map((item, index) => (
                  <Accordion key={index} type="single" collapsible>
                    <AccordionItem value={String(index)}>
                      <FlightTabs flight={item} />
                    </AccordionItem>
                  </Accordion>
                ))}

                <InfiniteScroll
                  hasMore={hasMore ?? false}
                  isLoading={filterLoading || filterIsFetching}
                  next={() => {
                    if (filter.page) {
                      dispatch(setFilter({ ...filter, page: filter.page + 1 }));
                    }
                  }}
                  threshold={1}
                >
                  {hasMore ? (
                    <Loader2 className="w-6 h-6 mx-auto animate-spin mt-4" />
                  ) : (
                    <p className="text-center text-gray-500 mt-4">
                      No more data
                    </p>
                  )}
                </InfiniteScroll>
              </Render.When>
              <Render.Else>
                <Lottie
                  animationData={planeAnimation}
                  loop={true}
                  className="h-[70vh]  bg-white "
                />
              </Render.Else>

              <Render.Loading>
                {Array.from({ length: 7 }).map((_, index) => (
                  <SkeletonLoader key={index} />
                ))}
              </Render.Loading>
            </Render>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Flight;
