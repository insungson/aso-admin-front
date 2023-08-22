import { useState } from "react";
import { useAppDispatch } from "@reducers/index";
import { noticeSliceActions } from "@reducers/slices/noticeSlice";

const SearchBox = () => {
  const dispatch = useAppDispatch();

  const [filterOptions, setFilterOptions] = useState({
    selectCategory: "all",
    text: "",
  });

  const onChangeFilterOptions = (event) => {
    const { name, value } = event.target;
    if (name === "category") {
      setFilterOptions((prev) => ({ ...prev, selectCategory: value }));
    } else if (name === "text") {
      setFilterOptions((prev) => ({ ...prev, text: value }));
    }
  };

  const onClickSearch = () => {
    // all 은 title content에 둘다 text 넣어주기 (dispatch에서)
    // 나머진 각각 맞는것만 넣기
    let filterObj;
    switch (filterOptions.selectCategory) {
      case "all":
        filterObj = {
          title: filterOptions.text,
          contents: filterOptions.text,
        };
        break;
      case "title":
        filterObj = {
          title: filterOptions.text,
        };
        break;
      case "contents":
        filterObj = {
          contents: filterOptions.text,
        };
        break;
      case "writer":
        filterObj = {
          writer: filterOptions.text,
        };
        break;
      default:
        break;
    }
    // 빈문자열 검색 시 전부 다 보여주기
    if (filterOptions.text.trim().length === 0) {
      filterObj = {};
    }
    dispatch(noticeSliceActions.setNoticeFilter(filterObj));
  };

  const changingPlaceholder = () => {
    switch (filterOptions.selectCategory) {
      case "all":
        // text disable 처리하기
        return "제목, 내용을 검색할 수 있습니다.";
      case "title":
        return "제목을 검색할 수 있습니다.";
      case "contents":
        return "내용을 검색할 수 있습니다.";
      case "writer":
        return "작성자를 검색할 수 있습니다.";
      default:
        break;
    }
  };

  return (
    <>
      <h2 className="account-tit">공지 관리</h2>
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
                      value={filterOptions.selectCategory}
                      onChange={onChangeFilterOptions}
                      name="category"
                    >
                      <option value={"all"}>제목 또는 내용</option>
                      <option value={"title"}>제목</option>
                      <option value={"contents"}>내용</option>
                      <option value={"writer"}>작성자</option>
                    </select>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="text"
                    placeholder={changingPlaceholder()}
                    onChange={onChangeFilterOptions}
                    className="notice_search_input"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (filterOptions.text.trim().length > 0) {
                          onClickSearch();
                        }
                      }
                    }}
                  />
                </td>
                <td>
                  <label className="ipt">
                    <div className="account-btn" style={{ marginTop: 0 }}>
                      <button
                        type="submit"
                        className="btn pri"
                        onClick={onClickSearch}
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
