import { IMemberListInfo } from "@models/member";
import { chartUtil } from "@utils/common";
import moment from "moment";

/**
 * Member 페이지 gridChart 옵션
 */
export class CreateMemberPageOptions {
  getMemberList(responsedData: IMemberListInfo[]) {
    // return 변수 선언
    let data = chartUtil.getArrayByValidate(responsedData);
    let columns = [
      {
        name: "계정",
        selector: (row: IMemberListInfo) => row.email,
        center: true,
        sortable: true,
      },
      {
        name: "OpenID",
        selector: (row: IMemberListInfo) => row.provider,
        center: true,
        sortable: true,
      },
      {
        name: "개인 세션 ID",
        selector: (row: IMemberListInfo) => row.sessionId,
        center: true,
        sortable: true,
      },
      {
        name: "요금",
        selector: (row: IMemberListInfo) => row.planName,
        center: true,
        sortable: true,
      },
      {
        name: "가입일",
        selector: (row: IMemberListInfo) =>
          moment(row.registerDatetime).format("YYYY-MM-DD"),
        center: true,
        sortable: true,
      },
      {
        name: "팀원",
        selector: (row: IMemberListInfo) => row.members,
        center: true,
        sortable: true,
      },
      {
        name: "국가",
        selector: (row: IMemberListInfo) => row.country,
        center: true,
        sortable: true,
      },
    ];

    return {
      data,
      columns,
    };
  }
}
