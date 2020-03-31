import { ApiExtraModels } from "@nestjs/swagger";
import { ReplaceCurrentUserProfile } from "@turnip-market/dtos";
import { UserProfile } from "./userProfiles.dto";

@ApiExtraModels()
export class ReplaceUserProfilesDto implements ReplaceCurrentUserProfile.Response.Type {
  data!: UserProfile;
}
