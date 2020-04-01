import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiModule } from "./api.module";
import { TypedConfigModule } from "./config/typed-config.module";

export const AppModuleMetadata = {
  imports: [
    TypedConfigModule,
    ConfigModule.forRoot({
      envFilePath: [
        ".env.development.local",
        ".env.production.local",
        ".env.local",
        ".env.development",
        ".env.production",
        ".env",
      ],
    }),
    TypeOrmModule.forRoot(),
    ApiModule,
  ],
};
