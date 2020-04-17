import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ReplaceCurrentUserProfile } from "@turnip-market/dtos";
import { User } from "../auth/auth.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ValidatedUser } from "../users/users.interface";
import { GetUserProfilesDto } from "./dtos/getUserProfiles.dto";
import { ProfilesService } from "./profiles.service";

@Controller()
@ApiBearerAuth()
@ApiTags("Profiles")
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "current current user's profile" })
  async getCurrentUserProfile(@User() user: ValidatedUser.Type): Promise<GetUserProfilesDto> {
    const data = await this.profilesService.getByUser(user);
    if (!data) throw new NotFoundException();
    return { data };
  }

  @Put("me")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "replaces current user's profile" })
  async replaceCurrentUserProfile(
    @User() user: ValidatedUser.Type,
    @Body() payload: ReplaceCurrentUserProfile.Request.Type
  ): Promise<GetUserProfilesDto> {
    await this.profilesService.replaceUserProfile(user, payload.settings);
    const profile = await this.getCurrentUserProfile(user);
    if (!profile) throw new InternalServerErrorException();
    return profile;
  }
}
