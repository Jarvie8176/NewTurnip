import { ApiExtraModels } from "@nestjs/swagger";
import { GetCurrentUserProfile } from "@turnip-market/dtos";
import { UserProfile } from "./userProfiles.dto";

@ApiExtraModels()
export class GetUserProfilesDto implements GetCurrentUserProfile.Response.Type {
  data!: UserProfile;
}
