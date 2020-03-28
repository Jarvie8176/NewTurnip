import { Table } from "antd";
import _ from "lodash";
import { observer } from "mobx-react";
import moment, { Moment } from "moment";
import React from "react";
import { useRootStore } from "../../shared/rootStore";
import { PriceRecordsState } from "./priceRecords.interface";

export const PriceRecordsTable = observer((_props: PriceRecordsState) => {
  const { priceRecordsStore } = useRootStore();
  const priceRecords = priceRecordsStore.priceRecords;

  const columns = [
    { title: "菜农", dataIndex: "name" },
    { title: "好友代码", dataIndex: "swCode" },
    { title: "菜价", dataIndex: "price" },
    { title: "记录时间", dataIndex: "reportedAtTimestamp" },
    { title: "有效时间", dataIndex: "remainingValidTime" },
  ];
  const parsedData = _.map(priceRecords, (item) => {
    const reportedAtTimestamp = moment(item.reportedAt, moment.ISO_8601);
    const validUntilTimestamp = getValidUntilTimestamp(reportedAtTimestamp);
    const validUntilNotExpired = validUntilTimestamp && validUntilTimestamp > moment();
    return {
      ...item,
      reportedAtTimestamp: reportedAtTimestamp.format("MM-DD HH:mm"),
      remainingValidTime: validUntilNotExpired ? validUntilTimestamp?.fromNow() : "过期",
    };
  });

  return <Table loading={priceRecordsStore.dataLoading} dataSource={parsedData} columns={columns} rowKey={"id"} />;
});

function getValidUntilTimestamp(input: Moment): Moment | undefined {
  const nextMidDay = moment(input).startOf("day").add(12, "hours");
  const nextMidNight = moment(input).add(1, "day").startOf("day");

  return _.find([nextMidDay, nextMidNight], (i) => i > input);
}
