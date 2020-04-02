import * as Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypedConfigModule } from "./config/typed-config.module";

@Module({
  imports: [
    TypedConfigModule,
    ConfigModule.forRoot({
      envFilePath: [
        ".env.test.local",
        ".env.development.local",
        ".env.production.local",
        ".env.local",
        ".env.test",
        ".env.development",
        ".env.production",
        ".env",
      ],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid("development", "production", "test", "provision").default("development"),
      }),
    }),
    TypeOrmModule.forRoot(),
  ],
  exports: [],
})
export class TestUtilModule {}
