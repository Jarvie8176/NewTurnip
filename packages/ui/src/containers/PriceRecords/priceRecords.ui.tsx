import React, { Fragment } from "react";
import styled from "styled-components";
import { AddRecordForm } from "./addRecordForm.ui";
import { AddRecordsButton } from "./addRecordsButton.ui";
import { PriceRecordsState, PriceRecordsStateControl } from "./priceRecords.interface";
import { PriceRecordsTable } from "./recordsTable.ui";

interface IProp extends PriceRecordsState, PriceRecordsStateControl {}

const Control = styled.div`
  padding: 1em;
`;

export const PriceRecordsWrapper = (props: IProp) => {
  return (
    <Fragment>
      <Control>
        <AddRecordsButton onClick={props.onAddRecordsButtonClick} />
      </Control>
      <PriceRecordsTable priceRecords={props.priceRecords} />
      <AddRecordForm
        visible={props.addRecordFormVisible}
        confirmLoading={props.addRecordFormConfirmLoading}
        onCancel={props.onAddRecordFormCancel}
        onCreate={props.onAddRecordFormCreate}
      />
    </Fragment>
  );
};
