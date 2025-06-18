"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import TravelerFormInputs from "../components/traveler-form-inputs";

const page = () => {
  const form = useForm();

  // Form submit handler
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="m-20 p-4 bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TravelerFormInputs
            passengerType="ADT"
            isDomesticFlight={true}
            form_name_prix="passenger"
            numberIndex={2}
            form={form}
          />

          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default page;
