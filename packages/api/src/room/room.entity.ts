import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfilesEntity } from "../profiles/profiles.entity";
import { TimestampedEntity } from "../utils/timestampedEntity";
import { TurnipExchangeRoomAttributes } from "./classes/room.class";
import { QueueEntity } from "./queue.entity";

@Entity("room")
export class RoomEntity extends TimestampedEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  type!: string;

  @Column({ type: "jsonb", nullable: true })
  attributes!: TurnipExchangeRoomAttributes;

  @ManyToOne(() => ProfilesEntity, (profile) => profile.id, {
    nullable: false,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  createdBy!: ProfilesEntity;

  @OneToOne(() => QueueEntity, (queue) => queue.room, {
    nullable: true,
  })
  queue!: QueueEntity;
}
