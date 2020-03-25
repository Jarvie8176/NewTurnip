import { decodeDto } from "@ansik/sdk/lib/utils";
import { GetPriceRecordsDto } from "@turnip-market/dtos";
import { DataProvider } from "../../shared/DataProvider";
import { CreatePriceRecordDto, PriceRecordTableDto } from "./priceRecordTable.dto";

export class PriceRecordsRepository {
  static async fetchAll(): Promise<PriceRecordTableDto> {
    // todo
    const { data } = await DataProvider.get("priceRecords/");
    console.log("data ready");
    // fixme: proper typing
    // data.priceRecords = _.map(data.priceRecords, (item) => ({
    //   ...item,
    //   reportedAt: moment(item.reportedAt, moment.ISO_8601),
    // }));
    console.log(data);
    const result = decodeDto(GetPriceRecordsDto.dto, data);
    console.log(result);
    return result;
  }

  static async addRecord(dto: CreatePriceRecordDto): Promise<void> {
    // todo
    await DataProvider.post("priceRecords/", dto);
  }
}
