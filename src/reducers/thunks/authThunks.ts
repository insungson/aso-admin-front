import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISignInForm } from "@models/auth";

/**
 * 로그인 요청
 */
export const postSignThunk = createAsyncThunk(
  "postSignThunk",
  async (params: ISignInForm, { rejectWithValue }) => {
    try {
      const response = await Promise.resolve({ name: "hello" });
      return response;
    } catch (error) {
      return rejectWithValue("LOGIN_FAIL");
    }
  }
);
