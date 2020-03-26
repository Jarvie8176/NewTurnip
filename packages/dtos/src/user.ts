import * as t from "io-ts";
import { string, TypeOf } from "io-ts";

export namespace User {
  export const dto = t.interface({
    id: string, // uuid
    username: string,
  });
  export type Type = TypeOf<typeof dto>;
}
