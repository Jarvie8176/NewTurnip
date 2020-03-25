import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RouterModule, Routes } from "nest-router";
import { PriceRecordsModule } from "./priceRecords/priceRecords.module";

const routes: Routes = [
  {
    path: "/api",
    children: [
      {
        path: "/priceRecords",
        module: PriceRecordsModule,
      },
    ],
  },
];

@Module({
  imports: [TypeOrmModule.forRoot(), RouterModule.forRoutes(routes), PriceRecordsModule],
})
export class AppModule {}
