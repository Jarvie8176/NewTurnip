import React, { Fragment } from "react";
import { AddRecordModalForm } from "./addRecordForm.ui";
import { EditRecordModalForm } from "./editRecordForm.ui";
import { PriceRecordsProps } from "./priceRecords.interface";
import { PriceRecordsHistoryTable } from "./priceRecordsHistoryTable.ui";
import { PriceRecordsTable } from "./priceRecordsTable.ui";
import { PriceRecordsTrends } from "./priceRecordsTrends.ui";

export const PriceRecordsWrapper = (props: PriceRecordsProps) => {
  return (
    <Fragment>
      <PriceRecordsTable />
      <PriceRecordsHistoryTable {...props.historyRecordsTable} />
      <PriceRecordsTrends />
      <AddRecordModalForm {...props.addRecordForm} />
      <EditRecordModalForm {...props.editRecordForm} />
    </Fragment>
  );
};
