import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUser } from "@turnip-market/dtos";
import { ValidatedUser } from "../users/users.interface";
import { UsersService } from "../users/users.service";
import { User } from "./auth.decorator";
import { AuthResult } from "./auth.interfaces";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";

interface LoginBody {
  username: string;
  password: string;
}

@Controller()
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@User() user: ValidatedUser.Type, @Body() _body: LoginBody): Promise<AuthResult> {
    console.log(user);
    return this.authService.grantAccess(user);
  }

  @Post("register")
  async signUp(@Body() input: CreateUser.Request.Type): Promise<AuthResult> {
    const user = await this.usersService.create(input);
    return await this.authService.grantAccess(user);
  }
}
