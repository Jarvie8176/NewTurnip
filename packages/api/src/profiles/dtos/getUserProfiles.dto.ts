import { GetCurrentUserProfile } from "@turnip-market/dtos";
import { UserProfile } from "./userProfiles.dto";

export class GetUserProfilesDto implements GetCurrentUserProfile.Response.Type {
  data!: UserProfile;
}
