import * as t from "io-ts";
import { array, nullType, number, string, TypeOf } from "io-ts";

export namespace GetPriceRecords {
  export namespace Response {
    export const dto = t.interface({
      priceRecords: array(
        t.interface({
          id: string, // uuid
          name: string,
          swCode: t.union([string, nullType]),
          price: number,
          reportedAt: string,
        })
      ),
    });
    export type Type = TypeOf<typeof dto>;
  }
}

export namespace AddPriceRecord {
  export namespace Request {
    export const dto = t.interface({
      name: string,
      swCode: t.union([string, nullType]),
      price: number,
      reportedAt: string,
    });
    export type Type = TypeOf<typeof dto>;
  }
}
