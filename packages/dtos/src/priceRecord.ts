import * as t from "io-ts";
import { array, number, string, TypeOf } from "io-ts";

export namespace PriceRecord {
  export const dto = t.interface({
    id: string, // uuid
    name: string,
    swCode: string,
    price: number,
    reportedAt: string,
  });
  export type Type = TypeOf<typeof dto>;
}

export namespace GetPriceRecordsDto {
  export const dto = t.interface({
    priceRecords: array(PriceRecord.dto),
  });
  export type Type = TypeOf<typeof dto>;
}
