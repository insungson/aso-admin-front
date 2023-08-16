import { createAsyncThunk } from "@reduxjs/toolkit";
import * as mainModel from "@models/main";

/**
 * 사용자 현황 요청
 */
export const getUserStatusThunk = createAsyncThunk(
  "getUserStatusThunk",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Promise.resolve({
        dau: 3201,
        experiencedUser: 610,
        freeUser: 21220,
        paidUser: 9121,
      });
      return response;
    } catch (error) {
      return rejectWithValue("GET_USERSTATUS_FAIL");
    }
  }
);
/**
 * 고객문의 요청
 */
export const getCustomerInquiryThunk = createAsyncThunk(
  "getCustomerInquiryThunk",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Promise.resolve({
        paidUserInquiries: 3,
        etcInquiries: 20,
      });
      return response;
    } catch (error) {
      return rejectWithValue("GET_CUSTOMERINQUIRY_FAIL");
    }
  }
);
/**
 * DAU 요청
 */
export const postDAUThunk = createAsyncThunk(
  "postDAUThunk",
  async (params, { rejectWithValue }) => {
    try {
      // 전체 사용자 - 체험사용자, 유료 사용자, 무료 사용자
      const response = await Promise.resolve([
        {
          date: "2023-08-01",
          total: 222,
          experienced: 111,
          paid: 11,
          free: 100,
        },
        {
          date: "2023-08-02",
          total: 222,
          experienced: 111,
          paid: 11,
          free: 100,
        },
        {
          date: "2023-08-03",
          total: 222,
          experienced: 111,
          paid: 11,
          free: 100,
        },
        {
          date: "2023-08-04",
          total: 222,
          experienced: 111,
          paid: 11,
          free: 100,
        },
        {
          date: "2023-08-05",
          total: 222,
          experienced: 111,
          paid: 11,
          free: 100,
        },
        {
          date: "2023-08-06",
          total: 222,
          experienced: 111,
          paid: 11,
          free: 100,
        },
        {
          date: "2023-08-07",
          total: 222,
          experienced: 111,
          paid: 11,
          free: 100,
        },
      ]);
      return response;
    } catch (error) {
      return rejectWithValue("POST_DAUTHUNK_FAIL");
    }
  }
);
/**
 * 사용자 구분 DAU
 */
export const postUserDAUThunk = createAsyncThunk(
  "postUserDAUThunk",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Promise.resolve([
        {
          date: "2023-08-01",
          experienced: 111,
          paid: 11,
          free: 100,
        },
        {
          date: "2023-08-02",
          experienced: 111,
          paid: 11,
          free: 100,
        },
        {
          date: "2023-08-03",
          experienced: 111,
          paid: 11,
          free: 100,
        },
        {
          date: "2023-08-04",
          experienced: 111,
          paid: 11,
          free: 100,
        },
        {
          date: "2023-08-05",
          experienced: 111,
          paid: 11,
          free: 100,
        },
        {
          date: "2023-08-06",
          experienced: 111,
          paid: 11,
          free: 100,
        },
        {
          date: "2023-08-07",
          experienced: 111,
          paid: 11,
          free: 100,
        },
      ]);
      return response;
    } catch (error) {
      return rejectWithValue("POST_USERDAU_FAIL");
    }
  }
);
/**
 * 사용자 안내
 */
export const getUserNotice = createAsyncThunk(
  "getUserNotice",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Promise.resolve([
        {
          title: "[23.07.11] ASO index 구글 플레이 데이터 분석 관련 이슈 안내",
          isLive: true,
        },
        {
          title: "[23.07.11] ASO index 수상 기념 프로모션 안내",
          isLive: false,
        },
      ]);
      return response;
    } catch (error) {
      return rejectWithValue("GET_USERNOTICE_FAIL");
    }
  }
);
