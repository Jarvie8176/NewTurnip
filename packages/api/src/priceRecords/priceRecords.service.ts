import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddPriceRecords, UpdatePriceRecords } from "@turnip-market/dtos";
import { Repository, SelectQueryBuilder } from "typeorm";
import { ProfilesEntity } from "../profiles/profiles.entity";
import { ValidatedUser } from "../users/users.interface";
import { NullOrValue } from "../utils/nullCast";
import { PriceRecordsDto } from "./dtos/priceRecords.dto";
import { PriceRecordsEntity } from "./priceRecords.entity";
import _ = require("lodash");
import moment = require("moment");

interface GetRecordsOptions {
  recordLimit: number;
  queryModifier?: (queryBuilder: SelectQueryBuilder<PriceRecordsEntity>) => SelectQueryBuilder<PriceRecordsEntity>;
}

@Injectable()
export class PriceRecordsService {
  static MAX_RECORD_LIMIT = 200; // todo: configurable?

  constructor(
    @InjectRepository(PriceRecordsEntity)
    private readonly priceRecordsRepository: Repository<PriceRecordsEntity>,
    @InjectRepository(ProfilesEntity)
    private readonly profilesRepository: Repository<ProfilesEntity>
  ) {}

  private async getRecords(options: GetRecordsOptions): Promise<PriceRecordsDto[]> {
    const { recordLimit, queryModifier } = options;
    const query = this.priceRecordsRepository
      .createQueryBuilder("priceRecords")
      .leftJoinAndSelect("priceRecords.reportedBy", "profiles")
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select("selectedPriceRecords.id")
          .from(PriceRecordsEntity, "selectedPriceRecords")
          .orderBy({ "selectedPriceRecords.reportedAt": "DESC" })
          .limit(recordLimit) // fixme: hard coded max number of objects fetched
          .getQuery();
        return `priceRecords.id IN ${subQuery}`;
      })
      .orderBy({ "priceRecords.reportedAt": "DESC" });
    queryModifier?.(query);
    const records = await query.getMany();
    return _.map(records, (item) => PriceRecordsService.PriceRecordsEntityToDto(item));
  }

  async getRecordsByUser(user: ValidatedUser.Type): Promise<PriceRecordsDto[]> {
    return await this.getRecords({
      recordLimit: PriceRecordsService.MAX_RECORD_LIMIT,
      queryModifier: (queryBuilder) =>
        queryBuilder.leftJoinAndSelect("profiles.user", "user").where("user.id = :userId", { userId: user.id }),
    });
  }

  async getAllRecords(): Promise<PriceRecordsDto[]> {
    return await this.getRecords({ recordLimit: PriceRecordsService.MAX_RECORD_LIMIT });
  }

  private async getRecordById(priceRecordId: string): Promise<PriceRecordsDto> {
    const priceRecord = await this.priceRecordsRepository
      .createQueryBuilder("priceRecords")
      .leftJoinAndSelect("priceRecords.reportedBy", "profiles")
      .where("priceRecords.id = :id", { id: priceRecordId })
      .getOne();

    if (!priceRecord) throw new NotFoundException("price record does not exist");
    return PriceRecordsService.PriceRecordsEntityToDto(priceRecord);
  }

  async addRecord(options: {
    payload: AddPriceRecords.Request.Type;
    user: ValidatedUser.Type;
  }): Promise<PriceRecordsDto> {
    const { payload, user } = options;
    const { price, reportedAt } = payload;

    const userProfile = await this.profilesRepository
      .createQueryBuilder("profiles")
      .innerJoinAndSelect("profiles.user", "users")
      .where("users.id = :userId", { userId: user.id })
      .getOne();

    if (!userProfile) throw new BadRequestException("user does not have a profile");
    const newPriceRecord = new PriceRecordsEntity();
    newPriceRecord.price = price;
    newPriceRecord.reportedBy = userProfile;
    newPriceRecord.localTimeOffsetMinutes = userProfile?.settings.localTimeOffsetMinutes || undefined;
    const reportedAtTimestamp = moment(reportedAt, moment.ISO_8601);
    if (!reportedAtTimestamp.isValid()) throw new Error("invalid reportedAt");
    newPriceRecord.reportedAt = reportedAtTimestamp.toDate();

    await this.priceRecordsRepository.save(newPriceRecord);

    const item = await this.priceRecordsRepository
      .createQueryBuilder("priceRecords")
      .leftJoinAndSelect("priceRecords.reportedBy", "profiles")
      .where("priceRecords.id = :id", { id: newPriceRecord.id })
      .getOne();

    if (!item) throw new InternalServerErrorException();

    return PriceRecordsService.PriceRecordsEntityToDto(item);
  }

  async updateRecord(options: {
    priceRecordId: string;
    payload: UpdatePriceRecords.Request.Type;
    user: ValidatedUser.Type;
  }): Promise<PriceRecordsDto> {
    const { priceRecordId, user, payload } = options;
    const existingRecord = await this.priceRecordsRepository
      .createQueryBuilder("priceRecords")
      .leftJoinAndSelect("priceRecords.reportedBy", "profiles")
      .leftJoinAndSelect("profiles.user", "user")
      .where("priceRecords.id = :id", { id: priceRecordId })
      .getOne();

    if (!existingRecord) throw new NotFoundException("price record not found");

    const userId = existingRecord?.reportedBy?.user?.id;
    if (userId !== user.id) throw new UnauthorizedException("can only update own records");

    await this.priceRecordsRepository
      .createQueryBuilder()
      .update()
      .set(payload)
      .where("id = :id", { id: priceRecordId })
      .execute();

    return await this.getRecordById(priceRecordId);
  }

  private static PriceRecordsEntityToDto(priceRecordsEntity: PriceRecordsEntity): PriceRecordsDto {
    const { id, reportedBy, price, localTimeOffsetMinutes, reportedAt } = priceRecordsEntity;
    const playerName = reportedBy?.settings.playerName || "";
    const islandName = reportedBy?.settings.islandName || "";
    const { swCode } = priceRecordsEntity.reportedBy?.settings || {};
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
