import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  email: string;
  name: string;
  role: string;
}

const initialState: UserState = {
  email: "",
  name: "",
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, { payload }) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.email = payload.email;
      state.name = payload.name;
      state.role = payload.role;
    },
    logOut: (state) => {
      state.email = "";
      state.name = "";
      state.role = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { signIn, logOut } = userSlice.actions;

export default userSlice.reducer;
