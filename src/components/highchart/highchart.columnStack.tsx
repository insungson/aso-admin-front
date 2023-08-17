import React, { useState, useEffect } from "react";
import { IHighchart } from "@models/chart";
import { BaseChart } from "@classes/highchart/baseChart";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { FadeLoader } from "react-spinners";
import CustomEvents from "highcharts-custom-events";

if (typeof Highcharts === "object") {
  CustomEvents(Highcharts);
}

const ColumnStackClickChartAtom: React.FC<{
  chartData: IHighchart.IColumnChartDataModel;
  height: string;
}> = ({ chartData, height }) => {
  const [chartOption, setChartOption] =
    useState<IHighchart.IHighChartModel>(null);

  useEffect(() => {
    if (chartData) {
      const { series, xAxis, legend, tooltip } = chartData;
      setChartOption(createOptions(series, xAxis, legend, tooltip));
    }
  }, [chartData]);

  const createOptions = (
    series,
    xAxis,
    legend,
    tooltip
  ): IHighchart.IHighChartModel => {
    return {
      ...new BaseChart().setBasicHighChartOption(),
      chart: {
        type: "column",
      },
      xAxis,
      series: series,
      // yAxis: yAxis,
      legend,
      plotOptions: {
        column: {
          stacking: "normal",
        },
      },
      tooltip,
    };
  };

  return (
    <>
      {chartOption ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOption}
          containerProps={height && { style: { height: height } }}
          updateArgs={[true, true, true]}
        />
      ) : (
        <FadeLoader />
      )}
    </>
  );
};

export default ColumnStackClickChartAtom;
