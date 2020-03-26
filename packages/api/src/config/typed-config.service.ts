import { decodeDto } from "@ansik/sdk/lib/utils";
import { Injectable } from "@nestjs/common";
import { ConfigDefinition } from "../configDefinition";

@Injectable()
export class TypedConfigService {
  readonly config: ConfigDefinition.Type;
  //  constructor(configService: ConfigService) {
  //    console.log(process.env);
  //
  //    this.config = decodeDto(ConfigDefinition.dto, process.env);
  //  }
  constructor() {
    this.config = decodeDto(ConfigDefinition.dto, process.env);
    console.log("typed config loaded");
  }
}
