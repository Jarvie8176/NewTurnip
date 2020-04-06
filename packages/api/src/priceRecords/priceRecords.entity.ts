import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfilesEntity } from "../profiles/profiles.entity";

@Entity("priceRecords")
export class PriceRecordsEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: true })
  localTimeOffsetMinutes?: string;

  @Column({ type: "numeric", nullable: false })
  price!: string;

  @Column({ type: "timestamp", nullable: false })
  reportedAt!: Date;

  @ManyToOne(() => ProfilesEntity, (user) => user.id, {
    nullable: true,
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  })
  @JoinColumn()
  reportedBy?: ProfilesEntity;
}
