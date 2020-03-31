import _ = require("lodash");

export function NullOrValue<T>(input: T): NonNullable<T> | null {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  return _.isNil(input) ? null : input;
}
