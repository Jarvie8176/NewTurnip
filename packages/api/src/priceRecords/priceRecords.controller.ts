import { Body, Controller, Get, Post } from "@nestjs/common";
import { AddPriceRecord, GetPriceRecords } from "@turnip-market/dtos";
import { PriceRecordsService } from "./priceRecords.service";
import _ = require("lodash");

@Controller()
export class PriceRecordsController {
  constructor(private readonly priceRecordsService: PriceRecordsService) {}

  @Get()
  async getPriceRecords(): Promise<GetPriceRecords.Response.Type> {
    const records = await this.priceRecordsService.getAllRecords();
    const priceRecords = _.map(records, (record) => ({
      ...record,
      swCode: !_.isNil(record.swCode) ? record.swCode : null,
      price: Number(record.price),
      reportedAt: record.reportedAt.toISOString(),
    }));
    return { priceRecords };
  }

  @Post()
  async addPriceRecord(@Body() input: AddPriceRecord.Request.Type): Promise<void> {
    await this.priceRecordsService.addRecord(input);
  }
}
