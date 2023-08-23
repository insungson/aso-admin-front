export interface INoticeListInfo {
  seq: number;
  title: string;
  contents: string;
  deploy: boolean;
  writer: string;
  registerDatetime: string;
  startDate: string;
  endDate: string;
}

export interface INoticeInfo {
  seq: number;
  noticeSubject: string;
  noticeMethod: string;
  title_ko: string;
  contents_ko: string;
  textLink_ko: string;
  url_ko: string;
  title_en: string;
  contents_en: string;
  textLink_en: string;
  url_en: string;
  title_ja: string;
  contents_ja: string;
  textLink_ja: string;
  url_ja: string;
  deploy: boolean;
  writer: string;
  registerDatetime: string;
  startDate: string;
  endDate: string;
}

export interface INoticeFilter {
  title: string;
  contents: string;
  writer: string;
}
