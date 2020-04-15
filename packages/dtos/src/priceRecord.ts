import * as t from "io-ts";
import { array, nullType, string, TypeOf } from "io-ts";
import { DateFromISOString } from "io-ts-types/lib/DateFromISOString";

const getPriceRecordDto = t.interface({
  id: string, // uuid
  playerName: t.union([string, nullType]),
  islandName: t.union([string, nullType]),
  swCode: t.union([string, nullType]),
  price: string,
  reportedAt: DateFromISOString,
  timeOffsetInMinutes: t.union([string, nullType]),
});

export namespace GetPriceRecords {
  export namespace Response {
    export const dto = t.interface({
      data: t.interface({
        priceRecords: array(getPriceRecordDto),
      }),
    });
    export type Type = TypeOf<typeof dto>;
  }
}

export namespace AddPriceRecords {
  export namespace Request {
    export const dto = t.interface({
      price: string,
      reportedAt: string,
    });
    export type Type = TypeOf<typeof dto>;
  }
  export namespace Response {
    export const dto = t.interface({
      data: t.interface({
        priceRecord: getPriceRecordDto,
      }),
    });
    export type Type = TypeOf<typeof dto>;
  }
}

export namespace UpdatePriceRecords {
  export namespace Request {
    export const dto = t.interface({
      price: string,
      reportedAt: string,
    });
    export type Type = TypeOf<typeof dto>;
  }
  export namespace Response {
    export const dto = t.interface({
      data: t.interface({
        priceRecord: getPriceRecordDto,
      }),
    });
    export type Type = TypeOf<typeof dto>;
  }
}
