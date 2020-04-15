import { Moment } from "moment-timezone/moment-timezone";
import { ModalFormUIProps } from "../common/modalForm.interface";

export type PriceRecordsGraphs = "latest" | "history" | "lineChart";

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

export interface EditPriceRecordDefaultValues {
  id?: string;
  playerName?: string;
  islandName?: string;
  swCode?: string;
  price?: string;
  reportedAt?: Moment;
}

export interface PriceRecordsProps {
  addRecordForm: ModalFormUIProps;
  editRecordForm: ModalFormUIProps;
  historyRecordsTable: PriceRecordsHistoryTableProps;
}

export interface PriceRecordsHistoryTableProps {
  onEditButtonClick: () => void;
}
