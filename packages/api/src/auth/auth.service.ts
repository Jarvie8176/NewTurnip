import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ValidatedUser } from "../users/users.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<ValidatedUser | undefined> {
    const user = await this.usersService.findOne(username);
    if (!user || user.password !== pass) return;
    const { password, ...result } = user;
    return result;
  }

  async login(user: ValidatedUser) {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }
}
