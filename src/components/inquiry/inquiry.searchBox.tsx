import { useState } from "react";
import moment from "moment";
import { IRequestInquiryList } from "@models/inquiry";
import { useAppDispatch } from "@reducers/index";

const SearchBox = () => {
  const dispatch = useAppDispatch();

  const [params, setParams] = useState<IRequestInquiryList>({
    searchTarget: "titleContents",
    searchKeyword: "",
    categoryCode: "all",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    isAnswered: false,
  });

  const onChangeParams = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "searchTarget":
        return setParams((prev) => ({ ...prev, searchTarget: value }));
      case "searchKeyword":
        return setParams((prev) => ({ ...prev, searchKeyword: value }));
      case "categoryCode":
        return setParams((prev) => ({ ...prev, categoryCode: value }));
      case "startDate":
        return setParams((prev) => ({
          ...prev,
          startDate: moment(new Date(value)).format("YYYY-MM-DD"),
        }));
      case "endDate":
        return setParams((prev) => ({
          ...prev,
          endDate: moment(new Date(value)).format("YYYY-MM-DD"),
        }));
      case "isAnswered":
        return setParams((prev) => ({ ...prev, isAnswered: !prev.isAnswered }));
      default:
        break;
    }
  };

  return (
    <>
      <h2 className="account-tit">접수 문의 리스트</h2>

      <div className="tb-basic-wrap tb-type-1">
        <div className="tb-basic-inner">
          <table style={{ minWidth: 0 }}>
            <colgroup>
              <col width="15%" />
              <col width="20%" />
              <col width="45%" />
              <col width="20%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="col">검색어</th>
                <td>
                  <label className="select">
                    <select
                      value={params.searchTarget}
                      onChange={onChangeParams}
                      name="searchTarget"
                    >
                      <option value={"titleContents"}>제목 또는 내용</option>
                      <option value={"title"}>제목</option>
                      <option value={"writer"}>작성자</option>
                    </select>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="searchKeyword"
                    // placeholder={changingPlaceholder()}
                    onChange={onChangeParams}
                    className="notice_search_input"
                    // onKeyDown={(e) => {
                    //   if (e.key === "Enter") {
                    //     if (filterOptions.text.trim().length > 0) {
                    //       onClickSearch();
                    //     }
                    //   }
                    // }}
                  />
                </td>
                <td>
                  <label className="ipt">
                    <div className="account-btn" style={{ marginTop: 0 }}>
                      <button
                        type="submit"
                        className="btn pri"
                        // onClick={onClickSearch}
                      >
                        검색
                      </button>
                    </div>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
