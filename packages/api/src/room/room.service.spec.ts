import { Test } from "@nestjs/testing";
import { getConnection } from "typeorm";
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "../auth/auth.service";
import { ProfilesService } from "../profiles/profiles.service";
import { TestUtilModule } from "../testUtil.module";
import { CreateRoomDto } from "./dtos/createRoom.dto";
import { RoomModule } from "./room.module";
import { RoomService } from "./room.service";

describe("RoomService", () => {
  describe("create()", () => {
    let roomService: RoomService;
    let authService: AuthService;
    let profilesService: ProfilesService;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AuthModule, RoomModule, TestUtilModule],
      }).compile();
      authService = moduleRef.get<AuthService>(AuthService);
      roomService = moduleRef.get<RoomService>(RoomService);
      profilesService = moduleRef.get<ProfilesService>(ProfilesService);
    });

    afterAll(async () => {
      await getConnection().close();
    });

    beforeEach(async () => {
      await getConnection().synchronize(true);
    });

    test("creates a room and a queue", async () => {
      const user = await authService.createUserProfile({ username: "username", password: "password", email: "email" });
      const userProfile = await profilesService.getByUser(user);
      if (!userProfile) throw new Error("profiles does not exist");
      const payload: CreateRoomDto = {
        type: "turnipExchange",
        attributes: {
          price: "123",
          dodoCode: "a",
          notes: "notes",
          maxCapacity: 4,
        },
      };
      const result = await roomService.create({ user, payload });
      expect(result).toEqual({
        id: expect.any(String),
        type: "turnipExchange",
        attributes: {
          price: "123",
          dodoCode: "a",
          notes: "notes",
          maxCapacity: 4,
        },
        createdBy: {
          id: userProfile.profile.id,
        },
        queueId: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    test("retrieves a room", async () => {
      const user = await authService.createUserProfile({ username: "username", password: "password", email: "email" });
      const profile = await profilesService.getByUser(user);
      if (!profile) throw new Error("profiles does not exist");
      const payload: CreateRoomDto = {
        type: "turnipExchange",
        attributes: {
          price: "123",
          dodoCode: "a",
          notes: "notes",
          maxCapacity: 1,
        },
      };
      const createRoomRO = await roomService.create({ user, payload });
      const room = await roomService.getRoomInfo({ user, roomId: createRoomRO.id });
      expect(room).toEqual({
        id: createRoomRO.id,
        type: "turnipExchange",
        attributes: {
          dodoCode: "a",
          maxCapacity: 1,
          notes: "notes",
          price: "123",
        },
        queue: {
          id: createRoomRO.queueId,
          playersInQueue: [],
          population: {
            max: 1,
            waiting: 0,
          },
        },
      });
    });
  });
});
