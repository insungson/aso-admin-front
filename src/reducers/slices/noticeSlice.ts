import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as noticeModel from "@models/notice";
import * as thunks from "../thunks/noticeThunks";

const noticeSlice = createSlice({
  name: "NOTICE",
  initialState: {
    noticeList: [] as noticeModel.INoticeListInfo[],
    filterObj: {},
    editNoticeInfo: {} as noticeModel.INoticeInfo | {}, //공지 수정 시 팝업에 뜨는 정보
  },
  reducers: {
    // 배포 스위치버튼 클릭 시
    setDeployNoticeList: (
      state,
      { payload }: PayloadAction<Partial<noticeModel.INoticeListInfo>>
    ) => {
      state.noticeList = state.noticeList.map((item) => {
        if (item.seq === payload.seq) {
          return { ...item, deploy: !payload.deploy };
        } else {
          return item;
        }
      });
    },
    // 공지 수정 시
    setNoticeList: (
      state,
      { payload }: PayloadAction<Partial<noticeModel.INoticeInfo>>
    ) => {
      state.noticeList = state.noticeList.map((item) => {
        if (item.seq === payload.seq) {
          return {
            ...item,
            ...payload,
          };
        } else {
          return item;
        }
      });
    },
    // 필터 조건 설정 시 (1개 설정 시 나머진 초기화 처리) 전체 검색 시 초기화(빈객체)
    setNoticeFilter: (
      state,
      { payload }: PayloadAction<Partial<noticeModel.INoticeFilter>>
    ) => {
      state.filterObj = payload;
    },
    // 공지 사항 수정시 초기정보 (+팝업 오픈/닫기 처리)
    setEditNoticeInfo: (
      state,
      { payload }: PayloadAction<noticeModel.INoticeInfo | {}>
    ) => {
      state.editNoticeInfo = payload;
    },
  },
  extraReducers: (builder) => {
    // 공지관리 리스트 요청
    builder.addCase(
      thunks.getNoticeListThunk.fulfilled,
      (state, { payload, meta: { requestStatus } }) => {
        state.noticeList = payload;
      }
    );
    // 공지관리 세부 요청
    builder.addCase(
      thunks.getNoticeInfoDetail.fulfilled,
      (state, { payload, meta: { requestStatus } }) => {
        state.editNoticeInfo = payload;
      }
    );
  },
});

export const noticeThunks = thunks;
export const noticeSliceActions = noticeSlice.actions;
export const noticeSliceName = noticeSlice.name;
export const noticeReducer = noticeSlice.reducer;
