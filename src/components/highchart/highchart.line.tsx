import React, { useState, useEffect } from "react";
import { IHighchart } from "@models/chart";
import { BaseChart } from "@classes/highchart/baseChart";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { FadeLoader } from "react-spinners";
import DataTable from "react-data-table-component";

const LineChartAtom: React.FC<{
  chartData: IHighchart.LineChartDataModel | null;
  height: string;
  isLoading: boolean;
}> = ({ chartData, height, isLoading }) => {
  const createOptions = ({
    series,
    xAxis,
    yAxis,
  }): IHighchart.IHighChartModel => {
    return {
      ...new BaseChart().setBasicHighChartOption(),
      chart: {
        type: "line",
      },
      xAxis,
      series,
      yAxis,
    };
  };

  return (
    <>
      {isLoading ? (
        <FadeLoader />
      ) : chartData && chartData.series.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={createOptions(chartData)}
          containerProps={height && { style: { height: height } }}
          updateArgs={[true, true, true]}
        />
      ) : (
        <DataTable data={[]} columns={[]} />
      )}
    </>
  );
};

export default LineChartAtom;
