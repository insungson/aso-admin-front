import { createSlice } from "@reduxjs/toolkit";
import * as mainModel from "@models/main";
import * as thunks from "../thunks/mainThunks";

const mainSlice = createSlice({
  name: "MAIN",
  initialState: {
    userStatus: {} as mainModel.IUserStatus,
    customerInquiries: {} as mainModel.ICustomerInquiry,
    dau: [] as mainModel.IDAU[],
    userDau: [] as mainModel.IUserDAU[],
    userNotice: [] as mainModel.IUserNotice[],
  },
  reducers: {},
  extraReducers: (builder) => {
    // 사용자 현황 요청
    builder.addCase(
      thunks.getUserStatusThunk.fulfilled,
      (state, { payload, meta: { requestStatus } }) => {
        state.userStatus = payload;
      }
    );
    // 고객문의 요청
    builder.addCase(
      thunks.getCustomerInquiryThunk.fulfilled,
      (state, { payload, meta: { requestStatus } }) => {
        state.customerInquiries = payload;
      }
    );
    // DAU 요청
    builder.addCase(
      thunks.postDAUThunk.fulfilled,
      (state, { payload, meta: { requestStatus } }) => {
        state.dau = payload;
      }
    );
    // 사용자 구분 DAU
    builder.addCase(
      thunks.postUserDAUThunk.fulfilled,
      (state, { payload, meta: { requestStatus } }) => {
        state.userDau = payload;
      }
    );
    // 사용자 안내
    builder.addCase(
      thunks.getUserNotice.fulfilled,
      (state, { payload, meta: { requestStatus } }) => {
        state.userNotice = payload;
      }
    );
  },
});

export const mainThunks = thunks;
export const mainSliceActions = mainSlice.actions;
export const mainSliceName = mainSlice.name;
export const mainReducer = mainSlice.reducer;
