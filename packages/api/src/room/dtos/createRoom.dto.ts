import { CreateRoom } from "@turnip-market/dtos";
import { TurnipExchangeRoom, TurnipExchangeRoomAttributes } from "../classes/room.class";

export class CreateRoomDto implements CreateRoom.Request.Type {
  type!: string;
  attributes!: TurnipExchangeRoomAttributes;
}

export class CreateRoomRO implements CreateRoom.Response.Type {
  data!: TurnipExchangeRoom;
}
