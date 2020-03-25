import { decodeDto } from "@ansik/sdk/lib/utils";
import { AddPriceRecord, PriceRecord } from "@turnip-market/dtos";
import { Button } from "antd";
import _ from "lodash";
import React, { PureComponent } from "react";
import styled from "styled-components";
import NotificationManager from "../Notification/notificationManager";
import { AddRecordForm } from "./addRecordForm.ui";
import { PriceRecordsRepository } from "./priceRecords.repository";
import { CreatePriceRecordDto } from "./priceRecordTable.dto";
import { PriceRecordsTable } from "./recordsTable.ui";

interface IState {
  priceRecords: PriceRecord.Type[];
  addRecordFormConfirmLoading: boolean;
  addRecordFormVisible: boolean;
}

const PriceRecordsContainer = styled.div``;

const Control = styled.div`
  padding: 20px;
`;

export default class PriceRecords extends PureComponent<{}, IState> {
  priceRecordsRepository = PriceRecordsRepository;

  state = {
    priceRecords: [],
    addRecordFormConfirmLoading: false,
    addRecordFormVisible: false,
  };

  // ==================== data interaction
  loadData = async (): Promise<void> => {
    console.log("loading data");
    const { priceRecordsRepository } = this;
    const { priceRecords } = await priceRecordsRepository.fetchAll();
    this.setState({ priceRecords });
  };

  createRecord = async (input: CreatePriceRecordDto): Promise<void> => {
    console.log("create price record");
    const { priceRecordsRepository } = this;
    await priceRecordsRepository.addRecord(input);
    this.toggleAddRecordForm();
    NotificationManager.ShowInfo("price record created");
    this.loadData();
  };

  // ==================== UI interaction

  toggleAddRecordForm = (): void => {
    this.setState({
      addRecordFormVisible: !this.state.addRecordFormVisible,
    });
  };

  toggleAddRecordConfirmLoading = (): void => {
    this.setState({
      addRecordFormConfirmLoading: !this.state.addRecordFormConfirmLoading,
    });
  };

  onAddRecordFormCreate = async (input: {}, confirm: () => void): Promise<void> => {
    try {
      this.toggleAddRecordConfirmLoading();
      const payload = {
        name: _.get(input, "name"),
        swCode: _.get(input, "swCode") || null,
        price: _.get(input, "price"),
        reportedAt: _.get(input, "reportedAt")?.toISOString(),
      };
      console.log(payload);
      const record = decodeDto(AddPriceRecord.dto, payload);
      await this.createRecord(record);
      confirm();
    } finally {
      this.toggleAddRecordConfirmLoading();
    }
  };

  onAddRecordFormCancel = (): void => {
    this.toggleAddRecordForm();
  };

  componentDidMount = (): void => {
    this.loadData().catch(NotificationManager.ShowError);
  };

  render() {
    const { priceRecords, addRecordFormConfirmLoading, addRecordFormVisible } = this.state;

    return (
      <PriceRecordsContainer>
        <Control>
          <Button type={"primary"} size={"large"} shape={"round"} onClick={this.toggleAddRecordForm}>
            炒!
          </Button>
        </Control>
        <PriceRecordsTable priceRecords={priceRecords} />
        <AddRecordForm
          visible={addRecordFormVisible}
          confirmLoading={addRecordFormConfirmLoading}
          onCancel={this.onAddRecordFormCancel}
          onCreate={this.onAddRecordFormCreate}
        />
      </PriceRecordsContainer>
    );
  }
}
