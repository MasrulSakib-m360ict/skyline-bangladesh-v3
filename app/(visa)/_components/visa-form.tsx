"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import VisaSelectCategory from "./visa-select-category";
import VisaSelectCountry from "./visa-select-country";

const visaFormSchema = z.object({
  country: z.string({ required_error: "Please select a country" }),
  visaType: z.string({ required_error: "Please select a visa type" }),
});

type VisaFormValues = z.infer<typeof visaFormSchema>;

export default function VisaForm({
  defaultValues,
}: {
  defaultValues?: VisaFormValues;
}) {
  const router = useRouter();

  const form = useForm<VisaFormValues>({
    resolver: zodResolver(visaFormSchema),
    defaultValues,
  });

  function onSubmit(data: VisaFormValues) {
    const path = `/visa/${encodeURIComponent(
      data.country.toLowerCase()
    )}/${encodeURIComponent(data.visaType.toLowerCase())}`;
    router.push(path);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row  gap-4 h-full pt-14 px-5"
      >
        <div className="lg:h-24 flex flex-col lg:flex-row  gap-4 w-full">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>COUNTRY</FormLabel>
                <FormControl>
                  <VisaSelectCountry
                    name="country"
                    onChange={field.onChange}
                    value={field.value?.toString()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="visaType"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="">VISA TYPE</FormLabel>
                <FormControl>
                  <VisaSelectCategory
                    name="visaType"
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="self-center">
          <Button
            size={"icon"}
            variant={"secondary"}
            type="submit"
            className="search-button flex items-center mt-2"
          >
            <Search name="search" className="" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
