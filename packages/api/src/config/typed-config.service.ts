import { decodeDto } from "@ansik/sdk/lib/utils";
import { Injectable } from "@nestjs/common";
import { exact } from "io-ts";
import { ConfigDefinition } from "../configDefinition";

@Injectable()
export class TypedConfigService {
  readonly config: ConfigDefinition.Type;
  constructor() {
    console.log("NODE_ENV", process.env.NODE_ENV);
    this.config = decodeDto(exact(ConfigDefinition.dto), process.env);
    console.log("typed config loaded");
  }
}
