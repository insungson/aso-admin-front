import { createAsyncThunk } from "@reduxjs/toolkit";
import { INoticeListInfo } from "@models/notice";

/**
 * 공지내역 리스트 요청
 */
export const getNoticeListThunk = createAsyncThunk(
  "getNoticeListThunk",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Promise.resolve([
        {
          seq: 0,
          title: "구글플레이",
          contents: "구글컨텐츠",
          deploy: true,
          writer: "tester1",
          registerDatetime: "2023-08-22T05:29:13.167Z",
          startDate: "2023-08-22",
          endDate: "2023-08-23",
        },
        {
          seq: 1,
          title: "애플스토어",
          contents: "애플컨텐츠",
          deploy: true,
          writer: "tester2",
          link: "www.google.com",
          linkText: "google",
          registerDatetime: "2023-08-22T05:29:13.167Z",
          startDate: "2023-08-22",
          endDate: "2023-08-23",
        },
        {
          seq: 2,
          title: "구글플레이-테스트1",
          contents: "구글컨텐츠-테스트1",
          deploy: true,
          writer: "tester3",
          link: "www.google.com",
          linkText: "google",
          registerDatetime: "2023-08-22T05:29:13.167Z",
          startDate: "2023-08-22",
          endDate: "2023-08-23",
        },
        {
          seq: 3,
          title: "애플스토어-테스트2",
          contents: "애플컨텐츠-테스트2",
          deploy: true,
          writer: "tester4",
          link: "www.google.com",
          linkText: "google",
          registerDatetime: "2023-08-22T05:29:13.167Z",
          startDate: "2023-08-22",
          endDate: "2023-08-23",
        },
        {
          seq: 4,
          title: "원스토어",
          contents: "원스토어 컨텐츠",
          deploy: true,
          writer: "tester5",
          link: "www.google.com",
          linkText: "google",
          registerDatetime: "2023-08-22T05:29:13.167Z",
          startDate: "2023-08-22",
          endDate: "2023-08-23",
        },
      ]);
      return response;
    } catch (error) {
      return rejectWithValue("GET_NOTICELIST_FAIL");
    }
  }
);

/**
 * 공지내역 세부사항 요청
 */
export const getNoticeInfoDetail = createAsyncThunk(
  "getNoticeInfoDetail",
  async (params: INoticeListInfo, { rejectWithValue }) => {
    console.log("getNoticeInfoDetail params: ", params);
    try {
      const response = await Promise.resolve({
        seq: 4,
        noticeSubject: "all",
        noticeMethod: "once",
        title_ko: "원스토어",
        contents_ko: "<p>컨텐츠</P>",
        textLink_ko: "링크",
        url_ko: "www.google.com",
        title_en: "원스토어",
        contents_en: "<p><b>컨텐츠</b></P>",
        textLink_en: "링크",
        url_rn: "www.google.com",
        title_ja: "원스토어",
        contents_ja: "<p><b>컨텐츠</b><br/><span>123</span></P>",
        textLink_ja: "링크",
        url_ja: "www.google.com",
        deploy: true,
        writer: "tester5",
        link: "www.google.com",
        linkText: "google",
        registerDatetime: "2023-08-22T05:29:13.167Z",
        startDate: "2023-08-22",
        endDate: "2023-08-23",
      });
      return response;
    } catch (error) {
      return rejectWithValue("GET_NOTICEINFODETAIL_FAIL");
    }
  }
);

/**
 * 공지사항 작성
 * TODO: api 로 따로 옮겨놓기!
 * 이거 완료 후 모달 창 닫고 리스트 전체 재요청처리
 */
export const postNoticeInfo = createAsyncThunk(
  "postNoticeInfo",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Promise.resolve(true);
    } catch (error) {
      return rejectWithValue("POST_NOTICEINFO_FAIL");
    }
  }
);
