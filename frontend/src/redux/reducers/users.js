import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "users",
  initialState: {
    token: JSON.parse(localStorage.getItem("token")) || "",
    isLoggedIn: localStorage.getItem("token") ? true : false,
    userId: JSON.parse(localStorage.getItem("userId")) || "",
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    setLogout: (state, action) => {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.clear();
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", JSON.stringify(action.payload));
    },
    
  },
});

export const { setLogin, setLogout, setUserId } = userSlice.actions;
export default userSlice.reducer;
