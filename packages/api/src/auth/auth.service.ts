import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { ValidatedUser } from "../users/users.interface";
import { UsersService } from "../users/users.service";
import { AuthPayload } from "./auth.interfaces";
import { LoginDto } from "./dtos/login.dto";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<ValidatedUser.Type | undefined> {
    const user = await this.usersService.findOne(username);
    if (!user) return;
    const passwordMatches = await compare(pass, user.password);
    if (!passwordMatches) throw new UnauthorizedException();
    const { id } = user;
    return { id };
  }

  async grantAccess(user: ValidatedUser.Type): Promise<LoginDto["data"]> {
    const payload: AuthPayload.Type = { sub: user.id };
    const accessToken = this.signPayload(payload);
    return { accessToken };
  }

  private signPayload(payload: AuthPayload.Type): string {
    return this.jwtService.sign(payload);
  }
}
