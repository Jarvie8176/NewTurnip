import * as t from "io-ts";
import { nullType, string, TypeOf } from "io-ts";

export namespace Settings {
  export const dto = t.interface({
    localTimeOffsetMinutes: t.union([string, nullType]), // difference between UTC time in minutes
    playerName: t.union([string, nullType]),
    islandName: t.union([string, nullType]),
    swCode: t.union([string, nullType]),
    dodoCode: t.union([string, nullType]), // dodo code password
  });
  export type Type = TypeOf<typeof dto>;
}

const profileDto = t.interface({
  id: string,
  settings: Settings.dto,
});

// schema

export namespace GetCurrentUserProfile {
  export namespace Response {
    export const dto = t.interface({
      data: t.interface({
        userId: string,
        profile: profileDto,
      }),
    });
    export type Type = TypeOf<typeof dto>;
  }
}

export namespace ReplaceCurrentUserProfile {
  export namespace Request {
    export const dto = t.interface({
      settings: Settings.dto,
    });
    export type Type = TypeOf<typeof dto>;
  }
  export namespace Response {
    export const dto = GetCurrentUserProfile.Response.dto;
    export type Type = TypeOf<typeof dto>;
  }
}
