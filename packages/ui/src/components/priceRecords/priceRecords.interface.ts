import { ModalFormUIProps } from "../common/modalForm.interface";

export type PriceRecordsGraphs = "table" | "lineChart";

export interface IPriceRecordsState {
  addRecordFormVisible: boolean;
  activeGraph: PriceRecordsGraphs;
}

export type PriceRecordsDataSourceOptions = "all" | "personal";

export interface PriceRecordsControl {
  onAddRecordsButtonClick: () => void;
  onRefreshButtonClick: () => void;
}

export interface PriceRecordsDataSourceControl {
  onAllPriceRecordsButtonClick: () => void;
  onPersonalPriceRecordsButtonClick: () => void;
  onPersonalPriceRecordsTrendsButtonClick: () => void;
}

export interface PriceRecordsProps {
  addRecordForm: ModalFormUIProps;
}
