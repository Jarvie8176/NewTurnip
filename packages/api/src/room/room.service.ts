import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfilesEntity } from "../profiles/profiles.entity";
import { ProfilesService } from "../profiles/profiles.service";
import { TurnipExchangeRoom, TurnipExchangeRoomInfo } from "./classes/room.class";
import { StateInQueue } from "./profileJoinsRoomQueue.entity";
import { QueueService } from "./queue.service";
import { RoomEntity } from "./room.entity";
import { RoomServiceCreateOptions, RoomServiceGetRoomInfoOptions } from "./room.interface";
import _ = require("lodash");

@Injectable()
export class RoomService {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly queueService: QueueService,
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>
  ) {}

  /**
   * creates a room and a waiting queue
   */
  async create(options: RoomServiceCreateOptions): Promise<TurnipExchangeRoom> {
    const { user, payload } = options;
    const userProfile = await this.profilesService.getByUser(user);
    if (!userProfile) throw new BadRequestException("user profile does not exist");

    const profileEntity = new ProfilesEntity();
    profileEntity.id = userProfile.profile.id;

    const room = new RoomEntity();
    room.type = payload.type;
    room.attributes = payload.attributes;
    room.createdBy = profileEntity;

    await this.roomRepository.save(room);
    const queue = await this.queueService.create({ roomId: room.id });

    return {
      ...room,
      queueId: queue.id,
    };
  }

  /**
   * retrieves room info
   */
  async getRoomInfo(options: RoomServiceGetRoomInfoOptions): Promise<TurnipExchangeRoomInfo> {
    const { roomId } = options;

    const room = await this.roomRepository
      .createQueryBuilder("room")
      .innerJoinAndSelect("room.queue", "queue")
      .where("room.id = :id", { id: roomId })
      .getOne();

    if (!room) throw new NotFoundException("room not found");

    const profilesInQueue = await this.queueService.getPlayers({ queueId: room.queue.id });

    const waitingPlayerCount = _.chain(profilesInQueue)
      .filter((joinInfo) => joinInfo.state === StateInQueue.Waiting)
      .size()
      .value();

    const playersInQueue = _.map(profilesInQueue, (joinInfo) => ({
      profileId: joinInfo.profile.id,
      playerName: joinInfo.profile.settings.playerName || "",
    }));

    const population = {
      max: room.attributes.maxCapacity,
      waiting: waitingPlayerCount,
    };

    return {
      id: room.id,
      type: "turnipExchange",
      attributes: room.attributes,
      queue: {
        id: room.queue.id,
        population,
        playersInQueue,
      },
    };
  }

  //  async joinRoom(options: RoomServiceJoinRoomOptions): Promise<void> {
  //
  //  }

  /**
   * marks a room as inactive and deletes it's queue
   */
  async close(): Promise<void> {
    return;
  }
}
