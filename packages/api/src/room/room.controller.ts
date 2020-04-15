import { Body, Controller, Get, Post } from "@nestjs/common";
import { User } from "../auth/auth.decorator";
import { ValidatedUser } from "../users/users.interface";
import { TurnipExchangeRoom } from "./classes/room.class";
import { CreateRoomDto, CreateRoomRO } from "./dtos/createRoom.dto";
import { RoomService } from "./room.service";

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get("me")
  async getCurrentUserRooms(@User() _user: ValidatedUser.Type): Promise<TurnipExchangeRoom[]> {
    // todo
    const data = {
      id: "1",
      type: "",
      attributes: {
        price: "123",
        dodoCode: "",
        notes: "",
        maxCapacity: 1,
      },
      queueId: "",
    };
    return [data];
  }

  @Post()
  async createRoom(@User() user: ValidatedUser.Type, @Body() payload: CreateRoomDto): Promise<CreateRoomRO> {
    const data = await this.roomService.create({ user, payload });

    return { data };
  }
}
