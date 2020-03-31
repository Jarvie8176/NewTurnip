import t = require("io-ts");
import { Request } from "express";
import { ValidatedUser } from "../users/users.interface";

export interface ValidatedReq extends Request {
  user: ValidatedUser.Type;
}

export namespace AuthPayload {
  export const dto = t.interface({
    sub: t.string,
  });
  export type Type = t.TypeOf<typeof dto>;
}
