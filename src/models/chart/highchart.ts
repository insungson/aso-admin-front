export interface IHighChartModel {
  chart: {
    type:
      | "line"
      | "pie"
      | "column"
      | "wordcloud"
      | "gauge"
      | "solidgauge"
      | "bubble";
    marginLeft?: number;
  };
  title: any;
  legend?: any;
  xAxis?: any;
  yAxis?: any;
  series: any;
  plotOptions?: any;
  tooltip?: any;
  credits: any;
  exporting?: any;
  pane?: any;
}

export interface IColumnChartDataModel {
  series: IColumnChartSeriesModel[];
  xAxis: any;
  legend?: object;
  tooltip?: object;
  summaries?: { seq: number; count: number }[];
}

export interface IColumnChartSeriesModel {
  name: string;
  data: number[];
  color?: string;
  point?: object;
}

export interface LineChartDataModel {
  series: ILineChartSeriesModel[];
  xAxis: any;
  yAxis: any;
}

export interface ILineChartSeriesModel {
  name: string;
  data: number[];
  yAxis?: number;
}
