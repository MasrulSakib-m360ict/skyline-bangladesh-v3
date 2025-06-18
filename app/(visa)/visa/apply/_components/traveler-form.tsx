"use client";
import { ModalLogin } from "@/app/(auth)/components/login-modal";
import TravelerFormInputs from "@/app/dashboard/travelers/components/traveler-form-inputs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { catchAsync, removeEmptyValues } from "@/lib/utils";
import {
  IVisaApplicationData,
  useVisaBookingMutation,
} from "@/redux/api/visa.api";
import { ICreateTraveler } from "@/types/traveler";
import {
  travelerDataFormatter,
  travelerTypeFormatter,
} from "@/utils/formatter";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Passenger = {
  type: string;
  number: number;
}[];

const TravelerForm = ({
  data,
  passengers,
}: {
  data: IVisaApplicationData;
  passengers: Passenger;
}) => {
  const { data: season } = useSession();
  const form = useForm();
  const navigate = useRouter();
  // Form submit handler

  const [visaBooking, { isLoading }] = useVisaBookingMutation();
  const searchParams = useSearchParams();
  const departureDate = searchParams.get("departureDate");

  const onSubmit = async (values: any) => {
    if (departureDate === null) {
      toast.error("Please select a departure date");
      return;
    }
    const processedPassengers: ICreateTraveler[] = [];
    passengers.forEach((passenger) => {
      for (let i = 0; i < passenger.number; i++) {
        const passengerData = travelerDataFormatter(passenger.type, values, i);
        processedPassengers.push(passengerData);
      }
    });
    const passengersData = removeEmptyValues(processedPassengers);

    const formattedData = {
      category_id: data?.applied_visa.category_id,
      country_code: data?.applied_visa.country_code,
      application: {
        applied_visa_id: data?.applied_visa.id,
        applied_services_ids: data?.applied_services.map(
          (service) => service.id
        ),
        departure_date: dayjs(departureDate).format("YYYY-MM-DD"),
        contact_email: processedPassengers[0].email!,
        contact_number: processedPassengers[0].phone!,
      },
      travelers: passengersData,
    };
    catchAsync(async () => {
      const res = await visaBooking(formattedData);
      navigate.push(`/dashboard/visa-requests/${res?.data?.data?.booking_id}`);
    });
  };

  let passengerCount = 1;
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Accordion
            defaultValue={passengers.flatMap((passenger, index) =>
              Array.from({ length: passenger.number }).map(
                (_, numberIndex) => `${passenger.type}-${numberIndex}-${index}`
              )
            )}
            type="multiple"
          >
            {passengers?.map((passenger, index) => {
              return Array.from({ length: passenger.number }).map(
                (_, numberIndex) => (
                  <AccordionItem
                    key={`${passenger.type}-${numberIndex}-${index}`}
                    value={`${passenger.type}-${numberIndex}-${index}`}
                  >
                    <AccordionTrigger>
                      Passenger {passengerCount++} -
                      {travelerTypeFormatter(passenger.type)}
                    </AccordionTrigger>
                    <AccordionContent>
                      <TravelerFormInputs
                        fr={false}
                        passengerType={passenger.type}
                        isDomesticFlight={false}
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
                                Save this information for future bookings
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
            <Button type="submit" className="mt-4">
              Book
            </Button>
          )}
        </form>
        {!season?.user?.id && <ModalLogin />}
      </Form>
    </div>
  );
};

export default TravelerForm;
