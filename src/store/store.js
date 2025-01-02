import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import homeSlice from "./homeSlice.js";
import inventrySlice from "./inventrySlice.js";
import allSalesSlice from "./allSalesSlice.js";

const appReducer = combineReducers({
  auth: authSlice,
  home: homeSlice,
  inventry: inventrySlice,
  allsales: allSalesSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
