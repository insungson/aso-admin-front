import { IInquiryListInfo } from "@models/inquiry";
import { chartUtil } from "@utils/common";
import moment from "moment";

export class CreateInquiryPageOptions {
  /**
   * @description
   * @param responsedData
   */
  getInquiryList(
    responsedData: IInquiryListInfo[],
    editFn: (params: IInquiryListInfo) => void
  ) {
    // return 변수 선언
    let data = chartUtil.getArrayByValidate(responsedData);
    let columns = [
      {
        name: <div style={{ textAlign: "center", width: "50px" }}>No</div>,
        selector: (row: IInquiryListInfo, index) => row.seq,
        sortable: true,
      },
      {
        name: "제목",
        selector: (row: IInquiryListInfo) => row.title,
        sortable: true,
      },
      {
        name: "언어",
        selector: (row: IInquiryListInfo) => row.country,
        cell: (row: IInquiryListInfo) => String(row.country).toUpperCase(),
        sortable: true,
      },
      {
        name: "작성일",
        selector: (row: IInquiryListInfo) => row.registerDatetime,
        cell: (row: IInquiryListInfo) =>
          moment(row.registerDatetime).format("YYYY-MM-DD, hh:mm"),
        sortable: true,
      },
      {
        name: "답변",
        selector: (row: IInquiryListInfo) => row.isAnswerd,
        cell: (row: IInquiryListInfo) => {
          return <>{row.isAnswerd ? "완료" : "미완료"}</>;
        },
        sortable: true,
      },
      {
        name: "처리자",
        selector: (row: IInquiryListInfo) => row.answerWriter,
        sortable: true,
      },
      {
        name: "답변일",
        selector: (row: IInquiryListInfo) => row.answerRegisterDatetime,
        cell: (row: IInquiryListInfo) => {
          return (
            <>
              {row.isAnswerd
                ? moment(row.answerRegisterDatetime).format("YYYY-MM-DD, hh:mm")
                : "-"}
            </>
          );
        },
        sortable: true,
      },
      {
        name: "답변 / 수정",
        cell: (row: IInquiryListInfo) => {
          return (
            <div style={{ textAlign: "center", marginLeft: "20px" }}>
              <button onClick={() => editFn(row)}>[답변/수정]</button>
            </div>
          );
        },
        sortable: false,
      },
    ];

    return { data, columns };
  }
}
