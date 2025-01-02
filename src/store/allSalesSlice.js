import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sales: {},
  totalsales: 0,
  currentpage: 1,
  totalpages: 1,
  totalearning: 0,
  totalprofit: 0,
  lastgetpage: 1,
  date: "Today",
};

const allSalesSlice = createSlice({
  name: "allsales",
  initialState,
  reducers: {
    allSalesfn: (state, action) => {
      const {
        sales,
        totalsales,
        totalpages,
        currentpage,
        totalearning,
        totalprofit,
        lastgetpage,
        date,
      } = action.payload;
      console.log(
        sales,
        totalsales,
        totalpages,
        currentpage,
        totalearning,
        totalprofit,
        lastgetpage,
        date
      );
      state.sales[currentpage] = sales;
      state.totalsales = totalsales;
      state.totalpages = totalpages;
      state.currentpage = currentpage;
      state.totalearning = totalearning;
      state.totalprofit = totalprofit;
      state.lastgetpage = lastgetpage;
      state.date = date;
    },
    changeCurrPage: (state, action) => {
      const { currentpage } = action.payload;
      state.currentpage = currentpage;
    },
  },
});
// allsale, totalsales, currentpage, totalpages, totalprofit, totalearning;

export const { allSalesfn, changeCurrPage } = allSalesSlice.actions;
export default allSalesSlice.reducer;
