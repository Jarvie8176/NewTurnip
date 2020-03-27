import { decodeDto } from "@ansik/sdk/lib/utils";
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";
import { ValidatedUser } from "../users/users.entity";
import _ = require("lodash");

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): ValidatedUser.Type => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.user) throw new InternalServerErrorException("authorization is required but no user info found");
    return decodeDto(ValidatedUser.dto, _.get(req, "user"));
  }
);
