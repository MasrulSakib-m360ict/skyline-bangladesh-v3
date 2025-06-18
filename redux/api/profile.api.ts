import { IHttpResponse, IUser } from "@/types";

import { setUser } from "../slices/profile.slice";
import { baseApi } from "./base.api";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //! Get user profile
    getMe: build.query<IHttpResponse<IUser>, void>({
      query: () => ({
        url: "/btoc/auth/profile",
        method: "GET",
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {

        try {
          const response = await queryFulfilled;
          if (response.data.success && response.data.data) {
            dispatch(setUser(response.data.data));
          }
        } catch (error) {
          console.error(error);
        }
      },
      providesTags: ["profile"],

    }),
    //! Update user profile
    updateProfile: build.mutation<IHttpResponse<IUser>, FormData>({
      query: (profile) => ({
        url: "/btoc/auth/profile",
        method: "PATCH",
        body: profile,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useGetMeQuery, useUpdateProfileMutation } = profileApi;
