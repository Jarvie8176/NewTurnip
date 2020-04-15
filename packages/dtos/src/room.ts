import t = require("io-ts");
import { nullType, number, string, TypeOf } from "io-ts";

export const roomAttributesDto = t.interface({
  price: string,
  dodoCode: string,
  notes: t.union([string, nullType]),
});

export const roomQueueDto = t.interface({
  id: string,
  population: t.interface({
    max: number,
    waiting: number,
  }),
  playersInQueue: t.array(
    t.interface({
      profileId: string,
      playerName: string,
    })
  ),
});

export namespace GetRoom {
  export namespace Response {
    export const dto = t.interface({
      data: t.interface({
        id: string,
        type: string,
        attributes: roomAttributesDto,
        queue: roomQueueDto,
      }),
    });
    export type Type = TypeOf<typeof dto>;
  }
}

export namespace CreateRoom {
  export namespace Request {
    export const dto = t.interface({
      type: string,
      attributes: roomAttributesDto,
    });
    export type Type = TypeOf<typeof dto>;
  }
  export namespace Response {
    export const dto = t.interface({
      data: t.interface({
        id: string,
        type: string,
        attributes: roomAttributesDto,
        queueId: string,
      }),
    });
    export type Type = TypeOf<typeof dto>;
  }
}
