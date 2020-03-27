import { decodeDto } from "@ansik/sdk/lib/utils";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TypedConfigService } from "../config/typed-config.service";
import { ValidatedUser } from "../users/users.entity";
import { AuthPayload } from "./auth.interfaces";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(typedConfigService: TypedConfigService) {
    const { config } = typedConfigService;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.JWT_SECRET,
    });
  }

  async validate(verifiedPayload: unknown): Promise<ValidatedUser.Type> {
    const authPayload = decodeDto(AuthPayload.dto, verifiedPayload);
    return { id: authPayload.sub };
  }
}
