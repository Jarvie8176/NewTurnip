import { inject } from "mobx-react";
import React, { Fragment } from "react";
import styled from "styled-components";
import { AddRecordForm } from "./addRecordForm.ui";
import { AddPriceRecordButton } from "./addRecordsButton.ui";
import { PriceRecordsProps } from "./priceRecords.interface";
import { PriceRecordsTable } from "./priceRecordsTable.ui";

const Buttons = styled.div`
  display: flex;
  padding: 1em;

  > button + button {
    margin-left: 1em;
  }
`;

export const PriceRecordsWrapper = inject("priceRecordsStore")((props: PriceRecordsProps) => {
  return (
    <Fragment>
      <Buttons>
        <AddPriceRecordButton type={"primary"} text={"炒!"} onClick={props.onAddRecordsButtonClick} />
        <AddPriceRecordButton text={"刷新"} onClick={props.onRefreshButtonClick} />
      </Buttons>
      <PriceRecordsTable />
      <AddRecordForm {...props.addRecordForm} />
    </Fragment>
  );
});
