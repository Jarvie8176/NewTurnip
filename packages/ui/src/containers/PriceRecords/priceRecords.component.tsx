import { decodeDto } from "@ansik/sdk/lib/utils";
import { AddPriceRecord } from "@turnip-market/dtos";
import _ from "lodash";
import React, { PureComponent } from "react";
import NotificationManager from "../Notification/notificationManager";
import { PriceRecordsState } from "./priceRecords.interface";
import { PriceRecordsRepository } from "./priceRecords.repository";
import { PriceRecordsWrapper } from "./priceRecords.ui";
import { CreatePriceRecordDto } from "./priceRecordTable.dto";

export default class PriceRecordsComponent extends PureComponent<{}, PriceRecordsState> {
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
      const record = decodeDto(AddPriceRecord.Request.dto, payload);
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
    return (
      <PriceRecordsWrapper
        {...this.state}
        onAddRecordsButtonClick={this.toggleAddRecordForm}
        onAddRecordFormCancel={this.onAddRecordFormCancel}
        onAddRecordFormCreate={this.onAddRecordFormCreate}
      />
    );
  }
}
