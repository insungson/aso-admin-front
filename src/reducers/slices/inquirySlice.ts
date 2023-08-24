import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as inquiryModel from "@models/inquiry";
import * as thunks from "../thunks/inquiryThunks";

const inquirySlice = createSlice({
  name: "INQUIRY",
  initialState: {
    // 문의 리스트
    inquiryList: [] as inquiryModel.IInquiryListInfo[],
    // 문의 답변정보
    answerInquiryInfo: {} as inquiryModel.IInquiryListInfo | {},
  },
  reducers: {
    // 문의 답변 수정 시
    setAnswerInquiryInfo: (
      state,
      { payload }: PayloadAction<inquiryModel.IInquiryListInfo>
    ) => {
      state.answerInquiryInfo = payload;
    },
  },
  extraReducers: (builder) => {
    // 문의 리스트 요청
    builder.addCase(
      thunks.getInquiryListThunk.fulfilled,
      (state, { payload, meta: { requestStatus } }) => {
        state.inquiryList = payload;
      }
    );
  },
});

export const inquiryThunks = thunks;
export const inquirySliceActions = inquirySlice.actions;
export const inquirySliceName = inquirySlice.name;
export const inquiryReducer = inquirySlice.reducer;
