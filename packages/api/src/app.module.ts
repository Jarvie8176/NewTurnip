import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiModule } from "./api.module";
import { TypedConfigModule } from "./config/typed-config.module";

@Module({
  imports: [
    TypedConfigModule,
    ConfigModule.forRoot({
      envFilePath: [".env.development", ".env.development.local", ".env.production", ".env.production.local"],
    }),
    TypeOrmModule.forRoot(),
    ApiModule,
  ],
})
export class AppModule {}
