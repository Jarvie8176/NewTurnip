import { ApiExtraModels } from "@nestjs/swagger";
import { GetPriceRecords } from "@turnip-market/dtos";
import { PriceRecordsDto } from "./priceRecords.dto";

class PriceRecords {
  priceRecords!: PriceRecordsDto[];
}

@ApiExtraModels()
export class GetPriceRecordsDto implements GetPriceRecords.Response.Type {
  data!: PriceRecords;
}
