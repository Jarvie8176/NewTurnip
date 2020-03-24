import { decodeDto, makeUuid } from "@ansik/sdk/lib/utils";
import { GetPriceRecordsDto } from "@turnip-market/dtos";
import moment from "moment";
import { DataProvider } from "../../shared/DataProvider";
import { CreatePriceRecordDto, PriceRecordTableDto } from "./priceRecordTable.dto";

export default class PriceRecordsRepository {
  async fetchAll(): Promise<PriceRecordTableDto> {
    // todo
    // const { data } = await DataProvider.get("priceRecords/");
    const data = {
      priceRecords: [
        { id: makeUuid(), name: "abc", swCode: "1234-5678-90AB", price: 123.45, reportedAt: moment().toISOString() },
      ],
    };
    console.log("data ready");
    return decodeDto(GetPriceRecordsDto.dto, data);
  }

  async addRecord(dto: CreatePriceRecordDto): Promise<void> {
    // todo
    await DataProvider.post("priceRecords/", dto);
  }
}
