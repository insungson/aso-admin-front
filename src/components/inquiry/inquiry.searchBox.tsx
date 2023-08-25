import { useState } from "react";
import moment from "moment";
import { IRequestInquiryList } from "@models/inquiry";
import { useAppDispatch } from "@reducers/index";
import { dateUtil } from "@utils/common";

const SearchBox = () => {
  const dispatch = useAppDispatch();

  const [params, setParams] = useState<IRequestInquiryList>({
    searchTarget: "titleContents",
    searchKeyword: "",
    categoryCode: "all",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    isAnswered: "0",
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
        return setParams((prev) => ({ ...prev, isAnswered: value }));
      default:
        break;
    }
  };

  const changingPlaceholder = () => {
    switch (params.searchTarget) {
      case "titleContents":
        return "제목, 내용을 검색할 수 있습니다.";
      case "title":
        return "제목을 검색할 수 있습니다.";
      case "writer":
        return "작성자를 검색할 수 있습니다.";
      default:
        break;
    }
  };

  const onClickDateButton = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "today":
        return setParams((prev) => ({
          ...prev,
          startDate: moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD"),
          endDate: moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD"),
        }));
      case "7days":
        return setParams((prev) => ({
          ...prev,
          startDate: moment(dateUtil.addDate(moment(), -7)).format(
            "YYYY-MM-DD"
          ),
          endDate: moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD"),
        }));
      case "15days":
        return setParams((prev) => ({
          ...prev,
          startDate: moment(dateUtil.addDate(moment(), -15)).format(
            "YYYY-MM-DD"
          ),
          endDate: moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD"),
        }));
      case "1month":
        return setParams((prev) => ({
          ...prev,
          startDate: moment(dateUtil.addDate(moment(), -30)).format(
            "YYYY-MM-DD"
          ),
          endDate: moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD"),
        }));
      case "3months":
        return setParams((prev) => ({
          ...prev,
          startDate: moment(dateUtil.addDate(moment(), -90)).format(
            "YYYY-MM-DD"
          ),
          endDate: moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD"),
        }));
      case "all": // all 의 startDate 기준은 2023-01-01
        return setParams((prev) => ({
          ...prev,
          startDate: "2023-01-01",
          endDate: moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD"),
        }));
    }
  };

  const checkButtonActive = (beforeDays: number): boolean => {
    const { startDate, endDate } = params;
    if (endDate === moment().format("YYYY-MM-DD")) {
      switch (beforeDays) {
        // 오늘
        case 0:
          return (
            startDate ===
            moment(dateUtil.addDate(moment(), 0)).format("YYYY-MM-DD")
          );
        // 7일 전
        case -7:
          return (
            startDate ===
            moment(dateUtil.addDate(moment(), -7)).format("YYYY-MM-DD")
          );
        // 15일 전
        case -15:
          return (
            startDate ===
            moment(dateUtil.addDate(moment(), -15)).format("YYYY-MM-DD")
          );
        // 1달 전
        case -30:
          return (
            startDate ===
            moment(dateUtil.addDate(moment(), -30)).format("YYYY-MM-DD")
          );
        // 3달 전
        case -90:
          return (
            startDate ===
            moment(dateUtil.addDate(moment(), -90)).format("YYYY-MM-DD")
          );
        // 전부 (2023-01-01)
        case -365:
          return startDate === "2023-01-01";
        default:
          return false;
      }
    } else {
      return false;
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
                    value={params.searchKeyword}
                    placeholder={changingPlaceholder()}
                    onChange={onChangeParams}
                    className="notice_search_input"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (params.searchKeyword.trim().length > 0) {
                          // onClickSearch();
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
                        // onClick={onClickSearch}
                      >
                        검색
                      </button>
                    </div>
                  </label>
                </td>
              </tr>
              <tr>
                <th scope="col">요금제</th>
                <td colSpan={3}>
                  <div className="radio-box">
                    <input
                      type="radio"
                      name="categoryCode"
                      className="ipt-radio"
                      id="radio-1"
                      value={"all"}
                      onChange={onChangeParams}
                      checked={params.categoryCode === "all"}
                    />
                    <label htmlFor="radio-1">
                      <span>전체</span>
                    </label>
                    <input
                      type="radio"
                      name="categoryCode"
                      className="ipt-radio"
                      id="radio-2"
                      value={"1"}
                      onChange={onChangeParams}
                      checked={params.categoryCode === "1"}
                    />
                    <label htmlFor="radio-2">
                      <span>구독/결제</span>
                    </label>
                    <input
                      type="radio"
                      name="categoryCode"
                      className="ipt-radio"
                      id="radio-3"
                      value={"2"}
                      onChange={onChangeParams}
                      checked={params.categoryCode === "2"}
                    />
                    <label htmlFor="radio-3">
                      <span>이용 문의</span>
                    </label>
                    <input
                      type="radio"
                      name="categoryCode"
                      className="ipt-radio"
                      id="radio-4"
                      value={"3"}
                      onChange={onChangeParams}
                      checked={params.categoryCode === "3"}
                    />
                    <label htmlFor="radio-4">
                      <span>ASO</span>
                    </label>
                    <input
                      type="radio"
                      name="categoryCode"
                      className="ipt-radio"
                      id="radio-5"
                      value={"4"}
                      onChange={onChangeParams}
                      checked={params.categoryCode === "4"}
                    />
                    <label htmlFor="radio-5">
                      <span>계정</span>
                    </label>
                    <input
                      type="radio"
                      name="categoryCode"
                      className="ipt-radio"
                      id="radio-6"
                      value={"5"}
                      onChange={onChangeParams}
                      checked={params.categoryCode === "5"}
                    />
                    <label htmlFor="radio-6">
                      <span>기타 문의</span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="col">가입일자</th>
                <td colSpan={3}>
                  <div className="member_manage_date_form">
                    <div>
                      <input
                        type="date"
                        name="startDate"
                        value={params.startDate}
                        onChange={onChangeParams}
                      />{" "}
                      ~
                      <input
                        type="date"
                        name="endDate"
                        value={params.endDate}
                        onChange={onChangeParams}
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className={`member_manage_date_btn${
                          checkButtonActive(0) ? "_active" : ""
                        }`}
                        name="today"
                        value={"today"}
                        onClick={onClickDateButton}
                      >
                        오늘
                      </button>
                      <button
                        type="button"
                        className={`member_manage_date_btn${
                          checkButtonActive(-7) ? "_active" : ""
                        }`}
                        name="7days"
                        value={"7days"}
                        onClick={onClickDateButton}
                      >
                        7일
                      </button>
                      <button
                        type="button"
                        className={`member_manage_date_btn${
                          checkButtonActive(-15) ? "_active" : ""
                        }`}
                        name="15days"
                        value={"15days"}
                        onClick={onClickDateButton}
                      >
                        15일
                      </button>
                      <button
                        type="button"
                        className={`member_manage_date_btn${
                          checkButtonActive(-30) ? "_active" : ""
                        }`}
                        name="1month"
                        value={"1month"}
                        onClick={onClickDateButton}
                      >
                        1개월
                      </button>
                      <button
                        type="button"
                        className={`member_manage_date_btn${
                          checkButtonActive(-90) ? "_active" : ""
                        }`}
                        name="3months"
                        value={"3months"}
                        onClick={onClickDateButton}
                      >
                        3개월
                      </button>
                      <button
                        type="button"
                        className={`member_manage_date_btn${
                          checkButtonActive(-365) ? "_active" : ""
                        }`}
                        name="all"
                        value={"all"}
                        onClick={onClickDateButton}
                      >
                        전체
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="col">답변 여부</th>
                <td colSpan={3}>
                  <div className="radio-box">
                    <input
                      type="radio"
                      name="isAnswered"
                      className="ipt-radio"
                      id="radio-7"
                      value={"0"}
                      onChange={onChangeParams}
                      checked={params.isAnswered === "0"}
                    />
                    <label htmlFor="radio-7">
                      <span>미답변</span>
                    </label>
                    <input
                      type="radio"
                      name="isAnswered"
                      className="ipt-radio"
                      id="radio-8"
                      value={"all"}
                      onChange={onChangeParams}
                      checked={params.isAnswered === "all"}
                    />
                    <label htmlFor="radio-8">
                      <span>전체</span>
                    </label>
                    <input
                      type="radio"
                      name="isAnswered"
                      className="ipt-radio"
                      id="radio-9"
                      value={"1"}
                      onChange={onChangeParams}
                      checked={params.isAnswered === "1"}
                    />
                    <label htmlFor="radio-9">
                      <span>답변 완료</span>
                    </label>
                  </div>
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
