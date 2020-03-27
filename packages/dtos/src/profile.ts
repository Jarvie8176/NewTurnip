import * as t from "io-ts";
import { string, TypeOf } from "io-ts";

export namespace ProfileSettings {
  export const dto = t.interface({
    timezone: string,
  });
  export type Type = TypeOf<typeof dto>;
}

export namespace GetProfile {
  export namespace Response {
    export const dto = t.interface({
      id: string,
      userId: string,
      settings: ProfileSettings.dto,
    });
    export type Type = TypeOf<typeof dto>;
  }
}
