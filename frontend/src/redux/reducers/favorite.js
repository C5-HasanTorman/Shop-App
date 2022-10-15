import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",

  initialState: {
    list: JSON.parse(localStorage.getItem("products")) || [],
  },

  reducers: {
    setList: (state, action) => {
      state.list = action.payload.reverse();
    },

    addToList: (state, action) => {
      state.list.push(action.payload);
    },
    deleteFromList: (state, action) => {
      state.list = state.list.filter((ele, index) => {
        return ele.id != action.payload;
      });
    },
  },
});

export const { setList, addToList, deleteFromList } = favoriteSlice.actions;
export default favoriteSlice.reducer;
