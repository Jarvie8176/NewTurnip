import t = require("io-ts");

export namespace ValidatedUser {
  export const dto = t.interface({
    id: t.string,
  });
  export type Type = t.TypeOf<typeof dto>;
}
