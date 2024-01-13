// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      console.log(state.token);
    },
  },
});

export const { setCredentials, setToken } = authSlice.actions;
export default authSlice.reducer;
