import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddPriceRecords } from "@turnip-market/dtos";
import { Repository } from "typeorm";
import { UsersEntity } from "../users/users.entity";
import { ValidatedUser } from "../users/users.interface";
import { NullOrValue } from "../utils/nullCast";
import { PriceRecordsDto } from "./dtos/priceRecords.dto";
import { PriceRecordsEntity } from "./priceRecords.entity";
import _ = require("lodash");
import moment = require("moment");

@Injectable()
export class PriceRecordsService {
  constructor(
    @InjectRepository(PriceRecordsEntity)
    private readonly priceRecordsRepository: Repository<PriceRecordsEntity>
  ) {}

  async getAllRecords(): Promise<PriceRecordsDto[]> {
    const MAX_RECORD_LIMIT = 200; // todo: configurable?

    const records = await this.priceRecordsRepository
      .createQueryBuilder("priceRecords")
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select("selectedPriceRecords.id")
          .from(PriceRecordsEntity, "selectedPriceRecords")
          .orderBy({ "selectedPriceRecords.reportedAt": "DESC" })
          .limit(MAX_RECORD_LIMIT) // fixme: hard coded max number of objects fetched
          .getQuery();
        return `priceRecords.id IN ${subQuery}`;
      })
      .leftJoinAndSelect("priceRecords.reportedBy", "users")
      .leftJoinAndSelect("users.profile", "profiles")
      .orderBy({ "priceRecords.reportedAt": "DESC" })
      .getMany();
    return _.map(
      records,
      (item): PriceRecordsDto => {
        const { id, playerName, islandName, price, reportedAt } = item;
        const { swCode, localTimeOffsetMinutes } = item.reportedBy?.profile?.settings || {};
        return {
          id,
          price,
          reportedAt,
          playerName,
          islandName,
          swCode: NullOrValue(swCode),
          timeOffsetInMinutes: NullOrValue(localTimeOffsetMinutes),
        };
      }
    );
  }

  async addRecord(options: {
    input: AddPriceRecords.Request.Type;
    user: ValidatedUser.Type;
  }): Promise<PriceRecordsDto> {
    const { input, user } = options;
    const { swCode, price, playerName, islandName, reportedAt } = input;

    const usersEntity = new UsersEntity();
    usersEntity.id = user.id;

    const newPriceRecord = new PriceRecordsEntity();
    newPriceRecord.swCode = !_.isNil(swCode) ? swCode : undefined;
    newPriceRecord.price = price;
    newPriceRecord.playerName = playerName;
    newPriceRecord.islandName = islandName;
    newPriceRecord.reportedBy = usersEntity;
    const reportedAtTimestamp = moment(reportedAt, moment.ISO_8601);
    if (!reportedAtTimestamp.isValid()) throw new Error("invalid reportedAt");
    newPriceRecord.reportedAt = reportedAtTimestamp.toDate();

    await this.priceRecordsRepository.save(newPriceRecord);

    const item = await this.priceRecordsRepository
      .createQueryBuilder("priceRecords")
      .leftJoinAndSelect("priceRecords.reportedBy", "users")
      .leftJoinAndSelect("users.profile", "profiles")
      .where({
        "priceRecords.id": newPriceRecord.id,
      })
      .getOne();

    if (!item) throw new InternalServerErrorException();

    return ((): PriceRecordsDto => {
      const { id, playerName, islandName, price, reportedAt } = item;
      const { swCode, localTimeOffsetMinutes } = item.reportedBy?.profile?.settings || {};
      return {
        id,
        price,
        reportedAt,
        playerName,
        islandName,
        swCode: NullOrValue(swCode),
        timeOffsetInMinutes: NullOrValue(localTimeOffsetMinutes),
      };
    })();
  }
}
