import moment from "moment";

export class BaseChart {
  setBasicHighChartOption() {
    return {
      title: {
        text: "",
      },
      exporting: {
        enabled: false,
      },
      series: [],
      xAxis: {
        type: "category",
        tickmarkPlacement: "on",
        title: { text: "" },
        labels: {
          overflow: "justify",
          style: {
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "11px",
          },
          formatter: function () {
            if (moment(this.value, "YYYY-MM-DD", true).isValid()) {
              return moment(this.value, "YYYY-MM-DD").format("MM/DD");
            } else {
              return this.value;
            }
          },
        },
      },
      yAxis: {
        title: { text: "" },
        labels: {
          overflow: "justify",
          style: {
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "11px",
          },
          formatter() {
            return this.value;
          },
        },
      },
      plotOptions: {
        series: {
          cursor: "pointer",
          dataLabels: {
            style: { lineHeight: "10px", fontSize: "8px", textShadow: "none" },
          },
        },
        dataLabels: {
          style: { fontSize: "8px" },
        },
      },
      legend: {
        itemStyle: {
          fontWeight: "bold",
          fontSize: "12px",
        },
      },
      credits: { enabled: false },
    };
  }
}
