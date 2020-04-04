import * as t from "io-ts";
import { string, TypeOf } from "io-ts";
import { NumberFromString } from "io-ts-types/lib/NumberFromString";

export namespace ConfigDefinition {
  export const dto = t.interface({
    JWT_SECRET: string,
    JWT_EXPIRESIN: string,
    PORT: NumberFromString,
    API_DESCRIPTION: string,
    RATE_LIMIT_WINDOW_MS: NumberFromString,
    RATE_LIMIT_MAX_REQ_PER_WINDOW: NumberFromString,
  });
  export type Type = TypeOf<typeof dto>;
}
