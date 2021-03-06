import { decodeDto } from "@ansik/sdk/lib/utils";
import { GetPriceRecords } from "@turnip-market/dtos";
import { action, computed, observable, runInAction } from "mobx";
import { DataProvider } from "../../shared/dataProvider";
import NotificationManager from "../notification/notificationManager";
import { EditPriceRecordDefaultValues, PriceRecordsDataSourceOptions } from "./priceRecords.interface";
import { CreatePriceRecordDto, EditPriceRecordDto, PriceRecordsTableDto } from "./priceRecordsTable.dto";

export class PriceRecordsStore {
  @observable priceRecordsData?: PriceRecordsTableDto;
  @observable editPriceRecordDefaultValues?: EditPriceRecordDefaultValues;
  @observable dataLoading = false;
  @observable createRecordLoading = false;
  @observable editRecordLoading = false;
  @observable dataSource: PriceRecordsDataSourceOptions = "all";

  @computed
  get priceRecords(): PriceRecordsTableDto["priceRecords"] {
    return this.priceRecordsData?.priceRecords || [];
  }

  @action
  async fetchAll(): Promise<void> {
    try {
      const url = (() => {
        switch (this.dataSource) {
          case "all":
            return "priceRecords/";
          case "personal":
            return "priceRecords/me";
        }
      })();
      runInAction(() => (this.dataLoading = true));
      const { data } = await DataProvider.sendRequest((dataProvider) => dataProvider.get(url));
      const response = decodeDto(GetPriceRecords.Response.dto, data);
      runInAction(() => (this.priceRecordsData = response.data));
      console.log(`# of price records loaded: ${this.priceRecordsData?.priceRecords.length}`);
    } finally {
      runInAction(() => (this.dataLoading = false));
    }
  }

  @action async addRecord(dto: CreatePriceRecordDto): Promise<void> {
    try {
      runInAction(() => (this.createRecordLoading = true));
      await DataProvider.sendRequest((dataProvider) => dataProvider.post("priceRecords/", dto));
    } finally {
      runInAction(() => (this.createRecordLoading = false));
    }
  }

  @action async updateRecord(priceRecordId: string, dto: EditPriceRecordDto): Promise<void> {
    try {
      runInAction(() => (this.editRecordLoading = true));
      await DataProvider.sendRequest((dataProvider) => dataProvider.patch(`priceRecords/${priceRecordId}`, dto));
    } finally {
      runInAction(() => (this.editRecordLoading = false));
    }
  }

  @action updateEditFormDefaultValues(defaultValues: EditPriceRecordDefaultValues): void {
    this.editPriceRecordDefaultValues = defaultValues;
  }

  @action setDataSource(dataSource: PriceRecordsDataSourceOptions): void {
    this.dataSource = dataSource;
    this.fetchAll().catch(NotificationManager.ShowError);
  }
}
