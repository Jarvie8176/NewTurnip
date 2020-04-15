import { Table } from "antd";
import _ from "lodash";
import { observer } from "mobx-react";
import moment from "moment-timezone";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useRootStore } from "../../shared/rootStore";
import { nextValidTime } from "../../shared/timeOffset.util";

export const PriceRecordsTable = observer(() => {
  const { priceRecordsStore, priceRecordsState, profileStore } = useRootStore();
  const { t } = useTranslation();

  const visible = priceRecordsState.activeGraph === "table";
  if (!visible) return <Fragment />;

  const priceRecords = priceRecordsStore.priceRecords;
  const localTimeOffsetMinutes =
    Number(profileStore.profileData?.profile.settings.localTimeOffsetMinutes) || moment().utcOffset();

  const columns = [
    { title: t("priceRecordsTable.columns.playerName"), dataIndex: "playerName" },
    { title: t("priceRecordsTable.columns.islandName"), dataIndex: "islandName" },
    { title: t("priceRecordsTable.columns.contactInfo"), dataIndex: "swCode" },
    { title: t("priceRecordsTable.columns.price"), dataIndex: "price" },
    { title: t("priceRecordsTable.columns.localTimeWhenRecorded"), dataIndex: "reportedAtTimestamp" },
    { title: t("priceRecordsTable.columns.validUntil"), dataIndex: "remainingValidTime" },
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
      remainingValidTime: validUntilNotExpired ? validUntilTimestamp?.fromNow() : t("priceRecordsTable.expired"),
    };
  });

  return <Table loading={priceRecordsStore.dataLoading} dataSource={parsedData} columns={columns} rowKey={"id"} />;
});
