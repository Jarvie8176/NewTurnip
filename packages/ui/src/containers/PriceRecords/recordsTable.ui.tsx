import { Table } from "antd";
import _ from "lodash";
import moment, { Moment } from "moment";
import React from "react";
import { PriceRecordTableDto } from "./priceRecordTable.dto";

interface IProps {
  priceRecords: PriceRecordTableDto["priceRecords"];
}

export const PriceRecordsTable = (props: IProps) => {
  const { priceRecords } = props;
  const columns = [
    { title: "岛主", dataIndex: "name" },
    { title: "好友代码", dataIndex: "swCode" },
    { title: "萝卜报价", dataIndex: "price" },
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

  return <Table dataSource={parsedData} columns={columns} rowKey={"id"} />;
};

function getValidUntilTimestamp(input: Moment): Moment | undefined {
  const nextMidDay = moment(input).startOf("day").add(12, "hours");
  const nextMidNight = moment(input).add(1, "day").startOf("day");

  return _.find([nextMidDay, nextMidNight], (i) => i > input);
}
