import * as Joi from "@hapi/joi";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiModule } from "./api.module";
import { TypedConfigModule } from "./config/typed-config.module";
import _ = require("lodash");

const DefaultEnv = "development";

export const AppModuleMetadata = {
  imports: [
    TypedConfigModule,
    ConfigModule.forRoot({
      envFilePath: ((): string[] => {
        const nodeEnv = process.env.NODE_ENV || DefaultEnv;
        return _.filter(
          [
            ".env.test.local",
            ".env.development.local",
            ".env.production.local",
            ".env.local",
            ".env.test",
            ".env.development",
            ".env.production",
            ".env",
          ],
          (i) => _.includes(i, nodeEnv)
        );
      })(),
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid("development", "production", "test", "provision").default(DefaultEnv),
      }),
    }),

    TypeOrmModule.forRoot(),
    ApiModule,
  ],
};
