import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RouterModule, Routes } from "nest-router";
import { AuthModule } from "../auth/auth.module";
import { PriceRecordsModule } from "../priceRecords/priceRecords.module";
import { ProfilesModule } from "../profiles/profiles.module";

const routes: Routes = [
  {
    path: "/api",
    children: [
      {
        path: "/auth",
        module: AuthModule,
      },
      {
        path: "/priceRecords",
        module: PriceRecordsModule,
      },
      {
        path: "/profiles",
        module: ProfilesModule,
      },
    ],
  },
];

@Module({
  imports: [ConfigModule, RouterModule.forRoutes(routes)],
})
export class RoutesModule {}
