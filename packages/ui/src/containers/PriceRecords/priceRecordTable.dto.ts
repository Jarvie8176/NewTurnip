import { AddPriceRecord, GetPriceRecordsDto } from "@turnip-market/dtos";

export interface PriceRecordTableDto extends GetPriceRecordsDto.Type {}

export interface CreatePriceRecordDto extends AddPriceRecord.Type {}
