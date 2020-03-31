import { ApiExtraModels } from "@nestjs/swagger";
import { AddPriceRecords } from "@turnip-market/dtos";
import { PriceRecordsDto } from "./priceRecords.dto";

export class PriceRecords {
  priceRecord!: PriceRecordsDto;
}

@ApiExtraModels()
export class AddPriceRecordsDto implements AddPriceRecords.Response.Type {
  data!: PriceRecords;
}
