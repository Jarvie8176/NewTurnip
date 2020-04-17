import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PredictionsModule } from "./predictions/predictions.module";
import { PriceRecordsModule } from "./priceRecords/priceRecords.module";
import { ProfilesModule } from "./profiles/profiles.module";
import { RoutesModule } from "./routes/routes.module";
import { UsersModule } from "./users/users.module";

const modules = [UsersModule, ProfilesModule, PriceRecordsModule, AuthModule, PredictionsModule];

@Module({
  imports: [...modules, RoutesModule],
  exports: [...modules],
})
export class ApiModule {}
