import { UserProfileSettings } from "./dtos/userProfiles.dto";

export const DefaultSettings = (): UserProfileSettings => ({
  playerName: null,
  islandName: null,
  localTimeOffsetMinutes: null,
  swCode: null,
  dodoCode: null,
});
