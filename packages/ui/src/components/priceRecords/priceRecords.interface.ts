import { ModalFormUIProps } from "../common/modalForm.interface";

export interface IPriceRecordsState {
  addRecordFormVisible: boolean;
}

export interface PriceRecordsState {}

export interface PriceRecordsControl {
  onAddRecordsButtonClick: () => void;
  onRefreshButtonClick: () => void;
}

export interface PriceRecordsProps extends PriceRecordsState {
  addRecordForm: ModalFormUIProps;
}
