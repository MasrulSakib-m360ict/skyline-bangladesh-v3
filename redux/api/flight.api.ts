import { catchAsync } from "@/lib/utils";
import { IHttpResponse, TQueryParam } from "@/types";
import { IAirportList, ICountry, IFlight, IFlightSearchRequest, TFlightData } from "@/types/type.flight";
import argGenerator from "@/utils/arg-generator";
import { setFlightData, setLoading } from "../slices/flight-data-slice";
import { RootState } from "../store";
import { baseApi } from "./base.api";


export const flightApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //! Get country list
    countryList: builder.query<IHttpResponse<ICountry[]>, TQueryParam[]>({
      query: (arg) => {
        return {
          url: "/public/country",
          method: "GET",
          params: argGenerator(arg)
        }
      },
    }),
    //! Get airport list
    airportList: builder.query<IHttpResponse<IAirportList[]>, TQueryParam[]>({
      query: (arg) => {
        return {
          url: "public/airport",
          method: "GET",
          params: argGenerator(arg)
        }
      },
    }),
    // get flight list
    flightInitialData: builder.mutation<IHttpResponse<TFlightData>, IFlightSearchRequest>({
      query: (data) => ({
        url: "/btoc/flight/search/v2?size=25",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        dispatch(setLoading(true));
        await catchAsync(async () => {
          try {
            dispatch(setFlightData({
              filter: {
                total_stoppage: [],
                price_rage: { max: 0, min: 0 },
                airlines: [],
                baggage: [],
                departure_time: [],
                arrival_time: [],
                cheapest: 0,
                earliest: 0,
                fastest: 0,
              },
              results: [],
              type: "init",
              page: 1
            }));

            const { data } = await queryFulfilled;
            if (data?.data) {
              dispatch(setFlightData(
                {
                  filter: data.data.filter,
                  results: data.data.results,
                  type: "init",
                  count: data.count,
                  search_id: data.search_id,
                }
              ));
              // dispatch(toggleSearchEngine(false));
            }
          } catch (error) {
            dispatch(setFlightData({
              filter: {
                total_stoppage: [],
                price_rage: { max: 0, min: 0 },
                airlines: [],
                baggage: [],
                departure_time: [],
                arrival_time: [],
                cheapest: 0,
                earliest: 0,
                fastest: 0,
              },
              results: [],
              type: "init"
            }));
          }
          finally {
            dispatch(setLoading(false));
          }
        });
      },
    }),

    flightFilter: builder.query<IHttpResponse<TFlightData>, TQueryParam[]>({
      query: (arg) => {
        return {
          url: "/btoc/flight/filter/search/v2",
          method: "GET",
          params: argGenerator(arg)
        }
      },
      onQueryStarted: async (_arg, { dispatch, queryFulfilled, getState }) => {
        const { flightData } = getState() as RootState;
        const { filter } = flightData
        filter.page === 1 && dispatch(setLoading(true));
        await catchAsync(async () => {
          try {
            const { data } = await queryFulfilled;
            if (filter.page === 1) {

              if (data?.data) {
                dispatch(setFlightData({
                  filter: data.data.filter,
                  results: data.data.results,
                  type: "filter",
                  count: data.count,
                  hasMore: true
                }));
              }
            } else {
              if (data?.data) {
                if (data.data.results.length > 0) {
                  dispatch(setFlightData({
                    filter: data.data.filter,
                    results: [...flightData.data, ...data.data.results],
                    type: "filter",
                    count: data.count,
                    hasMore: true
                  }));
                  return;
                }
                dispatch(setFlightData({
                  filter: data.data.filter,
                  results: flightData.data,
                  type: "filter",
                  count: data.count,
                  hasMore: false
                }));

              }
            }
          } finally {
            dispatch(setLoading(false));
          }
        });
      },
    }),

    revalidate: builder.query<IHttpResponse<IFlight>, {
      id: string, search_id: string
    }>({
      query: ({ id, search_id }) => ({
        url: `/btoc/flight/revalidation/v2/${id}?search_id=${search_id}`,
        method: 'GET',
      }),
    }),

    // booking -request 
    bookingRequest: builder.mutation<IHttpResponse<any>, { flight_id: string, passengers: any, search_id: string }>({
      query: (data) => ({
        url: `/btoc/booking-request/v2`,
        method: 'POST',
        body: data,
      }),
    }),

  }),
});

export const {
  useAirportListQuery,
  useCountryListQuery,
  useRevalidateQuery,
  useFlightInitialDataMutation,
  useFlightFilterQuery,
  useBookingRequestMutation,
} = flightApi;