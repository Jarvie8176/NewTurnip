import * as t from "io-ts";
import { string, TypeOf } from "io-ts";

export namespace ConfigDefinition {
  export const dto = t.interface({
    JWT_SECRET: string,
    JWT_EXPIRESIN: string,
  });
  export type Type = TypeOf<typeof dto>;
}
