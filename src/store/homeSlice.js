import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: {},
  totalproducts: 0,
  currentpage: 1,
  totalpages: 1,
  lastgetpage: 1,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    allProductsfn: (state, action) => {
      const { products, totalproducts, totalpages, currentpage, lastgetpage } =
        action.payload;
      state.products[currentpage] = products;
      state.totalproducts = totalproducts;
      state.totalpages = totalpages;
      state.currentpage = currentpage;
      state.lastgetpage = lastgetpage;
    },
    changeCurrPage: (state, action) => {
      const { currentpage } = action.payload;
      state.currentpage = currentpage;
    },
  },
});

export const { allProductsfn, changeCurrPage } = homeSlice.actions;
export default homeSlice.reducer;
