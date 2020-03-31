import * as t from "io-ts";
import { string, TypeOf } from "io-ts";

export const AuthTokenDecoder = t.interface({
  accessToken: string,
});
export type AuthTokenType = TypeOf<typeof AuthTokenDecoder>;
