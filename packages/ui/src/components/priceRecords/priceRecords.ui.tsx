import React, { Fragment } from "react";
import { AddRecordModalForm } from "./addRecordForm.ui";
import { PriceRecordsProps } from "./priceRecords.interface";
import { PriceRecordsTable } from "./priceRecordsTable.ui";
import { PriceRecordsTrends } from "./priceRecordsTrends.ui";

export const PriceRecordsWrapper = (props: PriceRecordsProps) => {
  return (
    <Fragment>
      <PriceRecordsTable />
      <PriceRecordsTrends />
      <AddRecordModalForm {...props.addRecordForm} />
    </Fragment>
  );
};
