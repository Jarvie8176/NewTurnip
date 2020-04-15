import { ProfilesEntity } from "../profiles/profiles.entity";
import { QueueEntity } from "./queue.entity";
import { RoomEntity } from "./room.entity";

export interface QueueServiceCreateOptions {
  roomId: RoomEntity["id"];
}

export interface QueueServicePlacementOptions {
  userProfileId: ProfilesEntity["id"];
  queueId: QueueEntity["id"];
}

export interface QueueServiceRemoveOptions {
  userProfileId: ProfilesEntity["id"];
  queueId: QueueEntity["id"];
}

export interface QueueServiceGetPlayersOptions {
  queueId: QueueEntity["id"];
}
