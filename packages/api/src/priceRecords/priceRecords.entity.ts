import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfilesEntity } from "../profiles/profiles.entity";
import { TimestampedEntity } from "../utils/timestampedEntity";

@Entity("priceRecords")
export class PriceRecordsEntity extends TimestampedEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: true })
  localTimeOffsetMinutes?: string;

  @Column({ type: "numeric", nullable: false })
  price!: string;

  @Column({ type: "timestamp", nullable: false })
  reportedAt!: Date;

  @ManyToOne(() => ProfilesEntity, (profile) => profile.id, {
    nullable: true,
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  })
  @JoinColumn()
  reportedBy?: ProfilesEntity;
}
