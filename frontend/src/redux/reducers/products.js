import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItems: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addItems,setItems } = productSlice.actions;
export default productSlice.reducer;
