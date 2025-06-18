import { IPassengerType } from "@/types/type.flight";
import { FormValuesVisa } from "../visa/[...search]/_components/application-form";

export const formatQueryVisaParams = ({
  data,
  passenger
}: {
  data: FormValuesVisa
  passenger: IPassengerType
}) => {
  const params = new URLSearchParams();
  if (data.visa) params.append("visa", data.visa);
  if (data.services) params.append("services", data.services.join(","));
  if (data.departureDate)
    params.append("departureDate", data.departureDate.toISOString());
  if (passenger) {
    Object.entries(passenger).forEach(([key, value]) => {
      params.append(key, String(value));
    });
  }
  return params.toString();
};
