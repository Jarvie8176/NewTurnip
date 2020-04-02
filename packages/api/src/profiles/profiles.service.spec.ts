import { makeUuid } from "@ansik/sdk/lib/utils";
import { Test } from "@nestjs/testing";
import { Repository } from "typeorm";
import { TestUtilModule } from "../testUtil.module";
import { UsersEntity } from "../users/users.entity";
import { ProfilesEntity } from "./profiles.entity";
import { ProfilesModule } from "./profiles.module";
import { ProfilesService } from "./profiles.service";
import typeorm = require("typeorm");

describe("profilesService", () => {
  describe("getByUser()", () => {
    let profilesService: ProfilesService;

    let usersRepository: Repository<UsersEntity>;
    let profilesRepository: Repository<ProfilesEntity>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [ProfilesModule, TestUtilModule],
      }).compile();
      profilesService = moduleRef.get<ProfilesService>(ProfilesService);
      profilesRepository = typeorm.getRepository(ProfilesEntity);
      usersRepository = typeorm.getRepository(UsersEntity);
    });

    test("fetches user profile by userId", async () => {
      const user1 = new UsersEntity();
      user1.username = "a";
      user1.password = makeUuid();
      user1.email = makeUuid();
      const user2 = new UsersEntity();
      user2.username = "b";
      user2.password = makeUuid();
      user2.email = makeUuid();
      const user3 = new UsersEntity();
      user3.username = "c";
      user3.password = makeUuid();
      user3.email = makeUuid();
      await usersRepository.save([user1, user2, user3]);

      await profilesService.replaceUserProfile(user1, {
        playerName: "a",
        dodoCode: null,
        islandName: null,
        localTimeOffsetMinutes: null,
        swCode: null,
      });
      await profilesService.replaceUserProfile(user2, {
        playerName: "b",
        dodoCode: null,
        islandName: null,
        localTimeOffsetMinutes: null,
        swCode: null,
      });
      await profilesService.replaceUserProfile(user3, {
        playerName: "c",
        dodoCode: null,
        islandName: null,
        localTimeOffsetMinutes: null,
        swCode: null,
      });
      await profilesService.replaceUserProfile(user2, {
        playerName: "d",
        dodoCode: null,
        islandName: null,
        localTimeOffsetMinutes: null,
        swCode: null,
      });

      expect(await usersRepository.count()).toEqual(3);
      expect(await profilesRepository.count()).toEqual(3);

      const userProfile1 = await profilesService.getByUser(user1);
      expect(userProfile1?.profile.settings.playerName).toEqual("a");
      const userProfile2 = await profilesService.getByUser(user2);
      expect(userProfile2?.profile.settings.playerName).toEqual("d");
      const userProfile3 = await profilesService.getByUser(user3);
      expect(userProfile3?.profile.settings.playerName).toEqual("c");
    });
  });
});
