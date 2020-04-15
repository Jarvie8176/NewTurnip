import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfilesEntity } from "../profiles/profiles.entity";
import { PriceRecordsController } from "./priceRecords.controller";
import { PriceRecordsEntity } from "./priceRecords.entity";
import { PriceRecordsService } from "./priceRecords.service";

@Module({
  imports: [TypeOrmModule.forFeature([PriceRecordsEntity, ProfilesEntity])],
  controllers: [PriceRecordsController],
  providers: [PriceRecordsService],
  exports: [PriceRecordsService],
})
export class PriceRecordsModule {}
