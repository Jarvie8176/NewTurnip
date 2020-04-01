import { Table } from "antd";
import _ from "lodash";
import { observer } from "mobx-react";
import moment from "moment-timezone";
import React from "react";
import { useRootStore } from "../../shared/rootStore";
import { nextValidTime } from "../../shared/timeOffset.util";
import { PriceRecordsState } from "./priceRecords.interface";

export const PriceRecordsTable = observer((_props: PriceRecordsState) => {
  const { priceRecordsStore, profileStore } = useRootStore();
  const priceRecords = priceRecordsStore.priceRecords;
  const localTimeOffsetMinutes =
    Number(profileStore.profileData?.profile.settings.localTimeOffsetMinutes) || moment().utcOffset();

  const columns = [
    { title: "岛主", dataIndex: "playerName" },
    { title: "岛名", dataIndex: "islandName" },
    { title: "联系方式", dataIndex: "swCode" },
    { title: "报价", dataIndex: "price" },
    { title: "记录时间(当地)", dataIndex: "reportedAtTimestamp" },
    { title: "有效时间", dataIndex: "remainingValidTime" },
  ];
  const parsedData = _.map(priceRecords, (item) => {
    const reportedAtTimestamp = moment(item.reportedAt, moment.ISO_8601);
    const reportedAtLocalTimestamp = reportedAtTimestamp.clone().add(localTimeOffsetMinutes, "minutes");
    const validUntilTimestamp = nextValidTime(reportedAtTimestamp, localTimeOffsetMinutes);
    const validUntilNotExpired = validUntilTimestamp && validUntilTimestamp > moment();
    return {
      ...item,
      reportedAtTimestamp: reportedAtTimestamp.format("MM-DD HH:mm"),
      reportedAtLocalTimestamp,
      remainingValidTime: validUntilNotExpired ? validUntilTimestamp?.fromNow() : "过期",
    };
  });

  return <Table loading={priceRecordsStore.dataLoading} dataSource={parsedData} columns={columns} rowKey={"id"} />;
});
