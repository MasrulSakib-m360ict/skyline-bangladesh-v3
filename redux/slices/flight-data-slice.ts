import { FlightFilter, IFilterState, IFlight } from "@/types/type.flight";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TFlightDataState = {
  flightFilterData: FlightFilter;
  data: IFlight[];
  loading: boolean;
  type: "init" | "filter";
  visible: boolean;
  filter: IFilterState;
  searchEngineShow?: boolean;
  count: number;
  search_id: string;
  hasMore?: boolean;
}

const initialState: TFlightDataState = {
  flightFilterData: {
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
  type: "init",
  visible: false,
  data: [],
  count: 0,
  search_id: "",
  hasMore: true,
  filter: {},
  loading: false,
  searchEngineShow: false,
}

export const flightDataSLice = createSlice({
  name: 'flightData',
  initialState,
  reducers: {
    setFlightData(state, action: {
      payload: {
        filter: FlightFilter;
        results: IFlight[], type?: "init" | "filter";
        visible?: boolean;
        count?: number;
        search_id?: string;
        hasMore?: boolean;
        page?: number;

      }
    }) {
      state.data = action.payload.results;
      state.flightFilterData = action.payload.filter;
      // show the state type
      state.type = action.payload.type ?? state.type
      state.visible = true
      state.count = action.payload.count ?? state.count
      state.search_id = action.payload.search_id ?? state.search_id
      state.filter.page = action.payload.page ?? state.filter.page
      state.hasMore = action.payload.hasMore ?? true
    },
    setData(state, action: { payload: IFlight[] }) {
      state.data = action.payload
    },
    setPage(state, action: { payload: number }) {
      state.filter.page = action.payload
    },
    setLoading(state, action: { payload: boolean }) {
      state.loading = action.payload
    },
    // this is filter common 
    setFilter(state, action: { payload: IFilterState }) {
      state.filter = action.payload
    },
    resetFilter(state) {
      state.filter = {}
      state.visible = false
      state.type = "init"
    },
    restDataSlice(state) {
      state.data = []
      state.filter = {}
      state.visible = false
      state.type = "init"
    },
    setType(state, action: PayloadAction<"init" | "filter">) {
      state.type = action.payload
    },

    // specific filter
    toggleAirline: (state, action: PayloadAction<string>) => {
      const airline = action.payload;
      const arr = state.filter.carrier_operating ? state.filter.carrier_operating.split(',') : [];
      if (arr.includes(airline)) {
        state.filter.carrier_operating = arr.filter((item) => item !== airline).join(',');
      } else {
        arr.push(airline);
        state.filter.carrier_operating = arr.join(',');
      }
    },
    // this is for search engine hide style
    toggleSearchEngine: (state, action: PayloadAction<boolean>) => {
      state.searchEngineShow = action.payload
    }
  },
})

export const { setFlightData, setLoading, setFilter, toggleAirline, resetFilter, toggleSearchEngine, restDataSlice, setType, setPage } = flightDataSLice.actions;
export default flightDataSLice.reducer

// hooks for flightData
export const useFlightData = (state: RootState) => state.flightData