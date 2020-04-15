import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository, Transaction, TransactionManager } from "typeorm";
import { ProfileJoinsRoomQueueEntity } from "./profileJoinsRoomQueue.entity";
import { QueueEntity } from "./queue.entity";
import {
  QueueServiceCreateOptions,
  QueueServiceGetPlayersOptions,
  QueueServicePlacementOptions,
  QueueServiceRemoveOptions,
} from "./queue.interface";
import { RoomEntity } from "./room.entity";

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(QueueEntity)
    private readonly queueRepository: Repository<QueueEntity>,
    @InjectRepository(ProfileJoinsRoomQueueEntity)
    private readonly profilesJoinRoomQueueEntity: Repository<ProfileJoinsRoomQueueEntity>
  ) {}

  /**
   * creates a waiting room queue
   * @param options
   */
  async create(options: QueueServiceCreateOptions): Promise<QueueEntity> {
    const { roomId } = options;
    const queue = new QueueEntity();
    const room = new RoomEntity();
    room.id = roomId;
    queue.room = room;
    return await this.queueRepository.save(queue);
  }

  @Transaction()
  async getPlayers(
    @TransactionManager()
    manager: EntityManager,
    options: QueueServiceGetPlayersOptions
  ): Promise<ProfileJoinsRoomQueueEntity[]> {
    const { queueId } = options;
    //    return await manager;
    //      .getRepository(ProfileJoinsRoomQueueEntity)
    this.queueRepository
      .createQueryBuilder("profilesJoinRoomQueue")
      .useTransaction()
      .leftJoinAndSelect("profilesJoinRoomQueue.profile", "profile")
      .orderBy("profilesJoinRoomQueue.position", "ASC")
      .where(`"profilesJoinRoomQueue"."queueId" = :id`, { id: queueId })
      .getMany();
  }

  /**
   * adds a user profile to a queue, set state to {@link StateInQueue.Waiting}
   * @param manager
   * @param options
   */
  @Transaction()
  async addPlayer(
    @TransactionManager()
    manager: EntityManager,
    options: QueueServicePlacementOptions
  ): Promise<void> {
    const { userProfileId, queueId } = options;
    const players = this.getPlayers(manager, { queueId });
    // todo
    return;
  }

  /**
   * moves user profile to a position
   * @param options
   */
  async movePlayer(_options: QueueServicePlacementOptions): Promise<void> {
    return;
  }

  /**
   * removes a player from queue
   * @param options
   */
  async removePlayer(_options: QueueServiceRemoveOptions): Promise<void> {
    return;
  }
}
