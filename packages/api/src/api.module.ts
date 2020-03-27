import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { PriceRecordsModule } from "./priceRecords/priceRecords.module";
import { ProfilesModule } from "./profiles/profiles.module";
import { RoutesModule } from "./routes/routes.module";
import { UsersModule } from "./users/users.module";

const modules = [ConfigModule, PriceRecordsModule, AuthModule, UsersModule, ProfilesModule];

@Module({
  imports: [...modules, RoutesModule],
  exports: modules,
})
export class ApiModule {}
