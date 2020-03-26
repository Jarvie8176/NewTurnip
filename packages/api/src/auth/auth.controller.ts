import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { ValidatedUser } from "../users/users.entity";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";

interface ValidatedReq extends Request {
  user: ValidatedUser;
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req: ValidatedReq): Promise<AuthResult> {
    console.log(req.user);
    return this.authService.login(req.user);
  }
}
