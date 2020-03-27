import { Module } from "@nestjs/common";
import { TypedConfigService } from "./typed-config.service";

@Module({
  imports: [],
  providers: [TypedConfigService],
  exports: [TypedConfigService],
})
export class TypeConfigModule {}
