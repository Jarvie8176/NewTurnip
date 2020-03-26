import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { User } from "@turnip-market/dtos";
import { ValidatedUser } from "../users/users.entity";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";

interface IReq extends User.Type {
  user: ValidatedUser;
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req: IReq) {
    console.log(req.user);
    return this.authService.login(req.user);
  }
}
