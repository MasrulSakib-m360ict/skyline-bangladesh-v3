"use client";

import { Passenger } from "@/app/(flight)/flight/_components/passenger";
import { formatQueryVisaParams } from "@/app/(visa)/_components/formater";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { useFlightSearch } from "@/redux/slices/flight-search.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useVisaContext } from "../../../_components/visa-context";

const formSchema = z
  .object({
    visa: z.string().optional(),
    services: z.array(z.string()).optional(),
    departureDate: z.date(),
  })
  .refine((data) => data.visa || (data.services && data.services.length > 0), {
    message: "Either visa or services must be provided",
    path: ["visa", "services"],
  });

export type FormValuesVisa = z.infer<typeof formSchema>;

export function ApplicationForm() {
  const router = useRouter();
  const { passenger } = useAppSelector(useFlightSearch);
  const {
    visaData: { visas, services },
    selectedVisa,
    selectedServices,
    setSelectedVisa,
    setSelectedServices,
    hasVisaData,
    hasServiceData,
  } = useVisaContext();

  const form = useForm<FormValuesVisa>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visa: selectedVisa ? String(selectedVisa) : undefined,
      services: selectedServices.map(String),
    },
  });

  React.useEffect(() => {
    if (hasVisaData) {
      form.setValue("visa", selectedVisa ? String(selectedVisa) : undefined);
    }
    if (hasServiceData) {
      form.setValue("services", selectedServices.map(String));
    }
  }, [selectedVisa, selectedServices, form, hasVisaData, hasServiceData]);

  const onSubmit = (data: FormValuesVisa) => {
    const ss = formatQueryVisaParams({ data, passenger });
    router.push(`/visa/apply?${ss}`);
  };

  return (
    <Card className="sticky top-20  border">
      <CardHeader className="bg-primary text-primary-foreground mb-2">
        <CardTitle>Apply for Visa</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {hasVisaData && (
              <FormField
                control={form.control}
                name="visa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visa Type</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedVisa(Number(value));
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a visa type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {visas.map((visa) => (
                          <SelectItem key={visa.id} value={String(visa.id)}>
                            {visa.entry_type} - ৳{visa.visa_fee}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {hasServiceData && (
              <FormField
                control={form.control}
                name="services"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Additional Services
                      </FormLabel>
                    </div>
                    {services.map((service) => (
                      <FormField
                        key={service.id}
                        control={form.control}
                        name="services"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={service.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(
                                    String(service.id)
                                  )}
                                  onCheckedChange={(checked) => {
                                    const updatedValue = checked
                                      ? [
                                          ...(field.value || []),
                                          String(service.id),
                                        ]
                                      : field.value?.filter(
                                          (value) =>
                                            value !== String(service.id)
                                        );
                                    field.onChange(updatedValue);
                                    setSelectedServices(
                                      (updatedValue ?? []).map(Number)
                                    );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {service.service_title} - ৳{service.service_fee}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Passenger />
            <FormField
              control={form.control}
              name="departureDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Departure Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date > new Date("2100-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Proceed Application
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
