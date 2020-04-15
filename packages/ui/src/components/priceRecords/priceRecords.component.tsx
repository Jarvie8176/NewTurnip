import { decodeDto } from "@ansik/sdk/lib/utils";
import { AddPriceRecords, UpdatePriceRecords } from "@turnip-market/dtos";
import { string } from "io-ts";
import _ from "lodash";
import { observer } from "mobx-react";
import React, { PureComponent } from "react";
import { rootStoreContext } from "../../shared/rootStore";
import { ModalFormUIProps, TOnFormCreate } from "../common/modalForm.interface";
import NotificationManager from "../notification/notificationManager";
import { IPriceRecordsState, PriceRecordsHistoryTableProps } from "./priceRecords.interface";
import { PriceRecordsWrapper } from "./priceRecords.ui";
import { CreatePriceRecordDto, EditPriceRecordDto } from "./priceRecordsTable.dto";

@observer
export default class PriceRecordsComponent extends PureComponent<{}, IPriceRecordsState> {
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>;

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

  updateRecord = async (priceRecordsId: string, input: EditPriceRecordDto): Promise<void> => {
    const { priceRecordsStore } = this.context;
    console.log("update price record");
    await priceRecordsStore.updateRecord(priceRecordsId, input);
    NotificationManager.ShowInfo("price record updated");
    this.toggleAddRecordForm(false);
    await this.loadData();
  };

  // ==================== UI interaction

  toggleAddRecordForm = (visible: boolean): void => {
    this.context.priceRecordsState.setAddRecordFormVisible(visible);
  };

  onAddRecordFormCreate: TOnFormCreate = async (input, confirm) => {
    const payload: AddPriceRecords.Request.Type = {
      price: _.get(input, "price") && String(_.get(input, "price")),
      reportedAt: _.get(input, "reportedAt")?.toISOString(),
    };
    const record = decodeDto(AddPriceRecords.Request.dto, payload);
    try {
      await this.createRecord(record);
      this.toggleAddRecordForm(false);
      confirm();
    } catch (err) {
      NotificationManager.ShowError(err);
    }
  };

  onAddRecordFormCancel = (): void => {
    this.toggleAddRecordForm(false);
  };

  toggleEditRecordForm = (visible: boolean): void => {
    this.context.priceRecordsState.setEditRecordFormVisible(visible);
  };

  onEditRecordFormCreate: TOnFormCreate = async (input, confirm) => {
    const priceRecordId = decodeDto(string, _.get(input, "id"));

    const payload: UpdatePriceRecords.Request.Type = {
      price: _.get(input, "price") && String(_.get(input, "price")),
      reportedAt: _.get(input, "reportedAt")?.toISOString(),
    };
    const record = decodeDto(UpdatePriceRecords.Request.dto, payload);
    try {
      await this.updateRecord(priceRecordId, record);
      this.toggleEditRecordForm(false);
      confirm();
    } catch (err) {
      NotificationManager.ShowError(err);
    }
  };

  onEditRecordFormCancel = (): void => {
    this.toggleEditRecordForm(false);
  };

  onEditButtonClick = (): void => {
    this.toggleEditRecordForm(true);
  };

  componentDidMount = (): void => {
    this.loadData().catch(NotificationManager.ShowError);
  };

  render() {
    const addRecordFormProps: ModalFormUIProps = {
      onCreate: this.onAddRecordFormCreate,
      onCancel: this.onAddRecordFormCancel,
    };
    const editRecordFormProps: ModalFormUIProps = {
      onCreate: this.onEditRecordFormCreate,
      onCancel: this.onEditRecordFormCancel,
    };
    const historyRecordsTableProps: PriceRecordsHistoryTableProps = {
      onEditButtonClick: this.onEditButtonClick,
    }; // todo

    return (
      <PriceRecordsWrapper
        addRecordForm={addRecordFormProps}
        editRecordForm={editRecordFormProps}
        historyRecordsTable={historyRecordsTableProps}
      />
    );
  }
}
