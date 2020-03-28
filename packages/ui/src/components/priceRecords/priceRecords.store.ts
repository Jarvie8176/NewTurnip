import { decodeDto } from "@ansik/sdk/lib/utils";
import { GetPriceRecords } from "@turnip-market/dtos";
import { action, computed, observable, runInAction } from "mobx";
import { DataProvider } from "../../shared/dataProvider";
import { CreatePriceRecordDto, PriceRecordsTableDto } from "./priceRecordsTable.dto";

export class PriceRecordsStore {
  @observable priceRecordsData?: PriceRecordsTableDto;
  @observable dataLoading = false;
  @observable createRecordLoading = false;

  @computed
  get priceRecords(): PriceRecordsTableDto["priceRecords"] {
    return this.priceRecordsData?.priceRecords || [];
  }

  @action
  async fetchAll(): Promise<void> {
    try {
      runInAction(() => (this.dataLoading = true));
      const { data } = await DataProvider.get("priceRecords/");
      const response = decodeDto(GetPriceRecords.Response.dto, data);
      runInAction(() => (this.priceRecordsData = response));
      console.log(`# of price records loaded: ${this.priceRecordsData?.priceRecords.length}`);
    } finally {
      runInAction(() => (this.dataLoading = false));
    }
  }

  @action async addRecord(dto: CreatePriceRecordDto): Promise<void> {
    // todo
    try {
      runInAction(() => (this.createRecordLoading = true));
      console.log(this.createRecordLoading);
      await DataProvider.post("priceRecords/", dto);
    } finally {
      runInAction(() => (this.createRecordLoading = false));
      console.log(this.createRecordLoading);
    }
  }
}
