import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as authModel from "@models/auth";

const authSlice = createSlice({
  name: "AUTH",
  initialState: {
    userInfo: null as authModel.IUserInfo | null,
  },
  reducers: {},
  extraReducers: {},
});

export const authSliceActions = authSlice.actions;
export const authSliceName = authSlice.name;
export const authReducer = authSlice.reducer;
