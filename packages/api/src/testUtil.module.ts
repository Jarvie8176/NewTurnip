import { Module } from "@nestjs/common";
import { ModuleMetadata } from "@nestjs/common/interfaces/modules/module-metadata.interface";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypedConfigModule } from "./config/typed-config.module";
import _ = require("lodash");

@Module({
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
  ],
  exports: [],
})
export class TestUtilModule {}

export function injectTestUtilModule(_metadata: ModuleMetadata): ModuleMetadata {
  const metadata = _.cloneDeep(_metadata);
  if (!metadata.imports) metadata.imports = [];
  metadata.imports.push(TestUtilModule);
  return metadata;
}
