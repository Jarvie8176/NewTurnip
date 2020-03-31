import { decodeDto } from "@ansik/sdk/lib/utils";
import { AddPriceRecords } from "@turnip-market/dtos";
import _ from "lodash";
import { observer } from "mobx-react";
import React, { PureComponent } from "react";
import { rootStoreContext } from "../../shared/rootStore";
import { ModalFormInnerProps, TOnFormCreate } from "../common/modalForm.interface";
import NotificationManager from "../notification/notificationManager";
import { PriceRecordsComponentState } from "./priceRecords.interface";
import { PriceRecordsWrapper } from "./priceRecords.ui";
import { CreatePriceRecordDto } from "./priceRecordsTable.dto";

@observer
export default class PriceRecordsComponent extends PureComponent<{}, PriceRecordsComponentState> {
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>;

  state = {
    addRecordFormVisible: false,
  };

  // ==================== data interaction
  loadData = async (): Promise<void> => {
    const { priceRecordsStore } = this.context;
    console.log("loading data");
    await priceRecordsStore.fetchAll();
  };

  createRecord = async (input: CreatePriceRecordDto): Promise<void> => {
    const { priceRecordsStore } = this.context;
    console.log("create price record");
    await priceRecordsStore.addRecord(input);
    NotificationManager.ShowInfo("price record created");
    this.toggleAddRecordForm(false);
    await this.loadData();
  };

  // ==================== UI interaction

  toggleAddRecordForm = (visible: boolean): void => {
    this.setState({
      addRecordFormVisible: visible,
    });
  };

  onAddRecordFormCreate: TOnFormCreate = async (input, confirm) => {
    console.log(input);
    const payload: AddPriceRecords.Request.Type = {
      playerName: _.get(input, "playerName"),
      islandName: _.get(input, "islandName"),
      price: _.get(input, "price") && String(_.get(input, "price")),
      swCode: _.get(input, "swCode") || null,
      reportedAt: _.get(input, "reportedAt")?.toISOString(),
    };
    const record = decodeDto(AddPriceRecords.Request.dto, payload);
    await this.createRecord(record);
    confirm();
  };

  onAddRecordFormCancel = (): void => {
    this.toggleAddRecordForm(false);
  };

  componentDidMount = (): void => {
    this.loadData().catch(NotificationManager.ShowError);
  };

  render() {
    const addRecordFormProps: ModalFormInnerProps = {
      visible: this.state.addRecordFormVisible,
      onCreate: this.onAddRecordFormCreate,
      onCancel: this.onAddRecordFormCancel,
    };

    return (
      <PriceRecordsWrapper
        onAddRecordsButtonClick={(): void => this.toggleAddRecordForm(true)}
        onRefreshButtonClick={this.loadData}
        addRecordForm={addRecordFormProps}
      />
    );
  }
}
