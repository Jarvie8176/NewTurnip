import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ValidatedUser } from "../users/users.entity";
import { User } from "./auth.decorator";
import { AuthResult } from "./auth.interfaces";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(
    @User() user: ValidatedUser.Type,
    @Body() _body: { username: string; password: string }
  ): Promise<AuthResult> {
    console.log(user);
    return this.authService.grantAccess(user);
  }
}
