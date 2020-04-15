import { action, observable } from "mobx";
import { IPriceRecordsState, PriceRecordsGraphs } from "./priceRecords.interface";

export class PriceRecordsState implements IPriceRecordsState {
  @observable addRecordFormVisible: boolean = false;
  @observable editRecordFormVisible: boolean = false;
  @observable activeGraph: PriceRecordsGraphs = "latest";

  @action setAddRecordFormVisible(visible: boolean) {
    this.addRecordFormVisible = visible;
  }

  @action setEditRecordFormVisible(visible: boolean) {
    this.editRecordFormVisible = visible;
  }

  @action setActiveGraph(graph: PriceRecordsGraphs) {
    this.activeGraph = graph;
  }
}
