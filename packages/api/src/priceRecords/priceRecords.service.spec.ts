import { makeUuid } from "@ansik/sdk/lib/utils";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { ISO_8601 } from "moment";
import { getConnection } from "typeorm";
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "../auth/auth.service";
import { UserProfileSettings } from "../profiles/dtos/userProfiles.dto";
import { ProfilesModule } from "../profiles/profiles.module";
import { ProfilesService } from "../profiles/profiles.service";
import { TestUtilModule } from "../testUtil.module";
import { PriceRecordsModule } from "./priceRecords.module";
import { PriceRecordsService } from "./priceRecords.service";
import moment = require("moment");

describe("priceRecordsService", () => {
  let priceRecordsService: PriceRecordsService;
  let authService: AuthService;

  let profilesService: ProfilesService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule, PriceRecordsModule, ProfilesModule, TestUtilModule],
    }).compile();

    priceRecordsService = moduleRef.get<PriceRecordsService>(PriceRecordsService);
    authService = moduleRef.get<AuthService>(AuthService);
    profilesService = moduleRef.get<ProfilesService>(ProfilesService);
  });

  afterAll(async () => {
    await getConnection().close();
  });

  describe("addRecord", () => {
    test("if user changes local time, local time offset of existing price records persist", async () => {
      // create user profile
      const user = await authService.createUserProfile({
        username: makeUuid(),
        password: makeUuid(),
        email: makeUuid(),
      });
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
        payload: { price: "100", reportedAt: new Date().toISOString() },
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
  describe("updateRecord", () => {
    test("usage", async () => {
      const user = await authService.createUserProfile({
        username: makeUuid(),
        password: makeUuid(),
        email: makeUuid(),
      });
      const settings: UserProfileSettings = {
        localTimeOffsetMinutes: null,
        islandName: null,
        dodoCode: null,
        playerName: null,
        swCode: null,
      };
      await profilesService.replaceUserProfile(user, settings);

      const priceRecord = await priceRecordsService.addRecord({
        user,
        payload: { price: "100", reportedAt: new Date(2020, 1, 1).toISOString() },
      });

      const result = await priceRecordsService.updateRecord({
        priceRecordId: priceRecord.id,
        user,
        payload: { price: "120", reportedAt: new Date(2020, 1, 2).toISOString() },
      });

      expect(result).toEqual({
        ...priceRecord,
        price: "120",
        reportedAt: new Date(2020, 1, 2),
      });
    });
    test("record does not exist", async () => {
      const user = await authService.createUserProfile({
        username: makeUuid(),
        password: makeUuid(),
        email: makeUuid(),
      });

      await expect(
        priceRecordsService.updateRecord({
          priceRecordId: makeUuid(),
          user,
          payload: { price: "120", reportedAt: new Date().toISOString() },
        })
      ).rejects.toThrowError(NotFoundException);
    });

    test("update other user's record", async () => {
      const user = await authService.createUserProfile({
        username: makeUuid(),
        password: makeUuid(),
        email: makeUuid(),
      });
      const priceRecord = await priceRecordsService.addRecord({
        user,
        payload: { price: "100", reportedAt: new Date(2020, 1, 1).toISOString() },
      });
      await expect(
        priceRecordsService.updateRecord({
          user: { id: makeUuid() },
          priceRecordId: priceRecord.id,
          payload: { price: "120", reportedAt: new Date().toISOString() },
        })
      ).rejects.toThrowError(UnauthorizedException);
    });
  });
  describe("getRecordsByUser", () => {
    test("usage", async () => {
      const user1 = await authService.createUserProfile({
        username: makeUuid(),
        password: makeUuid(),
        email: makeUuid(),
      });
      const user2 = await authService.createUserProfile({
        username: makeUuid(),
        password: makeUuid(),
        email: makeUuid(),
      });

      await priceRecordsService.addRecord({
        user: user1,
        payload: {
          price: "100",
          reportedAt: moment("2000-01-01T00:00:00Z", ISO_8601).toISOString(),
        },
      });
      await priceRecordsService.addRecord({
        user: user2,
        payload: {
          price: "300",
          reportedAt: moment("2000-01-01T00:00:00Z", ISO_8601).toISOString(),
        },
      });
      await priceRecordsService.addRecord({
        user: user2,
        payload: {
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
      const user = await authService.createUserProfile({
        username: makeUuid(),
        password: makeUuid(),
        email: makeUuid(),
      });
      const result = await priceRecordsService.getRecordsByUser(user);
      expect(result).toEqual([]);
    });
  });
});
