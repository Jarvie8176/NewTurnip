import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddPriceRecord } from "@turnip-market/dtos";
import { Repository } from "typeorm";
import { PriceRecordsEntity } from "./priceRecords.entity";
import _ = require("lodash");
import moment = require("moment");

@Injectable()
export class PriceRecordsService {
  constructor(
    @InjectRepository(PriceRecordsEntity)
    private readonly priceRecordsRepository: Repository<PriceRecordsEntity>
  ) {}

  async getAllRecords(): Promise<PriceRecordsEntity[]> {
    const { priceRecordsRepository } = this;
    return await priceRecordsRepository.find({
      order: { reportedAt: "DESC" },
    });
  }

  async addRecord(input: AddPriceRecord.Request.Type): Promise<PriceRecordsEntity> {
    const priceRecord = new PriceRecordsEntity();
    const { swCode, price, name, reportedAt } = input;
    priceRecord.swCode = !_.isNil(swCode) ? swCode : undefined;
    priceRecord.price = Number(price);
    priceRecord.name = name;
    const reportedAtTimestamp = moment(reportedAt, moment.ISO_8601);
    if (!reportedAtTimestamp.isValid()) throw new Error("invalid reportedAt");
    priceRecord.reportedAt = reportedAtTimestamp.toDate();

    await this.priceRecordsRepository.save(priceRecord);
    return priceRecord;
  }
}
