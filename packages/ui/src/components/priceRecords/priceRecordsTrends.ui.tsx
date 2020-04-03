import { Spin } from "antd";
import HighchartsReact from "highcharts-react-official";
import HighChart from "highcharts/highstock";
import HighCharts from "highcharts/highstock";
import _ from "lodash";
import { observer } from "mobx-react";
import moment, { ISO_8601 } from "moment-timezone";

import React, { Fragment } from "react";
import { useRootStore } from "../../shared/rootStore";

export const PriceRecordsTrends = observer(() => {
  const { priceRecordsStore, priceRecordsState, profileStore } = useRootStore();

  const currentUserTimeOffsetMinutes = profileStore.profileData?.profile.settings.localTimeOffsetMinutes;

  const visible = priceRecordsState.activeGraph === "lineChart";
  if (!visible) return <Fragment />;

  const priceRecords = priceRecordsStore.priceRecords;
  const loading = priceRecordsStore.dataLoading;

  const dataList = _.map(priceRecords, ({ price, reportedAt, timeOffsetInMinutes }) => {
    const timestamp = moment(reportedAt, ISO_8601);
    if (timeOffsetInMinutes) timestamp.add(Number(timeOffsetInMinutes), "minutes");

    return { price, timestamp };
  });

  console.log(dataList);

  const ohlcData = (() => {
    const dataByDay = _.values(_.groupBy(dataList, (i) => i.timestamp.format("YYYYMMDD")));
    const allData = _.map(dataByDay, (dataListEachDay) => {
      dataListEachDay = _.sortBy(dataListEachDay, (i) => i.timestamp);
      const date = _.first(dataListEachDay)?.timestamp.startOf("day").toDate().getTime();
      const high = _.maxBy(dataListEachDay, (i) => Number(i.price))?.price;
      const low = _.minBy(dataListEachDay, (i) => Number(i.price))?.price;
      const open = _.first(dataListEachDay)?.price;
      const close = _.last(dataListEachDay)?.price;
      if (!date) return undefined;
      return [
        date + Number(currentUserTimeOffsetMinutes) * 60 * 1000 || 0,
        Number(open),
        Number(high),
        Number(low),
        Number(close),
      ];
    });
    return _.compact(allData);
  })();

  const options: HighCharts.Options = {
    title: {
      text: "",
    },
    navigator: {
      enabled: true,
    },
    rangeSelector: {
      enabled: true,
      inputEnabled: true,
      x: 0,
      verticalAlign: "top",
      buttonPosition: {
        align: "left",
      },
      allButtonsEnabled: true,
      buttons: [
        {
          type: "month",
          count: 1,
          text: "Day",
          dataGrouping: {
            forced: true,
            units: [["day", [1]]],
          },
        },
        {
          type: "year",
          count: 1,
          text: "Week",
          dataGrouping: {
            forced: true,
            units: [["week", [1]]],
          },
        },
        {
          type: "all",
          text: "Month",
          dataGrouping: {
            forced: true,
            units: [["month", [1]]],
          },
        },
      ],
      buttonTheme: {
        width: 60,
      },
      selected: 0,
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "价格",
      },
    },
    legend: {
      enabled: true,
    },
    series: [
      {
        type: "candlestick",
        name: "我的价格",
        data: ohlcData,
        dataGrouping: {
          units: [
            [
              "week", // unit name
              [1], // allowed multiples
            ],
            ["month", [1, 2, 3, 4, 6]],
          ],
        },
      },
    ],
  };

  const LoadingSpin = loading ? Spin : Fragment;

  return (
    <LoadingSpin>
      <HighchartsReact
        containerProps={{
          rangeSelector: {
            selected: 2,
          },
        }}
        highcharts={HighChart}
        options={options}
      />
      ;
    </LoadingSpin>
  );
});
