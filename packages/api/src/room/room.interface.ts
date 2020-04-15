import { ValidatedUser } from "../users/users.interface";
import { CreateRoomDto } from "./dtos/createRoom.dto";

export interface RoomServiceCreateOptions {
  user: ValidatedUser.Type;
  payload: CreateRoomDto;
}

export interface RoomServiceGetRoomInfoOptions {
  user: ValidatedUser.Type;
  roomId: string;
}
