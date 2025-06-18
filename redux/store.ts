
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from './api/base.api';
import flightDataSLice from './slices/flight-data-slice';
import flightSearchSlice from './slices/flight-search.slice';
import profileSlice from "./slices/profile.slice";
import themeSlice from './slices/theme.slice';
import utilsSlice from './slices/utils.slice';



export const store = configureStore({
  reducer: {
    theme: themeSlice,
    profile: profileSlice,
    utils: utilsSlice,
    flightSearch: flightSearchSlice,
    flightData: flightDataSLice,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),
})
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


