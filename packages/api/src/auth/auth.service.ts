import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUser } from "@turnip-market/dtos";
import { compare } from "bcrypt";
import { DefaultSettings } from "../profiles/profiles.interface";
import { ProfilesService } from "../profiles/profiles.service";
import { UsersEntity } from "../users/users.entity";
import { ValidatedUser } from "../users/users.interface";
import { UsersService } from "../users/users.service";
import { AuthPayload } from "./auth.interfaces";
import { LoginDto } from "./dtos/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<ValidatedUser.Type | undefined> {
    const user = await this.usersService.findOne(username);
    if (!user) return;
    const passwordMatches = await compare(pass, user.password);
    if (!passwordMatches) throw new ForbiddenException();
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

  async createUserProfile(user: CreateUser.Request.Type): Promise<UsersEntity> {
    const usersEntity = await this.usersService.create(user);
    await this.profilesService.replaceUserProfile(usersEntity, DefaultSettings());
    return usersEntity;
  }
}
