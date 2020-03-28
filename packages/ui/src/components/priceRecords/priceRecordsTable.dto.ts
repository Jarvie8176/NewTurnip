import { AddPriceRecord, GetPriceRecords } from "@turnip-market/dtos";

export interface PriceRecordsTableDto extends GetPriceRecords.Response.Type {}

export interface CreatePriceRecordDto extends AddPriceRecord.Request.Type {}
