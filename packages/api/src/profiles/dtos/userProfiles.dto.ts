import { ApiExtraModels } from "@nestjs/swagger";
import { Settings } from "@turnip-market/dtos";

@ApiExtraModels()
export class UserProfileSettings implements Settings.Type {
  playerName!: string | null;
  islandName!: string | null;
  localTimeOffsetMinutes!: string | null;
  swCode!: string | null;
  dodoCode!: string | null;
}

@ApiExtraModels()
class Profile {
  id!: string;
  settings!: UserProfileSettings;
}

@ApiExtraModels()
export class UserProfile {
  userId!: string;
  profile!: Profile;
}
