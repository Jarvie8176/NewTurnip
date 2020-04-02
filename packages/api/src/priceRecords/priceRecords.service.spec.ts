import { makeUuid } from "@ansik/sdk/lib/utils";
import { Test } from "@nestjs/testing";
import { ISO_8601 } from "moment";
import { UserProfileSettings } from "../profiles/dtos/userProfiles.dto";
import { ProfilesModule } from "../profiles/profiles.module";
import { ProfilesService } from "../profiles/profiles.service";
import { TestUtilModule } from "../testUtil.module";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { PriceRecordsModule } from "./priceRecords.module";
import { PriceRecordsService } from "./priceRecords.service";
import moment = require("moment");

describe("priceRecordsService", () => {
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

  describe("addRecord", () => {
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
  describe("getRecordsByUser", () => {
    test("usage", async () => {
      const user1 = await usersService.create({ username: makeUuid(), password: makeUuid(), email: makeUuid() });
      const user2 = await usersService.create({ username: makeUuid(), password: makeUuid(), email: makeUuid() });

      await priceRecordsService.addRecord({
        user: user1,
        input: {
          playerName: "",
          islandName: "",
          swCode: "",
          price: "100",
          reportedAt: moment("2000-01-01T00:00:00Z", ISO_8601).toISOString(),
        },
      });
      await priceRecordsService.addRecord({
        user: user2,
        input: {
          playerName: "",
          islandName: "",
          swCode: "",
          price: "300",
          reportedAt: moment("2000-01-01T00:00:00Z", ISO_8601).toISOString(),
        },
      });
      await priceRecordsService.addRecord({
        user: user2,
        input: {
          playerName: "",
          islandName: "",
          swCode: "",
          price: "200",
          reportedAt: moment("2000-01-02T00:00:00Z", ISO_8601).toISOString(),
        },
      });

      const user1Records = await priceRecordsService.getRecordsByUser(user1);
      const user2Records = await priceRecordsService.getRecordsByUser(user2);

      expect(user1Records).toHaveLength(1);
      expect(user2Records).toHaveLength(2);

      expect(user1Records[0].price).toEqual("100");
      expect(user2Records[0].price).toEqual("200");
      expect(user2Records[1].price).toEqual("300");
    });
    test("returns empty list if no data found", async () => {
      const user = await usersService.create({ username: makeUuid(), password: makeUuid(), email: makeUuid() });
      const result = await priceRecordsService.getRecordsByUser(user);
      expect(result).toEqual([]);
    });
  });
});
