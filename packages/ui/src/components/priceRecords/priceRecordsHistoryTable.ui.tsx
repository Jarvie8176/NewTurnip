import { EditOutlined } from "@ant-design/icons/lib";
import { Table } from "antd";
import _ from "lodash";
import { observer } from "mobx-react";
import moment from "moment-timezone";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useRootStore } from "../../shared/rootStore";
import { nextValidTime } from "../../shared/timeOffset.util";
import { ButtonUI } from "../common/ButtonUI.ui";
import { EditPriceRecordDefaultValues, PriceRecordsHistoryTableProps } from "./priceRecords.interface";

const EditButtonContainer = styled.div``;

export const PriceRecordsHistoryTable = observer((props: PriceRecordsHistoryTableProps) => {
  const { priceRecordsStore, priceRecordsState, profileStore } = useRootStore();
  const { t } = useTranslation();

  const visible = priceRecordsState.activeGraph === "history";
  if (!visible) return <Fragment />;

  const priceRecords = priceRecordsStore.priceRecords;

  const localTimeOffsetMinutes =
    Number(profileStore.profileData?.profile.settings.localTimeOffsetMinutes) || moment().utcOffset();

  const playerName = profileStore.profileData?.profile.settings.playerName;
  const islandName = profileStore.profileData?.profile.settings.islandName;
  const swCode = profileStore.profileData?.profile.settings.swCode;

  const columns = [
    { title: t("priceRecordsTable.columns.price"), dataIndex: "price" },
    { title: t("priceRecordsTable.columns.localTimeWhenRecorded"), dataIndex: "reportedAtTimestamp" },
    { title: t("priceRecordsTable.columns.validUntil"), dataIndex: "remainingValidTime" },
    { title: t("priceRecordsTable.columns.edit"), dataIndex: "editButton" },
  ];
  const parsedData = _.map(priceRecords, (item) => {
    const reportedAtTimestamp = moment(item.reportedAt, moment.ISO_8601);
    const reportedAtLocalTimestamp = reportedAtTimestamp.clone().add(localTimeOffsetMinutes, "minutes");
    const validUntilTimestamp = nextValidTime(reportedAtTimestamp, localTimeOffsetMinutes);
    const validUntilNotExpired = validUntilTimestamp && validUntilTimestamp > moment();

    const price = item.price;

    const onEditDefaultValues: EditPriceRecordDefaultValues = {
      id: item.id,
      playerName: playerName || undefined,
      islandName: islandName || undefined,
      swCode: swCode || undefined,
      price: price || undefined,
      reportedAt: reportedAtTimestamp,
    };
    // todo
    const editButton = (
      <EditButtonContainer>
        <ButtonUI
          icon={<EditOutlined />}
          onClick={() => {
            priceRecordsStore.updateEditFormDefaultValues(onEditDefaultValues);
            props.onEditButtonClick();
          }}
        />
      </EditButtonContainer>
    );
    return {
      ...item,
      reportedAtTimestamp: reportedAtTimestamp.format("MM-DD HH:mm"),
      reportedAtLocalTimestamp,
      remainingValidTime: validUntilNotExpired ? validUntilTimestamp?.fromNow() : t("priceRecordsTable.expired"),
      editButton,
    };
  });

  return <Table loading={priceRecordsStore.dataLoading} dataSource={parsedData} columns={columns} rowKey={"id"} />;
});
