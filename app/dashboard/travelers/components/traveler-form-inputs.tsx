import CountrySelect from "@/app/(flight)/flight/_components/country-select";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { addMonths, differenceInYears, format } from "date-fns";
import { Render } from "keep-render";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

type PassengerType = "ADT" | "C11" | "INF" | "C05";

type Props = {
  form: UseFormReturn<any>;
  form_name_prix: string;
  passengerType: any;
  isDomesticFlight: boolean;
  numberIndex: number;
  fr?: boolean;
};

const TravelerFormInputs = ({
  form,
  form_name_prix,
  numberIndex,
  isDomesticFlight,
  passengerType,
  fr = true,
}: Props) => {
  const handleGenderChange = (value: string) => {
    let referenceValue;
    switch (passengerType) {
      case "ADT":
        referenceValue = value === "F" ? "MS" : "MR";
        break;
      default:
        referenceValue = value === "F" ? "MISS" : "MSTR";
        break;
    }
    form.setValue(`${form_name_prix}-reference`, referenceValue);
  };
  // Function to validate age based on passenger type
  const validateAge = (
    dateOfBirth: Date,
    passengerType: PassengerType
  ): true | string => {
    const age = differenceInYears(new Date(), dateOfBirth);

    const ageValidation: Record<PassengerType, boolean> = {
      ADT: age >= 12,
      C11: age >= 5 && age < 12,
      INF: age < 2,
      C05: age >= 2 && age < 5,
    };

    const errorMessage: Record<PassengerType, string> = {
      ADT: "Adults must be 12 years or older.",
      C11: "Child must be between 5 and under 12 years.",
      INF: "Infant must be under 2 years.",
      C05: "Kid must be between 2 and under 5 years.",
    };

    return ageValidation[passengerType] ? true : errorMessage[passengerType];
  };

  const [popovers, setPopovers] = useState<Record<string | number, boolean>>({
    popover1: false,
    popover2: false,
    // Add more popovers as needed
  });

  // Function to toggle a specific popover
  const togglePopover = (popoverKey: string | number) => {
    setPopovers((prevPopovers) => ({
      ...prevPopovers,
      [popoverKey]: !prevPopovers[popoverKey],
    }));
  };

  // Function to validate if the passport expiry date is valid for the next 6 months
  const validatePassportExpiry = (date: Date): true | string => {
    const d = new Date(date);
    const sixMonthsFromNow = addMonths(new Date(), 6);
    const isValid = d > sixMonthsFromNow;
    return (
      isValid ||
      "Passport expiry date must be valid for at least the next 6 months."
    );
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Personal Information
      </h1>
      <div className="flex flex-col md:flex-row  items-center md:gap-4">
        {/* Given Name */}
        <FormField
          name={`${form_name_prix}-mid_name`}
          control={form.control}
          rules={{
            required: "Please input your first name!",
            minLength: { value: 2, message: "Minimum 2 characters required" },
            maxLength: {
              value: 50,
              message: "Maximum 50 characters allowed",
            },
          }}
          render={({ field }) => (
            <FormItem className="w-full md:w-1/3">
              <FormLabel>Given Name</FormLabel>
              <FormControl>
                <div className="flex ">
                  <Input
                    value={form.watch(`${form_name_prix}-reference`)}
                    disabled
                    className="mr-2 w-1/4 mx-0 rounded-r-none border-r-0"
                  />
                  <Input
                    {...field}
                    placeholder="Enter your first name"
                    className="w-3/4"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Surname */}
        <FormField
          name={`${form_name_prix}-sur_name`}
          control={form.control}
          rules={{
            required: "Please input your surname!",
            minLength: { value: 2, message: "Minimum 2 characters required" },
            maxLength: {
              value: 50,
              message: "Maximum 50 characters allowed",
            },
          }}
          render={({ field }) => (
            <FormItem className="w-full md:w-1/3">
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your surname" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          name={`${form_name_prix}-gender`}
          control={form.control}
          rules={{ required: "Please select gender!" }}
          render={({ field }) => (
            <FormItem className="w-full md:w-1/3">
              <FormLabel>
                <div className="flex gap-3 mt-2">
                  Gender
                  <Render.When
                    isTrue={
                      form.watch(`${form_name_prix}-gender`) === "F" &&
                      passengerType == "ADT"
                    }
                  >
                    <RadioGroup
                      onValueChange={(value) => {
                        // field.onChange(value);
                        form.setValue(`${form_name_prix}-reference`, value);
                      }}
                      value={form.watch(`${form_name_prix}-reference`) || "MS"}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="MS" id="ms" />
                        <label htmlFor="ms" className="text-gray-700">
                          MS
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="MRS" id="mrs" />
                        <label htmlFor="mrs" className="text-gray-700">
                          MRS
                        </label>
                      </div>
                    </RadioGroup>
                  </Render.When>
                </div>
              </FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleGenderChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="M">Male</SelectItem>
                  <SelectItem value="F">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mt-4 flex flex-col md:flex-row  items-center gap-2 md:gap-4">
        {/* Date of Birth */}
        <FormField
          name={`${form_name_prix}-date_of_birth`}
          control={form.control}
          rules={{
            validate: (date) => {
              const validation = validateAge(date, passengerType);
              return validation === true || validation;
            },
          }}
          render={({ field }) => (
            <FormItem className="flex flex-col w-full md:w-1/3">
              <FormLabel>Date of birth</FormLabel>
              <Popover
                open={popovers["popover1"]}
                onOpenChange={() => togglePopover("popover1")}
              >
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
                  <Input type="date" {...field} />
                  <div className="flex w-full items-end justify-end">
                    <Button
                      className="mt-2 text-end"
                      size={"sm"}
                      onClick={() =>
                        setPopovers({ ...popovers, popover1: false })
                      }
                    >
                      Ok
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Render.When isTrue={!isDomesticFlight}>
          {/*  Issuing Country*/}
          <FormField
            control={form.control}
            name={`${form_name_prix}-issuing_country`}
            rules={{ required: "Please select issuing country!" }}
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col w-full md:w-1/3">
                  <FormLabel>Issuing Country</FormLabel>
                  <CountrySelect {...field} />
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/* Nationality */}
          <FormField
            control={form.control}
            name={`${form_name_prix}-nationality`}
            rules={{
              required: "Please select nationality!",
            }}
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col w-full md:w-1/3">
                  <FormLabel>Nationality </FormLabel>
                  <CountrySelect {...field} />
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </Render.When>
      </div>

      <Render.When isTrue={!isDomesticFlight}>
        <div className="mt-4 flex flex-col md:flex-row  items-center gap-2 md:gap-4">
          {/* Passport Number */}
          <FormField
            name={`${form_name_prix}-passport_number`}
            control={form.control}
            rules={{
              required: "Please input your passport number!",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required",
              },
              maxLength: {
                value: 9,
                message: "Maximum 9 characters allowed",
              },
            }}
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>Passport Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your passport number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Passport Expiry */}
          <FormField
            name={`${form_name_prix}-passport_expiry`}
            control={form.control}
            rules={{
              validate: validatePassportExpiry,
            }}
            render={({ field }) => (
              <FormItem className="flex flex-col w-full mt-2  md:w-1/3">
                <FormLabel>Passport Expiry</FormLabel>
                <Popover
                  open={popovers["popover2"]}
                  onOpenChange={() => togglePopover("popover2")}
                >
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
                    <Input type="date" {...field} />
                    <div className="flex w-full items-end justify-end">
                      <Button
                        className="mt-2 text-end"
                        size={"sm"}
                        onClick={() =>
                          setPopovers({ ...popovers, popover2: false })
                        }
                      >
                        Ok
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Render.When>

      <Render.When isTrue={fr == true}>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
          Frequent Flyer
        </h1>
        <div className="mt-4 flex flex-col md:flex-row  items-center gap-2 md:gap-4">
          {/* Frequent Flyer Number */}
          <FormField
            name={`${form_name_prix}-frequent_flyer_number`}
            control={form.control}
            rules={{
              minLength: { value: 6, message: "Minimum 6 characters required" },
              maxLength: { value: 15, message: "Maximum 9 characters allowed" },
            }}
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>Frequent Flyer Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your frequent flyer number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Frequent Flyer Airline */}
          <FormField
            name={`${form_name_prix}-frequent_flyer_airline`}
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>Frequent Flyer Airline</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your frequent flyer airline"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Render.When>

      <Render.When isTrue={numberIndex == 0 && passengerType === "ADT"}>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
          Contact Information
        </h1>
        <div className="flex items-center gap-4">
          {/* Email */}
          <FormField
            name={`${form_name_prix}-email`}
            control={form.control}
            rules={{
              required: "Please input your email!",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Phone */}
          <FormField
            name={`${form_name_prix}-phone`}
            control={form.control}
            rules={{
              required: "Please input your phone number!",
              pattern: {
                value: /^[0-9]{10,14}$/,
                message: "Invalid phone number",
              },
            }}
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your phone number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Render.When>
    </>
  );
};

export default TravelerFormInputs;
