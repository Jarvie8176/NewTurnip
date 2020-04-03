import { action, observable } from "mobx";
import { IPriceRecordsState, PriceRecordsGraphs } from "./priceRecords.interface";

export class PriceRecordsState implements IPriceRecordsState {
  @observable addRecordFormVisible: boolean = false;
  @observable activeGraph: PriceRecordsGraphs = "table";

  @action setAddRecordFormVisible(visible: boolean) {
    this.addRecordFormVisible = visible;
  }

  @action setActiveGraph(graph: PriceRecordsGraphs) {
    this.activeGraph = graph;
  }
}
