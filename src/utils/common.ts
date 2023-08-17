import { isBefore, isAfter } from "date-fns";
import moment from "moment";

export const dateUtil = {
  addDate(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },

  // 데이트피커 범위 버튼 문자열 리턴
  getRangeDatePickerCurrentButton(startDate, endDate): string {
    const isEndDateYesterDay =
      moment(endDate).diff(dateUtil.addDate(moment(), -1), "days") == 0;
    if (isEndDateYesterDay) {
      const startDateString = moment(startDate).format("YYYY.MM.DD");
      const aWeekAgoString = moment(dateUtil.addDate(moment(), -7)).format(
        "YYYY.MM.DD"
      );
      const aMonthAgoString = moment(dateUtil.addDate(moment(), -30)).format(
        "YYYY.MM.DD"
      );
      const aYearAgoString = moment(dateUtil.addDate(moment(), -365)).format(
        "YYYY.MM.DD"
      );

      switch (startDateString) {
        case aWeekAgoString:
          return "weekly";
        case aMonthAgoString:
          return "monthly";
        case aYearAgoString:
          return "yearly";
      }
    } else {
      return "";
    }
  },
};

export const chartUtil = {
  /**
   * @description array 차트 데이터 유효성 검사
   * @param arrayValues
   * @returns
   */
  getArrayByValidate: function <T>(arrayValues: T[]): T[] {
    let result = [];
    if (Array.isArray(arrayValues)) {
      if (arrayValues.length > 0) {
        result = arrayValues;
      }
    }

    return result;
  },
};
