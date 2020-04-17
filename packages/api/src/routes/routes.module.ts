import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "nest-router";
import { ApiModule } from "../api.module";
import { AuthModule } from "../auth/auth.module";
import { PredictionsModule } from "../predictions/predictions.module";
import { PriceRecordsModule } from "../priceRecords/priceRecords.module";
import { ProfilesModule } from "../profiles/profiles.module";

const routes: Routes = [
  {
    path: "/api",
    module: ApiModule,
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
      {
        path: "/predictions",
        module: PredictionsModule,
      },
    ],
  },
];

@Module({
  imports: [RouterModule.forRoutes(routes)],
})
export class RoutesModule {}
