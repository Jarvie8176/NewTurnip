import { GetPriceRecordsDto, PriceRecord } from "@turnip-market/dtos";

export interface PriceRecordTableDto extends GetPriceRecordsDto.Type {}

export interface CreatePriceRecordDto extends PriceRecord.Type {}
