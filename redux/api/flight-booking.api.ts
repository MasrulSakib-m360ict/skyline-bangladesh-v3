import { IHttpResponse, TQueryParam } from "@/types";
import { IBookingRequest, IBookingRequestDetails } from "@/types/booking-requrst";
import argGenerator from "@/utils/arg-generator";
import { baseApi } from "./base.api";

export const flightBookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    flightBookingRequestList: build.query<IHttpResponse<IBookingRequest[]>, TQueryParam[]>({
      query: (arg) => ({
        url: "/btoc/booking-request",
        method: "GET",
        params: argGenerator(arg),
      }),
      providesTags: ["booking-request"],
    }),
    flightBookingRequestDetails: build.query<IHttpResponse<IBookingRequestDetails>, string>({
      query: (id) => ({
        url: `/btoc/booking-request/${id}`,
        method: "GET",
      }),
      providesTags: ["booking-request"],
    }),
    flightBookingRequestCancel: build.mutation<IHttpResponse<IBookingRequest>, string>({
      query: (id) => ({
        url: `/btoc/booking-request/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["booking-request"],
    }),
  }),
});

export const {
  useFlightBookingRequestListQuery,
  useFlightBookingRequestDetailsQuery,
  useFlightBookingRequestCancelMutation,
} = flightBookingApi;