
import { ENV } from "@/config";
import { IGenericErrorResponse, IHttpResponse } from "@/types";
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { getSession, signOut } from 'next-auth/react';
import { toast } from "sonner";

const baseQueryFn = fetchBaseQuery({
  baseUrl: ENV.serverUrl!,
  prepareHeaders: async (headers,) => {
    const session = await getSession();
    const accessToken = session?.user?.id;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    headers.set("agency", ENV.btocToken!);
    return headers;
  },
});


const handleResponse: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let toastId;

  const apiWithoutToast = ["/btoc/flight/search/v2?size=25"];

  if (!(args.method === "GET")) {
    if (args.method && !apiWithoutToast.includes(args.url)) {
      toastId = toast.loading("Loading");
    }
  }
  const result = await baseQueryFn(args, api, extraOptions);

  if (result?.error) {
    if (result?.error?.status === "FETCH_ERROR") {
      toast.error("Network error", { id: toastId });
      return;
    }
    const errorData = result?.error?.data as IGenericErrorResponse;

    if (result?.error?.status === 401) {
      // logout redux action dispatch
      signOut({ callbackUrl: "/" });
      toast.error(errorData?.message || "Session expired, please login again", { id: toastId });
    } else {
      toast.error(
        errorData?.message || result?.error?.status || "internal server error",
        { id: toastId }
      );
    }
  } else {
    if (!(args.method === "GET")) {
      const data = result.data as IHttpResponse<any>;

      if (args.method && !apiWithoutToast.includes(args.url)) {
        toast.success(data.message || "Success", { id: toastId });
      }
    }
  }
  return result;
};



export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: handleResponse,
  tagTypes: ["booking-request", "profile"],
  endpoints: () => ({}),
});
