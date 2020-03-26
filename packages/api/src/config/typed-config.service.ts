import { decodeDto } from "@ansik/sdk/lib/utils";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { string } from "io-ts";
import { ConfigDefinition } from "../configDefinition";

@Injectable()
export class TypedConfigService {
  readonly config: ConfigDefinition;
  constructor(configService: ConfigService) {
    this.config = {
      JWT_SECRET: decodeDto(string, configService.get("jwt.secret")),
      JWT_EXPIRESIN: decodeDto(string, configService.get("jwt.expiresIn")),
    };
  }
}
