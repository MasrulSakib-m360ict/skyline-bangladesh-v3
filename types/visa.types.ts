
export type IMissingDocument = {
  travelerId: string;
  travelerName: string;
  missingDocs: string[];
};
export type IVisaStatus = "PROCESSING" | "APPROVED" | "REJECTED" | "COLLECTED" | "CANCELED_BY_USER";

export interface IAgencyInfo {
  id: number;
  logo: string;
  name: string;
  phone: string;
}

export interface ITraveler {
  id: number;
  agency_id: number;
  booking_id: number;
  reference: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  passport_number: string;
  passport_expiry_date: string;
  city: string;
  address: string;
  email: string | null;
  phone: string | null;
  type: string;
  passport_type: string;
  uploaded_docs: IUploadedDoc[];
  nationality: string;
  gender: string;
}

export interface IUploadedDoc {
  id: number;
  traveler_id: number;
  file_type: string;
  file: string;
  created_at: string;
  doc_title: string;
  doc_code: string;
  doc_description: string;
}

export interface IDocumentRequirement {
  id: number;
  is_active: number;
  country_code: string;
  category_id: number;
  abstract_doc_id: number;
  doc_title: string;
  doc_code: string;
  doc_description: string;
}

export interface IActionTaker {
  id: number;
  name: string;
  email: string;
  photo: string;
}

export interface ITrackingData {
  id: number;
  booking_id: number;
  traveler_id: number | null;
  action_type: string;
  action_details: string;
  admin_action_by: number | null;
  btob_action_by: number;
  created_at: string;
  action_taker: IActionTaker;
}

export interface ICommonVisaFields {
  id: number;
  traveler_count: number;
  category_id: number;
  country_code: string;
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
  updated_at: string;
  created_by: string;
  updated_by: string;
  category_code: string;
}

export type IAppliedVisaType = ICommonVisaFields & {
  agency_info: IAgencyInfo;
};
export interface IAppliedVisaDetails extends ICommonVisaFields {
  agency_id: number;
  applied_visa: string;
  agency_info: IAgencyInfo;
  applied_services: string;
  travelers: ITraveler[];
  document_requirements: IDocumentRequirement[];
  tracking_data: ITrackingData[];
}
