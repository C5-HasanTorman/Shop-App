import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",

  initialState: {
    items: JSON.parse(localStorage.getItem("products")) || [],
  },

  reducers: {
    setItems: (state, action) => {
      state.items = action.payload.reverse();
      localStorage.setItem("products", JSON.stringify(action.payload));
    },

    addItems: (state, action) => {
      state.items.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item, index) => {
        return item.id != action.payload;
      });
    },
    updateItemById: (state, action) => {
      state.items = state.items.map((item, index) => {
        if (action.payload.id == item.id) {
          return action.payload;
        }
        return item;
      });
    },
  },
});

export const { addItems, setItems, deleteItem, updateItemById } =
  productSlice.actions;
export default productSlice.reducer;
