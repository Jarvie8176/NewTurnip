import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TimestampedEntity } from "../utils/timestampedEntity";
import { ProfileJoinsRoomQueueEntity } from "./profileJoinsRoomQueue.entity";
import { RoomEntity } from "./room.entity";

@Entity("queue")
export class QueueEntity extends TimestampedEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => RoomEntity, (room) => room.queue, {
    nullable: false,
  })
  @JoinColumn()
  room!: RoomEntity;

  @OneToMany(() => ProfileJoinsRoomQueueEntity, (relation) => relation.queue)
  @JoinColumn()
  profileJoinsRoomQueue!: ProfileJoinsRoomQueueEntity[];
}
