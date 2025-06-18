import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dayjs } from 'dayjs';

import { IAirportList, IFlightField, IPassengerType, TFlightClass, TFlightRoute } from '@/types/type.flight';
import { RootState } from '../store';

// ! types
export interface IFlightSearchState {
  flightRoute: TFlightRoute;
  ticketClass: TFlightClass;
  fields: IFlightField[];
  passenger: IPassengerType
}

//! Define default airport and flight field
export const defaultAirport: IAirportList = {
  airport_country_id: 0,
  city_name: '',
  country_name: '',
  iata_code: '',
  id: 0,
  name: '',
};

export const defaultFlightField: IFlightField = {
  origin: defaultAirport,
  departure: defaultAirport,
  date: [] as Dayjs[],
};



const initialState: IFlightSearchState = {
  ticketClass: "Y",
  flightRoute: 'oneway',
  fields: [],
  passenger: {
    adult: 1,
    child: 0,
    kid: 0,
    infant: 0,
  },
};

const flightSearchSlice = createSlice({
  name: 'flightSearch',
  initialState,
  reducers: {
    //  * state for flightRoute
    setFlightRoute(state, action: PayloadAction<TFlightRoute>) {
      state.flightRoute = action.payload;
    },
    // ! state end for flightRoute

    // * state for ticketClass
    setTicketClass(state, action: PayloadAction<TFlightClass>) {
      state.ticketClass = action.payload;
    },
    // ! state end for ticketClass

    // * state for [fields]
    setFields(state, action: PayloadAction<IFlightField[]>) {
      state.fields = action.payload;
    },

    // * state  for [passengers]
    setPassenger(state, action: PayloadAction<Partial<IFlightSearchState['passenger']>>) {
      state.passenger = { ...state.passenger, ...action.payload };
    },
    incrementPassenger(state, action: PayloadAction<'adult' | 'child' | 'kid' | 'infant'>) {
      const type = action.payload;
      const totalPassengers = state.passenger.adult + state.passenger.child + state.passenger.kid + state.passenger.infant;

      if (totalPassengers >= 9) return;
      if (type === 'infant' && state.passenger.infant >= state.passenger.adult) return;

      state.passenger[type]++;
    },
    decrementPassenger(state, action: PayloadAction<'adult' | 'child' | 'kid' | 'infant'>) {
      const type = action.payload;
      if (type === 'adult' && state.passenger.adult === 1) return;
      if (type === 'child' && state.passenger.child === 0) return;
      if (type === 'kid' && state.passenger.kid === 0) return;
      if (type === 'infant' && state.passenger.infant === 0) return;
      if (type === 'adult' && state.passenger.adult <= state.passenger.infant) {
        state.passenger.infant--;
      }
      state.passenger[type]--;
    },
    resetPassenger(state) {
      state.passenger = initialState.passenger;
    },

    // ! reset all state
    resetFlightData(state) {
      state.fields = [];
      state.passenger = initialState.passenger;
      state.ticketClass = initialState.ticketClass;
      state.flightRoute = initialState.flightRoute;
    }
  },
});

export const {
  setFlightRoute, setTicketClass, setFields,
  setPassenger,
  incrementPassenger,
  decrementPassenger,
  resetPassenger,
  resetFlightData,
} = flightSearchSlice.actions;
export default flightSearchSlice.reducer;

export const useFlightSearch = (state: RootState) => state.flightSearch;
