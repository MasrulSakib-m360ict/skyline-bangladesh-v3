"use client";

import Baggages from "@/app/(flight)/flight/_components/baggages";
import FarePassenger from "@/app/(flight)/flight/_components/fare-passenger";
import FareSummary from "@/app/(flight)/flight/_components/fare-summary";
import Policy from "@/app/(flight)/flight/_components/policy";
import FlightSegments from "@/app/(flight)/flight/_components/segments";
import TravelerFormInputs from "@/app/dashboard/travelers/components/traveler-form-inputs";
import Container from "@/components/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { removeEmptyValues } from "@/lib/utils";
import planeAnimation from "@/public/lottie/no_flight.json";
import loadingAnimation from "@/public/lottie/plan-loading.json";
import {
  useBookingRequestMutation,
  useRevalidateQuery,
} from "@/redux/api/flight.api";
import { ICreateTraveler } from "@/types/traveler";
import {
  travelerDataFormatter,
  travelerTypeFormatter,
} from "@/utils/formatter";
import Lottie from "lottie-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ModalLogin } from "../../../(auth)/components/login-modal";
import TimeCounter from "../_components/time-counter";

const page = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { searchId?: string };
}) => {
  const navigate = useRouter();
  const form = useForm();
  const { data: season } = useSession();

  const { data, isLoading, isError } = useRevalidateQuery(
    { id: params.id, search_id: searchParams.searchId! },
    {
      skip: !params.id || !searchParams.searchId,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const [bookingRequest, { isLoading: CrLoading }] =
    useBookingRequestMutation();

  if (isLoading)
    return (
      <div>
        <div className="overflow-hidden md:pt-[-300px] h-screen">
          <Lottie animationData={loadingAnimation} loop />
        </div>
      </div>
    );

  if (isError)
    return (
      <div className=" flex items-center justify-center mx-auto min-w-screen h-screen bg-white">
        <Container className="">
          <div className="text-center ">
            <Lottie
              animationData={planeAnimation}
              loop={true}
              className="h-[70vh]"
            />
            <h1 className="w-full text-center text-red-400">
              This flight is already booked or something went wrong
            </h1>
            <Button
              onClick={() => navigate.push("/")}
              size="sm"
              className="mt-4"
            >
              Go Back
            </Button>
          </div>
        </Container>
      </div>
    );

  // Form submit handler
  const onSubmit = async (values: any) => {
    const processedPassengers: ICreateTraveler[] = [];
    data?.data?.passengers.forEach((passenger) => {
      for (let i = 0; i < passenger.number; i++) {
        const passengerData = travelerDataFormatter(passenger.type, values, i);
        processedPassengers.push(passengerData);
      }
    });
    const passengersData = removeEmptyValues(processedPassengers);

    if (searchParams.searchId === undefined) {
      toast.error("Search ID not found");
      return;
    }
    if (params.id === undefined) {
      toast.error("Flight ID not found");
      return;
    }

    const res = await bookingRequest({
      flight_id: params.id,
      passengers: passengersData,
      search_id: searchParams.searchId,
    }).unwrap();

    if (!res.success) {
      toast.error(res.message);
      return;
    }
    navigate.push(`/dashboard/booking-requests/${res?.data?.booking_id}`);
  };
  let passengerCount = 1;
  return (
    <Container className="min-h-screen pt-20 pb-10 relative">
      <h3 className="text-[20px] mb-4">Review Your Booking</h3>
      <div className="flex flex-col-reverse gap-4 md:flex-row">
        {/* Main Content */}
        <div className="w-full space-y-3 md:w-2/3">
          <FlightSegments Item={data?.data!} />
          <Card>
            <CardContent className="p-3">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Accordion
                    defaultValue={data?.data?.passengers.flatMap(
                      (passenger, index) =>
                        Array.from({ length: passenger.number }).map(
                          (_, numberIndex) =>
                            `${passenger.type}-${numberIndex}-${index}`
                        )
                    )}
                    type="multiple"
                  >
                    {data?.data?.passengers?.map((passenger, index) => {
                      return Array.from({ length: passenger.number }).map(
                        (_, numberIndex) => (
                          <AccordionItem
                            key={`${passenger.type}-${numberIndex}-${index}`}
                            value={`${passenger.type}-${numberIndex}-${index}`}
                          >
                            <AccordionTrigger>
                              Passenger {passengerCount++} -{" "}
                              {travelerTypeFormatter(passenger.type)}
                            </AccordionTrigger>
                            <AccordionContent>
                              <TravelerFormInputs
                                passengerType={passenger.type}
                                isDomesticFlight={
                                  data?.data?.isDomesticFlight ?? false
                                }
                                form_name_prix={`${passenger.type}-${numberIndex}`}
                                numberIndex={numberIndex}
                                form={form}
                              />

                              <FormField
                                name={`${passenger.type}-${numberIndex}-save_information`}
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel>
                                        Save this information for future
                                        bookings
                                      </FormLabel>
                                    </div>
                                  </FormItem>
                                )}
                              />
                            </AccordionContent>
                          </AccordionItem>
                        )
                      );
                    })}
                  </Accordion>

                  {season?.user?.id && (
                    <Button disabled={CrLoading} type="submit" className="mt-4">
                      Book
                    </Button>
                  )}
                </form>

                {!season?.user?.id && <ModalLogin />}
              </Form>
            </CardContent>
          </Card>
        </div>
        {/* Sidebar Content */}
        <div className="w-full space-y-3 md:w-1/3 md:sticky md:top-40 h-fit">
          <TimeCounter />
          <Card>
            <FareSummary fare={data?.data?.fare!} />
          </Card>
          <Card className="pt-2">
            <FarePassenger passengers={data?.data?.passengers!} />
          </Card>

          <Card>
            <Baggages passengers={data?.data?.passengers!} />
          </Card>
          <Card>
            <Policy />
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default page;
