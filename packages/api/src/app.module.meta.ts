import * as Joi from "@hapi/joi";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiModule } from "./api.module";
import { TypedConfigModule } from "./config/typed-config.module";

export const AppModuleMetadata = {
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
    ApiModule,
  ],
};
