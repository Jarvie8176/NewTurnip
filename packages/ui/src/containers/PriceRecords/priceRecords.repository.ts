import { decodeDto } from "@ansik/sdk/lib/utils";
import { GetPriceRecords } from "@turnip-market/dtos";
import { DataProvider } from "../../shared/DataProvider";
import { CreatePriceRecordDto, PriceRecordTableDto } from "./priceRecordTable.dto";

export class PriceRecordsRepository {
  static async fetchAll(): Promise<PriceRecordTableDto> {
    const { data } = await DataProvider.get("priceRecords/");
    console.log("data ready");

    const result = decodeDto(GetPriceRecords.Response.dto, data);
    console.log(result);
    return result;
  }

  static async addRecord(dto: CreatePriceRecordDto): Promise<void> {
    // todo
    await DataProvider.post("priceRecords/", dto);
  }
}
