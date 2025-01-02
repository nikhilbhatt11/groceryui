import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const shopTodoSlice = createSlice({
  name: "shoptodo",
  initialState,
  reducers: {
    allShopTodofn: (state, action) => {
      state.todos = todos;
    },
  },
});

export const { allShopTodofn } = shopTodoSlice.actions;
export default shopTodoSlice.reducer;
