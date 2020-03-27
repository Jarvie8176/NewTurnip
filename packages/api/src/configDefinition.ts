import * as t from "io-ts";
import { string, TypeOf } from "io-ts";
import { NumberFromString } from "io-ts-types/lib/NumberFromString";

export namespace ConfigDefinition {
  export const dto = t.interface({
    JWT_SECRET: string,
    JWT_EXPIRESIN: string,
    PORT: NumberFromString,
    API_DESCRIPTION: string,
  });
  export type Type = TypeOf<typeof dto>;
}
