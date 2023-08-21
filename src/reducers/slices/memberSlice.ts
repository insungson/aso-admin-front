import { createSlice } from "@reduxjs/toolkit";
import * as memberModel from "@models/member";
import * as thunks from "../thunks/memberThunks";

const memberSlice = createSlice({
  name: "MEMBER",
  initialState: {
    memberList: [] as memberModel.IMemberListInfo[],
  },
  reducers: {},
  extraReducers: (builder) => {
    // 사용자 리스트 요청
    builder.addCase(
      thunks.getMemberListThunk.fulfilled,
      (state, { payload, meta: { requestStatus } }) => {
        state.memberList = payload;
      }
    );
  },
});

export const memberThunks = thunks;
export const memberSliceActions = memberSlice.actions;
export const memberSliceName = memberSlice.name;
export const memberReducer = memberSlice.reducer;
