import { useEffect, useState } from "react";
import DatePickerRangeButton from "@components/layout/datepicker/rangeButton";
import { dateUtil } from "@utils/common";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "@reducers/index";
import LineChartAtom from "@components/highchart/highchart.line";
import { CreateMainPageOptions } from "@classes/highchart/mainPageCharts";
import { mainThunks } from "@reducers/slices/index";

const UserDAUBOX = () => {
  const dispatch = useAppDispatch();
  const { userDau } = useAppSelector(({ MAIN }) => MAIN);

  // datePicker
  const [startDate, setStartDate] = useState(dateUtil.addDate(moment(), -7));
  const [endDate, setEndDate] = useState(dateUtil.addDate(moment(), -1));

  useEffect(() => {
    //@ts-ignore
    dispatch(mainThunks.postDAUThunk({ startDate, endDate }));
  }, [endDate]);

  return (
    <div className="score-box flex-column">
      <h2 className="score-tit">
        User DAU
        <div className="calendar-button-right">
          <div className="period_select_bx">
            <div className="period_select_in">
              <DatePickerRangeButton
                layoutStartDate={startDate}
                setLayoutStartDate={setStartDate}
                layoutEndDate={endDate}
                setLayoutEndDate={setEndDate}
                isClearable={false}
              />
            </div>
          </div>
        </div>
      </h2>
      {/* 스택컬럼차트 */}
    </div>
  );
};

export default UserDAUBOX;
