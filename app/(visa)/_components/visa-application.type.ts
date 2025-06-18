import { IVisaStatus } from "@/types/visa.types";

export type IVisaApplication = {
  id: number;
  agency_id: number;
  country_code: string;
  category_id: number;
  traveler_count: number;
  applied_visa_id: number;
  applied_services_ids: number[];
  payable: string;
  payable_desc: string;
  contact_email: string;
  contact_number: string;
  departure_date: string;
  status: IVisaStatus;
  note: string | null;
  created_at: string;
  updated_at: string | null;
  created_by: string;
  updated_by: string | null;
  category_code: string;
};