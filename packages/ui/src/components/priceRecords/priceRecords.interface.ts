import { ModalFormUIProps } from "../common/modalForm.interface";

export interface IPriceRecordsState {
  addRecordFormVisible: boolean;
}

export type PriceRecordsDataSourceOptions = "all" | "personal";

export interface PriceRecordsState {}

export interface PriceRecordsControl {
  onAddRecordsButtonClick: () => void;
  onRefreshButtonClick: () => void;
}

export interface PriceRecordsDataSourceControl {
  onAllPriceRecordsButtonClick: () => void;
  onPersonalPriceRecordsButtonClick: () => void;
}

export interface PriceRecordsProps extends PriceRecordsState {
  addRecordForm: ModalFormUIProps;
}
