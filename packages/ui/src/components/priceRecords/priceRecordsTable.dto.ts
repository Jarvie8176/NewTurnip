import { AddPriceRecords, GetPriceRecords } from "@turnip-market/dtos";

export type PriceRecordsTableDto = GetPriceRecords.Response.Type["data"];

export type CreatePriceRecordDto = AddPriceRecords.Request.Type;
