import { IVisaApplication } from "@/app/(visa)/_components/visa-application.type";
import { IHttpResponse, TQueryParam } from "@/types";
import { IAppliedVisaDetails } from "@/types/visa.types";
import argGenerator from "@/utils/arg-generator";
import { baseApi } from "./base.api";

export interface IVisaCategory {
  id: number;
  is_active: boolean;
  title: string;
  code: string;
  default_stay_validity: number;
  default_processing_time_min: number;
  default_processing_time_max: number;
}
//* start of visa_construction
export interface IServiceConstructionLis {
  name: string;
}
export interface IDocumentConstructionLis {
  name: string;
}

export interface IVisa {
  id: number;
  country_code: string;
  is_active: boolean;
  category_id: number;
  agency_id: number;
  visa_fee: number;
  processing_fee: number;
  currency_code: string;
  is_vat_applicable: boolean;
  vat_rate: number;
  processing_time_min: number;
  processing_time_max: number;
  stay_validity: number;
  visa_validity: number;
  entry_type: "SINGLE" | "MULTIPLE";
  organization: string;
}
export interface IService {
  is_active: boolean;
  abstract_service_id: number;
  service_fee: number;
  vat_rate: number;
  currency_code: string;
  is_vat_applicable: boolean;
  organization: string;
  agency_id: number;
}
export interface IDocumentRequirement {
  id: number;
  is_active: boolean;
  abstract_doc_id: number;
}
export interface IServiceResponse extends IService {
  id: number;
  country_code: string;
  category_id: number;
  service_title: string;
  service_code: string;
  service_description: string;
}
export interface IDocumentRequirementResponse extends IDocumentRequirement {
  is_active: boolean;
  country_code: string;
  category_id: number;
  doc_title: string;
  doc_code: string;
  doc_description: string;
}
export interface IVisaConstructionSingleResponse {
  search_terms: {
    country_code: string;
    category_id: number;
  };
  result: {
    visas: IVisa[];
    services: IServiceResponse[];
    document_requirements: IDocumentRequirementResponse[];
  };
  total: {
    visas: number;
    services: number;
    document_requirements: number;
  };
}

//! 3rd api type --> visaApplyInfo
export interface IVisaApplicationData {
  applied_visa: IAppliedVisa
  applied_services: IAppliedService[]
  total_payable: number
  payable_desc: string
  country_name: string
}
export interface IAppliedVisa {
  id: number;
  is_active: number;
  country_code: string;
  category_id: number;
  agency_id: number;
  entry_type: 'SINGLE' | 'MULTIPLE';
  visa_fee: string;
  processing_fee: string;
  currency_code: string;
  is_vat_applicable: number;
  vat_rate: string;
  processing_time_min: number;
  processing_time_max: number;
  stay_validity: number;
  visa_validity: number;
  organization: string;
  created_at: string;
  updated_at: string;
  created_by: number;
  updated_by: number;
}
export interface IAppliedService {
  id: number;
  is_active: number;
  agency_id: number;
  country_code: string;
  category_id: number;
  abstract_service_id: number;
  service_fee: string;
  currency_code: string;
  is_vat_applicable: number;
  vat_rate: string;
  organization: string;
  service_title: string;
  service_code: string;
  service_description: string;
}

//! 4th api type --> visaBooking
export type IVisaBooking = {
  category_id: number;
  country_code: string;
  application: {
    applied_visa_id: number;
    applied_services_ids: number[];
    departure_date: string;
    contact_email: string;
    contact_number: string;
  };
  travelers: any[];
};



export const visaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //! Update user profile
    visaCategoriesList: builder.query<IHttpResponse<IVisaCategory[]>, TQueryParam[]>({
      query: (arg) => {
        return {
          url: "/btoc/visas/categories",
          method: "GET",
          params: argGenerator(arg),
        };
      },
    }),
    visaList: builder.query<IHttpResponse<IVisaConstructionSingleResponse>, TQueryParam[]>({
      query: (arg) => {
        return {
          url: "/btoc/visas/search",
          method: "GET",
          params: argGenerator(arg),
        };
      },
    }),
    visaApplyInfo: builder.query<IHttpResponse<IVisaApplicationData>, TQueryParam[]>({
      query: (arg) => {
        return {
          url: "/btoc/visas/pricing-details",
          method: "GET",
          params: argGenerator(arg),
        };
      },
    }),

    //! 4th api type --> visaBooking
    visaBooking: builder.mutation<IHttpResponse<{
      booking_id: number;
    }>, IVisaBooking>({
      query: (body) => ({
        url: "/btoc/visas/bookings",
        method: "POST",
        body
      }),
    }),
    //! 5th api type --> visaBookingList
    visaBookingList: builder.query<IHttpResponse<IVisaBooking[]>, TQueryParam[]>({
      query: (arg) => {
        return {
          url: "/btoc/visas/bookings",
          method: "GET",
          params: argGenerator(arg),
        };
      },
    }),
    //! 6th api type --> visaApplyList
    visaApplyList: builder.query<IHttpResponse<IVisaApplication[]>, TQueryParam[]>({
      query: (arg) => {
        return {
          url: "/btoc/visas/bookings",
          method: "GET",
          params: argGenerator(arg),
        };
      },

    }),
    //! get single visa apply details
    visaApply: builder.query<IHttpResponse<IAppliedVisaDetails>, string>({
      query: (id) => ({
        url: `/btoc/visas/bookings/${id}`,
      }),

    }),
    //! 7th api type --> visaApplyUpload doc 
    visaApplyUploadDoc: builder.mutation<IHttpResponse<any>, {
      booking_id: number;
      data: any
    }>({
      query: ({ booking_id, data }) => ({
        url: `/btoc/visas/bookings/${booking_id}/documents/uploads`,
        method: "POST",
        body: data
      }),
    }),
  }),

});

export const {
  useVisaApplyInfoQuery,
  useVisaListQuery,
  useVisaBookingMutation,
  useVisaCategoriesListQuery,
  useVisaBookingListQuery,
  useVisaApplyListQuery,
  useVisaApplyQuery,
  useVisaApplyUploadDocMutation
} = visaApi;
