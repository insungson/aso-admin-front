import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as authModel from "@models/auth";
import * as thunks from "../thunks/authThunks";

const authSlice = createSlice({
  name: "AUTH",
  initialState: {
    userInfo: null as authModel.IUserInfo | null,
  },
  reducers: {
    setLogout: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    // 로그인 요청
    builder.addCase(
      thunks.postSignThunk.fulfilled,
      (state, { payload, meta: { requestStatus } }) => {
        state.userInfo = payload;
      }
    );
  },
});

export const authThunks = thunks;
export const authSliceActions = authSlice.actions;
export const authSliceName = authSlice.name;
export const authReducer = authSlice.reducer;
