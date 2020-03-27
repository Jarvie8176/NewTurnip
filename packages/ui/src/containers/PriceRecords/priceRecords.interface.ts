import { PriceRecordTableDto } from "./priceRecordTable.dto";

export interface PriceRecordsState {
  priceRecords: PriceRecordTableDto["priceRecords"];
  addRecordFormConfirmLoading: boolean;
  addRecordFormVisible: boolean;
}

export interface PriceRecordsStateControl {
  onAddRecordsButtonClick: () => void;
  onAddRecordFormCancel: () => void;
  onAddRecordFormCreate: (input: {}, confirm: () => void) => Promise<unknown>;
}
