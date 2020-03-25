import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceRecordsController } from "./priceRecords.controller";
import { PriceRecordsEntity } from "./priceRecords.entity";
import { PriceRecordsService } from "./priceRecords.service";

@Module({
  imports: [TypeOrmModule.forFeature([PriceRecordsEntity])],
  controllers: [PriceRecordsController],
  providers: [PriceRecordsService],
})
export class PriceRecordsModule {}
