import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "nest-router";
import { ApiModule } from "../api.module";
import { AuthModule } from "../auth/auth.module";
import { PriceRecordsModule } from "../priceRecords/priceRecords.module";
import { ProfilesModule } from "../profiles/profiles.module";
import { RoomModule } from "../room/room.module";

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
        path: "/rooms",
        module: RoomModule,
      },
    ],
  },
];

@Module({
  imports: [RouterModule.forRoutes(routes)],
})
export class RoutesModule {}
