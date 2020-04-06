import { ConflictException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { getConnection } from "typeorm";
import { TestUtilModule } from "../testUtil.module";
import { UsersModule } from "./users.module";
import { UsersService } from "./users.service";

describe("profilesService", () => {
  describe("getByUser()", () => {
    let usersService: UsersService;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [UsersModule, TestUtilModule],
      }).compile();
      usersService = moduleRef.get<UsersService>(UsersService);
    });

    beforeEach(async () => {
      await getConnection().synchronize(true);
    });

    afterAll(async () => {
      await getConnection().close();
    });

    test("unique username", async () => {
      await expect(usersService.create({ username: "a", password: "b", email: "c" })).resolves.not.toThrow();
      await expect(usersService.create({ username: "a", password: "b", email: "cc" })).rejects.toThrowError(
        ConflictException
      );
    });

    test("unique email", async () => {
      await expect(usersService.create({ username: "a", password: "b", email: "c" })).resolves.not.toThrow();
      await expect(usersService.create({ username: "aa", password: "b", email: "c" })).rejects.toThrowError(
        ConflictException
      );
    });
  });
});
