import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState, useCallback, forwardRef } from "react";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import { isBefore, addDays } from "date-fns";
import moment from "moment";
import { dateUtil } from "@utils/common";

// TODO: 회원 등급에 따라 Range 버튼 제한두기

const DatePickerRangeButton = ({
  layoutStartDate,
  setLayoutStartDate,
  layoutEndDate,
  setLayoutEndDate,
  isClearable,
}) => {
  const [dateRange, setDateRange] = useState([layoutStartDate, layoutEndDate]);
  const [startDate, endDate] = dateRange;

  // current Button
  const [currentButton, setCurrentButton] = useState<null | string>(
    dateUtil.getRangeDatePickerCurrentButton(layoutStartDate, layoutEndDate)
  );

  // 달력 창 열고 닫기
  const [calOpen, setCalOpen] = useState(false);

  // 날짜 선택 useCallback
  const onChangeHandler = useCallback((date) => {
    setCalOpen(true);
    const [startDate, endDate] = date;
    let result;
    if (endDate) {
      if (isBefore(startDate, endDate)) {
        result = date;
      } else {
        result = [endDate, startDate];
      }
    } else {
      result = date;
    }
    setDateRange(result);
    setLayoutStartDate(result[0]);
    setLayoutEndDate(result[1]);
    setCurrentButton(null); // 버튼 비활성화 처리
    // 달력 창 날짜 같을땐 열어둠
    if (!!date[0] && !!date[1] && result[0] !== result[1]) {
      setCalOpen(false);
    }
  }, []);

  // Date Range Button Handler
  const onClickDateRangeButtonHandler = useCallback(
    (value: string) => {
      switch (value) {
        case "weekly":
          setCurrentButton("weekly");
          setDateRange([
            dateUtil.addDate(moment(), -7),
            dateUtil.addDate(moment(), -1),
          ]);
          setLayoutStartDate(dateUtil.addDate(moment(), -7));
          setLayoutEndDate(dateUtil.addDate(moment(), -1));
          break;
        case "monthly":
          setCurrentButton("monthly");
          setDateRange([
            dateUtil.addDate(moment(), -30),
            dateUtil.addDate(moment(), -1),
          ]);
          setLayoutStartDate(dateUtil.addDate(moment(), -30));
          setLayoutEndDate(dateUtil.addDate(moment(), -1));
          break;
        // case 'halfYearly':
        //   setCurrentButton('halfYearly');
        //   setDateRange([commonUtil.addDate(moment(), -180), commonUtil.addDate(moment(), -1)]);
        //   break;
        case "yearly":
          setCurrentButton("yearly");
          setDateRange([
            dateUtil.addDate(moment(), -365),
            dateUtil.addDate(moment(), -1),
          ]);
          setLayoutStartDate(dateUtil.addDate(moment(), -365));
          setLayoutEndDate(dateUtil.addDate(moment(), -1));
          break;
        default:
          break;
      }
      setCalOpen(false);
    },
    [dateUtil, onChangeHandler]
  );

  // 데이트 피커 레이아웃 Handler
  const layoutContainer = useCallback(
    ({ className, children }) => {
      return (
        <div className="period_wrp">
          <div className="period_btn_bx">
            <button
              type="button"
              className={`${currentButton === "weekly" ? "on" : ""}`}
              onClick={() => onClickDateRangeButtonHandler("weekly")}
            >
              Weekly
            </button>
            <button
              type="button"
              className={`${currentButton === "monthly" ? "on" : ""}`}
              onClick={() => onClickDateRangeButtonHandler("monthly")}
            >
              Monthly
            </button>
            {/* <button
              type="button"
              className={`${currentButton === 'halfYearly' ? 'on' : ''}`}
              onClick={() => onClickDateRangeButtonHandler('halfYearly')}
            >
              Half Yearly
            </button> */}
            <button
              type="button"
              className={`${currentButton === "yearly" ? "on" : ""}`}
              onClick={() => onClickDateRangeButtonHandler("yearly")}
            >
              Yearly
            </button>
          </div>
          <CalendarContainer className={className}>
            <div>{children}</div>
          </CalendarContainer>
        </div>
      );
    },
    [currentButton]
  );

  return (
    <>
      <button
        type="button"
        className="btn-s line date"
        onClick={() => setCalOpen((prev) => !prev)}
      >
        <span>
          Date{" "}
          {`${startDate ? moment(startDate).format("YYYY.MM.DD") : ""} ${
            startDate ? "-" : ""
          } ${endDate ? moment(endDate).format("YYYY.MM.DD") : ""}`}
        </span>
      </button>
      {calOpen && (
        <div className="datepicker_wrp">
          <ReactDatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={onChangeHandler}
            isClearable={isClearable}
            monthsShown={2}
            // showPreviousMonths // 2달 중 이전달 보여주는 옵션
            calendarContainer={layoutContainer} // 주, 월, 년 버튼 레이아웃 관련
            open={calOpen}
            disabledKeyboardNavigation
            inline
            maxDate={dateUtil.addDate(moment(), -1)}
          />
        </div>
      )}
    </>
  );
};

export default DatePickerRangeButton;
