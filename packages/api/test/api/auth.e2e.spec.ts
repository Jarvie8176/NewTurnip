import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { getConnection } from "typeorm";
import { Connection } from "typeorm/connection/Connection";
import { AppModule } from "../../src/app.module";
import { DefaultSettings } from "../../src/profiles/profiles.interface";
import { ProfilesService } from "../../src/profiles/profiles.service";
import { UsersService } from "../../src/users/users.service";

describe("e2e: Auth", () => {
  let app: INestApplication;
  let usersService: UsersService;
  let profilesService: ProfilesService;
  let connection: Connection;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    profilesService = moduleRef.get<ProfilesService>(ProfilesService);
    usersService = moduleRef.get<UsersService>(UsersService);
    connection = getConnection();
    await app.init();
  });

  beforeEach(async () => {
    await connection.synchronize(true);
  });

  afterAll(async () => {
    await app.close();
  });

  describe("POST api/auth/register", () => {
    test("created default user profile", async () => {
      const payload = { username: "abc", password: "abc", email: "foo" };

      await request(app.getHttpServer()).post("/api/auth/register").send(payload).expect(201);
      const user = await usersService.findOne(payload.username);
      if (!user) throw new Error("user doesn't exist");
      const profile = await profilesService.getByUser(user);
      expect(profile).toEqual({
        userId: user.id,
        profile: {
          id: expect.any(String),
          settings: DefaultSettings(),
        },
      });
    });
  });
});
