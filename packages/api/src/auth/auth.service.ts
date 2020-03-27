import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ValidatedUser } from "../users/users.interface";
import { UsersService } from "../users/users.service";
import { AuthPayload, AuthResult } from "./auth.interfaces";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<ValidatedUser.Type | undefined> {
    const user = await this.usersService.findOne(username);
    if (!user || user.password !== pass) return;
    const { id } = user;
    return { id };
  }

  async grantAccess(user: ValidatedUser.Type): Promise<AuthResult> {
    const payload: AuthPayload.Type = { sub: user.id };
    const accessToken = this.signPayload(payload);
    return { accessToken };
  }

  private signPayload(payload: AuthPayload.Type): string {
    return this.jwtService.sign(payload);
  }
}
