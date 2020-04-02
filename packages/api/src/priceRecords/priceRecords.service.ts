import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddPriceRecords } from "@turnip-market/dtos";
import { Repository } from "typeorm";
import { ProfilesEntity } from "../profiles/profiles.entity";
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
    private readonly priceRecordsRepository: Repository<PriceRecordsEntity>,
    @InjectRepository(ProfilesEntity)
    private readonly profilesRepository: Repository<ProfilesEntity>
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
    return _.map(records, (item) => PriceRecordsService.PriceRecordsEntityToDto(item));
  }

  async addRecord(options: {
    input: AddPriceRecords.Request.Type;
    user: ValidatedUser.Type;
  }): Promise<PriceRecordsDto> {
    const { input, user } = options;
    const { price, reportedAt } = input;

    const userProfile = await this.profilesRepository
      .createQueryBuilder("profiles")
      .innerJoinAndSelect("profiles.user", "users")
      .where("users.id = :userId", { userId: user.id })
      .getOne();

    const userEntity = userProfile ? userProfile.user : ({ id: user.id } as UsersEntity);

    const newPriceRecord = new PriceRecordsEntity();
    newPriceRecord.price = price;
    newPriceRecord.reportedBy = userEntity;
    newPriceRecord.localTimeOffsetMinutes = userProfile?.settings.localTimeOffsetMinutes || undefined;
    const reportedAtTimestamp = moment(reportedAt, moment.ISO_8601);
    if (!reportedAtTimestamp.isValid()) throw new Error("invalid reportedAt");
    newPriceRecord.reportedAt = reportedAtTimestamp.toDate();

    await this.priceRecordsRepository.save(newPriceRecord);

    const item = await this.priceRecordsRepository
      .createQueryBuilder("priceRecords")
      .leftJoinAndSelect("priceRecords.reportedBy", "users")
      .leftJoinAndSelect("users.profile", "profiles")
      .where("priceRecords.id = :id", { id: newPriceRecord.id })
      .getOne();

    if (!item) throw new InternalServerErrorException();

    return PriceRecordsService.PriceRecordsEntityToDto(item);
  }

  private static PriceRecordsEntityToDto(priceRecordsEntity: PriceRecordsEntity): PriceRecordsDto {
    const { id, reportedBy, price, localTimeOffsetMinutes, reportedAt } = priceRecordsEntity;
    const playerName = reportedBy?.profile?.settings.playerName || "";
    const islandName = reportedBy?.profile?.settings.islandName || "";
    const { swCode } = priceRecordsEntity.reportedBy?.profile?.settings || {};
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
}
