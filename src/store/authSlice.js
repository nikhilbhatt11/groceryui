import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    setAuthStatus: (state, action) => {
      state.status = action.payload?.status || false;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { login, logout, setAuthStatus } = authSlice.actions;

export default authSlice.reducer;
