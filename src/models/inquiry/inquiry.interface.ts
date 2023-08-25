export interface IInquiryListInfo {
  seq: number;
  title: string;
  writer: string;
  memberId: string;
  contents: string;
  isAnswerd: boolean;
  registerDatetime: string;
  categoryName: string;
  categoryCode: number;
  country: string;
  answerContents: string;
  answerWriter: string;
  adminId: string;
  answerRegisterDatetime: string;
}

export interface IRequestInquiryList {
  searchTarget: string;
  searchKeyword: string;
  categoryCode: string;
  startDate: string;
  endDate: string;
  isAnswered: string;
}

export interface IInquiryDetailInfo {
  inquiryInfo: {
    seq: number;
    title: string;
    inquiryCategoryCode: number;
    memberId: string;
    contents: string;
    writer: string;
    registerDatetime: string;
    adminId: string;
  };
  files: string[];
}
