import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * 회원관리 맴버 리스트 요청
 */
export const getMemberListThunk = createAsyncThunk(
  "getMemberListThunk",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Promise.resolve([
        {
          memberId: "45f124c07dcdde8594cba34536f3a853",
          email: "allen@aixinc.io",
          provider: "google",
          sessionId: null,
          planName: "Free",
          registerDatetime: "2023-04-20 09:29:00",
          members: 1,
          country: "JP",
        },
        {
          memberId: "4d3e9011515b8f48ab6976c672a9427d",
          email: "sea@aixinc.io",
          provider: "google",
          sessionId: null,
          planName: "Free",
          registerDatetime: "2023-04-18 09:12:29",
          members: 1,
          country: "JP",
        },
        {
          memberId: "4a224e75941992d385b1a1eb15520e67",
          email: "sam@aixinc.io",
          provider: "google",
          sessionId: null,
          planName: "Free",
          registerDatetime: "2023-04-14 09:29:55",
          members: 1,
          country: "JP",
        },
        {
          memberId: "4feab47202a03f60ba9193cb6b46c3d7",
          email: "sakura.k@aixinc.io",
          provider: "google",
          sessionId: null,
          planName: "Free",
          registerDatetime: "2023-04-03 14:52:38",
          members: 1,
          country: "JP",
        },
        {
          memberId: "4efff9f17ac6f3e995b4b4697ee1616e",
          email: "allen@aixinc.io",
          provider: "google",
          sessionId: null,
          planName: "Free",
          registerDatetime: "2023-03-24 14:54:06",
          members: 1,
          country: "JP",
        },
        {
          memberId: "4b44f0e8cbe195ab8d73c51201349cda",
          email: "aix@aixinc.io",
          provider: "google",
          sessionId: null,
          planName: "Free",
          registerDatetime: "2023-03-14 11:44:28",
          members: 1,
          country: "JP",
        },
        {
          memberId: "4f6af32af31320a789932387912a2f09",
          email: "min@aixinc.io",
          provider: "google",
          sessionId: null,
          planName: "Free",
          registerDatetime: "2023-03-06 10:33:40",
          members: 1,
          country: "JP",
        },
        {
          memberId: "4df5b6bdfed9c164ae38437b56407638",
          email: "sam@aixinc.io",
          provider: "google",
          sessionId: null,
          planName: "Free",
          registerDatetime: "2023-03-04 12:55:29",
          members: 1,
          country: "JP",
        },
      ]);
      return response;
    } catch (error) {
      return rejectWithValue("GET_MEMBERLIST_FAIL");
    }
  }
);
