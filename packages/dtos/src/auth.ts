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
      accessToken: string,
    });
    export type Type = TypeOf<typeof dto>;
  }
}

export namespace CreateUser {
  export namespace Request {
    export const dto = t.intersection([
      Login.Request.dto,
      t.interface({
        email: string,
      }),
    ]);
    export type Type = TypeOf<typeof dto>;
  }
  export namespace Response {
    export const dto = Login.Response.dto;
    export type Type = Login.Response.Type;
  }
}
