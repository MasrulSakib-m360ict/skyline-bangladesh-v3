import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";



const initialState: { loading: boolean; } = { loading: true, };

const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = utilsSlice.actions;
export default utilsSlice.reducer;
export const useUtils = (state: RootState) => state.utils;