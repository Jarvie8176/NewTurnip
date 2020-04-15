import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfilesEntity } from "../profiles/profiles.entity";
import { TimestampedEntity } from "../utils/timestampedEntity";
import { QueueEntity } from "./queue.entity";

export enum StateInQueue {
  Waiting = "waiting",
  Active = "active",
  Done = "done",
}

@Entity("profileJoinsRoomQueue")
export class ProfileJoinsRoomQueueEntity extends TimestampedEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "timestamp with time zone", nullable: false })
  joinedAt!: Date;

  @Column({ type: "text", nullable: false })
  state!: StateInQueue;

  @Column({ type: "integer", nullable: false })
  position!: number;

  @ManyToOne(() => QueueEntity, (queue) => queue.profileJoinsRoomQueue, {
    nullable: false,
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  })
  @JoinColumn()
  queue!: QueueEntity;

  @ManyToOne(() => ProfilesEntity, (profile) => profile.profileJoinsRoomQueue, {
    nullable: false,
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  })
  @JoinColumn()
  profile!: ProfilesEntity;
}
