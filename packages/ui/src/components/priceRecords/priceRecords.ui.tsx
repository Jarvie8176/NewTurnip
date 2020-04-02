import React, { Fragment } from "react";
import { AddRecordModalForm } from "./addRecordForm.ui";
import { PriceRecordsProps } from "./priceRecords.interface";
import { PriceRecordsTable } from "./priceRecordsTable.ui";

export const PriceRecordsWrapper = (props: PriceRecordsProps) => {
  return (
    <Fragment>
      <PriceRecordsTable />
      <AddRecordModalForm {...props.addRecordForm} />
    </Fragment>
  );
};
