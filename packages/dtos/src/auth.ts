import * as t from "io-ts";
import { string, TypeOf } from "io-ts";

export namespace Login {
  export namespace Request {
    export const dto = t.interface({
      username: string,
      password: string,
    });
    export type Type = TypeOf<typeof dto>;
  }

  export namespace Response {
    export const dto = t.interface({
      id: string, // uuid
      username: string,
    });
    export type Type = TypeOf<typeof dto>;
  }
}