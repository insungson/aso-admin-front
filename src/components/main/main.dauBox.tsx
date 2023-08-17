import { useEffect, useState } from "react";
import DatePickerRangeButton from "@components/layout/datepicker/rangeButton";
import { dateUtil } from "@utils/common";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "@reducers/index";
import LineChartAtom from "@components/highchart/highchart.line";
import { CreateMainPageOptions } from "@classes/highchart/mainPageCharts";
import { mainThunks } from "@reducers/slices/index";

const DAUBox = () => {
  const dispatch = useAppDispatch();
  const { dau } = useAppSelector(({ MAIN }) => MAIN);

  // datePicker
  const [startDate, setStartDate] = useState(dateUtil.addDate(moment(), -7));
  const [endDate, setEndDate] = useState(dateUtil.addDate(moment(), -1));

  useEffect(() => {
    //@ts-ignore
    dispatch(mainThunks.postDAUThunk({ startDate, endDate }));
  }, [endDate]);

  // 추후 시간되면 react-query 로 변경하기

  return (
    <div className="score-box">
      <h2 className="score-tit">
        DAU
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
      {/* 라인차트 */}
      <div className="chart-api">
        <LineChartAtom
          chartData={new CreateMainPageOptions().getDAU(dau)}
          height={"261px"}
          isLoading={false}
        />
      </div>
    </div>
  );
};

export default DAUBox;
