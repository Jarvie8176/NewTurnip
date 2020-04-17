import { Settings } from "@turnip-market/dtos";

export class UserProfileSettings implements Settings.Type {
  playerName!: string | null;
  islandName!: string | null;
  localTimeOffsetMinutes!: string | null;
  swCode!: string | null;
  dodoCode!: string | null;
}

class Profile {
  id!: string;
  settings!: UserProfileSettings;
}

export class UserProfile {
  userId!: string;
  profile!: Profile;
}
