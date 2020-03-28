import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUser, Login } from "@turnip-market/dtos";
import { ValidatedUser } from "../users/users.interface";
import { UsersService } from "../users/users.service";
import { User } from "./auth.decorator";
import { AuthResult } from "./auth.interfaces";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller()
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@User() user: ValidatedUser.Type): Promise<Login.Response.Type> {
    return this.authService.grantAccess(user);
  }

  @Post("register")
  async signUp(@Body() input: CreateUser.Request.Type): Promise<AuthResult> {
    const user = await this.usersService.create(input);
    return await this.authService.grantAccess(user);
  }
}
