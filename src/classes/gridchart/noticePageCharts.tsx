import { INoticeListInfo, INoticeFilter } from "@models/notice";
import { chartUtil } from "@utils/common";
import moment from "moment";

/**
 * Notice 페이지 gridChart 옵션
 */
export class CreateNoticePageOptions {
  getNoticeList(
    responseData: INoticeListInfo[],
    deployFn: (params: Partial<INoticeListInfo>) => void,
    editFn: (params: Partial<INoticeListInfo>) => void,
    filterObj?: Partial<INoticeFilter>
  ) {
    // return 변수 선언
    let data = chartUtil.getArrayByValidate(responseData);
    let columns = [
      {
        name: "No",
        selector: (row: INoticeListInfo, index) => index + 1,
        sortable: true,
      },
      {
        name: "제목",
        selector: (row: INoticeListInfo) => row.title,
        sortable: true,
      },
      {
        name: "내용",
        selector: (row: INoticeListInfo) => row.contents,
        sortable: true,
      },
      {
        name: "배포",
        selector: (row: INoticeListInfo) => row.deploy,
        cell: (row: INoticeListInfo) => {
          return (
            <>
              <input
                type="checkbox"
                className="ipt-check enable"
                id={`${row.seq}`}
                checked={row.deploy}
                onChange={() => deployFn(row)}
              />
              <label htmlFor={`${row.seq}`}>
                <span className="blind">선택</span>
              </label>
            </>
          );
        },
        sortable: true,
      },
      {
        name: "작성자",
        selector: (row: INoticeListInfo) => row.writer,
        sortable: true,
      },
      {
        name: "작성일",
        selector: (row: INoticeListInfo) => row.registerDatetime,
        cell: (row: INoticeListInfo) => {
          return (
            <>{moment(row.registerDatetime).format("YYYY.MM.DD, HH:mm")}</>
          );
        },
        sortable: true,
      },
      {
        name: "기간",
        // selector: (row: INoticeListInfo) => row.,
        cell: (row: INoticeListInfo) => {
          return (
            <>
              {moment(row.startDate).format("YY.MM.DD")} ~{" "}
              {moment(row.endDate).format("YY.MM.DD")}
            </>
          );
        },
        sortable: false,
      },
      {
        name: "처리",
        // selector: () => ,
        cell: (row: INoticeListInfo) => {
          return (
            <>
              <button onClick={() => editFn(row)}>[수정]</button>
            </>
          );
        },
        sortable: false,
      },
    ];

    const filterObjKeys = Object.keys(filterObj);
    if (filterObjKeys.length > 0) {
      if (filterObjKeys.length === 2) {
        // 2개일땐 title, contents 필터처리
        data = data.filter((item) => {
          if (
            item.title.includes(filterObj.title) ||
            item.contents.includes(filterObj.contents)
          ) {
            return true;
          } else {
            return false;
          }
        });
      } else if (filterObjKeys.length === 1) {
        // 1개일 땐 구분하여 필터처리
        data = data.filter((item) => {
          if (item.title.includes(filterObj[filterObjKeys[0]])) {
            return true;
          } else {
            return false;
          }
        });
      }
    }

    return { data, columns };
  }
}
