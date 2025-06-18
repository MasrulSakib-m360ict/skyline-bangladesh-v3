import { IUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";



// Update the initial state to include user data
const initialState: { loading: boolean; user: IUser | null } = {
  loading: true,
  user: null
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },

  },
});

export const { setLoading, setUser } = profileSlice.actions;
export default profileSlice.reducer;
export const useProfile = (state: RootState) => state.profile;