import { AddPriceRecords, GetPriceRecords, UpdatePriceRecords } from "@turnip-market/dtos";

export type PriceRecordsTableDto = GetPriceRecords.Response.Type["data"];

export type CreatePriceRecordDto = AddPriceRecords.Request.Type;

export type EditPriceRecordDto = UpdatePriceRecords.Request.Type;
