import { action, observable } from "mobx";
import { IPriceRecordsState } from "./priceRecords.interface";

export class PriceRecordsState implements IPriceRecordsState {
  @observable addRecordFormVisible: boolean = false;

  @action setAddRecordFormVisible(visible: boolean) {
    this.addRecordFormVisible = visible;
  }
}
