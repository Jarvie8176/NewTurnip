import { ReplaceCurrentUserProfile } from "@turnip-market/dtos";
import { UserProfile } from "./userProfiles.dto";

export class ReplaceUserProfilesDto implements ReplaceCurrentUserProfile.Response.Type {
  data!: UserProfile;
}
