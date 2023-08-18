import { IHighchart } from "@models/chart";
import { chartUtil } from "@utils/common";
import { BaseChart } from "@classes/highchart/baseChart";
import { IDAU, IUserDAU } from "@models/main";

/**
 * main 페이지 highchart 옵션
 */
export class CreateMainPageOptions {
  getDAU(data: IDAU[]): IHighchart.LineChartDataModel {
    const _data = chartUtil.getArrayByValidate(data);
    let series = [];
    let categories = [];

    if (_data.length > 0) {
      categories = _data.map((item) => item.date);
      const indicators = [
        { seriesName: "TOTAL", propertyName: "Total" },
        { seriesName: "EXPERIENCED", propertyName: "experienced" },
        { seriesName: "PAID", propertyName: "paid" },
        { seriesName: "FREE", propertyName: "free" },
      ];
      series = indicators.map((indicator) => {
        const data = _data.map((item) => item[indicator.propertyName]);
        return { name: indicator.seriesName, data };
      });
    }

    return {
      series: series,
      xAxis: { categories },
      yAxis: { ...new BaseChart().setBasicHighChartOption().yAxis },
    };
  }

  getUserDAU(data: IUserDAU[]): IHighchart.IColumnChartDataModel {
    const _data = chartUtil.getArrayByValidate(data);
    let series = [];
    let categories = [];

    if (_data.length > 0) {
      categories = _data.map((item) => item.date);
      const indicators = [
        { seriesName: "EXPERIENCED", propertyName: "experienced" },
        { seriesName: "PAID", propertyName: "paid" },
        { seriesName: "FREE", propertyName: "free" },
      ];
      series = indicators.map((indicator) => {
        return {
          name: indicator.seriesName,
          data: _data.map((item) => item[indicator.propertyName]),
        };
      });
    }

    return {
      series,
      xAxis: {
        categories,
      },
    };
  }
}
