import { makeUuid } from "@ansik/sdk/lib/utils";
import { Test } from "@nestjs/testing";
import { UserProfileSettings } from "../profiles/dtos/userProfiles.dto";
import { ProfilesModule } from "../profiles/profiles.module";
import { ProfilesService } from "../profiles/profiles.service";
import { TestUtilModule } from "../testUtil.module";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { PriceRecordsModule } from "./priceRecords.module";
import { PriceRecordsService } from "./priceRecords.service";

describe("priceRecordsService", () => {
  describe("addRecord", () => {
    let priceRecordsService: PriceRecordsService;
    let usersService: UsersService;
    let profilesService: ProfilesService;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [UsersModule, PriceRecordsModule, ProfilesModule, TestUtilModule],
      }).compile();

      priceRecordsService = moduleRef.get<PriceRecordsService>(PriceRecordsService);
      usersService = moduleRef.get<UsersService>(UsersService);
      profilesService = moduleRef.get<ProfilesService>(ProfilesService);
    });
    test("if user changes local time, local time offset of existing price records persist", async () => {
      // create user profile
      const user = await usersService.create({ username: makeUuid(), password: makeUuid(), email: makeUuid() });
      const settings: UserProfileSettings = {
        localTimeOffsetMinutes: null,
        islandName: null,
        dodoCode: null,
        playerName: null,
        swCode: null,
      };
      await profilesService.replaceUserProfile(user, {
        ...settings,
        localTimeOffsetMinutes: "120",
      });
      await priceRecordsService.addRecord({
        user,
        input: { playerName: "", islandName: "", swCode: "", price: "100", reportedAt: new Date().toISOString() },
      });
      const priceRecordsBeforeChange = await priceRecordsService.getAllRecords();
      expect(priceRecordsBeforeChange[0].timeOffsetInMinutes).toEqual("120");

      await profilesService.replaceUserProfile(user, {
        ...settings,
        localTimeOffsetMinutes: "240",
      });
      const priceRecordsAfterChange = await priceRecordsService.getAllRecords();
      expect(priceRecordsAfterChange[0].timeOffsetInMinutes).toEqual("120");
    });
  });
});
