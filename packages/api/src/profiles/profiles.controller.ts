import { Controller, Get, NotFoundException, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetProfile } from "@turnip-market/dtos";
import { User } from "../auth/auth.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ValidatedUser } from "../users/users.entity";
import { ProfilesService } from "./profiles.service";

@Controller()
@ApiBearerAuth()
@ApiTags("profiles")
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "current user's profile" })
  async getCurrentUserProfile(@User() user: ValidatedUser.Type): Promise<GetProfile.Response.Type> {
    const profile = await this.profilesService.getByUser(user);
    if (!profile) throw new NotFoundException();
    return profile;
  }
}
