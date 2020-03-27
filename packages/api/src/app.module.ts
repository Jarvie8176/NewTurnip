import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiModule } from "./api.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development", ".env.development.local", ".env.production", ".env.production.local"],
    }),
    TypeOrmModule.forRoot(),
    ApiModule,
  ],
})
export class AppModule {}
