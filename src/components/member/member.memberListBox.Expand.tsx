import { FC } from "react";
import { useQuery } from "react-query";
import { IMemberListInfo } from "@models/member";
import { fetchGetMemberSetting } from "@apis/index";

const MemberListBoxExpand: FC<{ data: IMemberListInfo }> = ({ data }) => {
  const {
    status,
    data: responsedData,
    error,
  } = useQuery(
    [
      { fetchName: "fetchGetMemberSetting" },
      {
        memberId: data?.memberId,
      },
    ],
    fetchGetMemberSetting,
    {
      enabled: !!data,
      staleTime: 1000 * 60,
    }
  );

  return (
    <div className="tb-basic-wrap tb-type-1">
      <div className="tb-basic-inner">
        <table style={{ minWidth: 0 }}>
          <colgroup>
            <col width="20%" />
            <col width="80%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="col">마이앱</th>
              {/* //@ts-ignore */}
              <td style={{ display: "flex" }}>
                {!!responsedData &&
                  responsedData?.myApp.length > 0 &&
                  responsedData?.myApp.map((item, index) => (
                    <div style={{ marginLeft: "7px" }}>
                      {item.appTitle}({item.country}/{item.provider})
                      {responsedData?.myApp.length - 1 !== index && ","}
                    </div>
                  ))}
              </td>
            </tr>
            <tr>
              <th scope="col">경쟁앱</th>
              {/* //@ts-ignore */}
              <td style={{ display: "flex" }}>
                {!!responsedData &&
                  responsedData?.MyCompetitorApp.length > 0 &&
                  responsedData?.MyCompetitorApp.map((item, index) => (
                    <div style={{ marginLeft: "7px" }}>
                      {item.appTitle}({item.country}/{item.provider})
                      {responsedData?.MyCompetitorApp.length - 1 !== index &&
                        ","}
                    </div>
                  ))}
              </td>
            </tr>
            <tr>
              <th scope="col">키워드</th>
              {/* //@ts-ignore */}
              <td style={{ display: "flex" }}>
                {!!responsedData &&
                  responsedData?.myKeyword.length > 0 &&
                  responsedData?.myKeyword.map((item, index) => (
                    <div style={{ marginLeft: "7px" }}>
                      {item}
                      {responsedData?.myKeyword.length - 1 !== index && ","}
                    </div>
                  ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberListBoxExpand;
