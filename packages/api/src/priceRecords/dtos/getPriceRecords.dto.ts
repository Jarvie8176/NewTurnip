import { GetPriceRecords } from "@turnip-market/dtos";
import { PriceRecordsDto } from "./priceRecords.dto";

class PriceRecords {
  priceRecords!: PriceRecordsDto[];
}

export class GetPriceRecordsDto implements GetPriceRecords.Response.Type {
  data!: PriceRecords;
}
