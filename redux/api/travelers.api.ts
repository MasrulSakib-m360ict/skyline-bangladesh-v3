import { IHttpResponse, TQueryParam } from "@/types";
import argGenerator from "@/utils/arg-generator";
import { baseApi } from "./base.api";

export const travelersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    travelersList: build.query<IHttpResponse<any>, TQueryParam[]>({
      query: (arg) => ({
        url: "/btoc/travelers",
        method: "GET",
        params: argGenerator(arg),
      })
    }),
  }),
});

export const {
  useTravelersListQuery
} = travelersApi;