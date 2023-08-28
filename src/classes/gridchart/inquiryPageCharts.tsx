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
        center: true,
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
        center: true,
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
        center: true,

        sortable: true,
      },
      {
        name: "처리자",
        selector: (row: IInquiryListInfo) => row.answerWriter,
        center: true,
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
        center: true,
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
        center: true,
        sortable: false,
      },
    ];

    return { data, columns };
  }

  getUserInquiryList(
    responsedData: IInquiryListInfo[],
    editFn: (params: IInquiryListInfo) => void,
    currentObj: IInquiryListInfo
  ) {
    const conditionalRowStyles = [
      {
        when: (row: IInquiryListInfo) => row.seq === currentObj.seq,
        style: {
          backgroundColor: "rgba(63, 195, 128, 0.9)",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ];
    return {
      ...this.getInquiryList(responsedData, editFn),
      conditionalRowStyles,
    };
  }
}
