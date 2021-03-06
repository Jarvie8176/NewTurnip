import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PriceRecordsEntity } from "../priceRecords/priceRecords.entity";
import { UsersEntity } from "../users/users.entity";
import { TimestampedEntity } from "../utils/timestampedEntity";
import { UserProfileSettings } from "./dtos/userProfiles.dto";

@Entity("profiles")
export class ProfilesEntity extends TimestampedEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "jsonb", nullable: false })
  settings!: UserProfileSettings;

  @ManyToOne(() => UsersEntity, (user) => user.id, {
    nullable: false,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user!: UsersEntity;

  @OneToMany(() => PriceRecordsEntity, (priceRecord) => priceRecord.reportedBy)
  priceRecords?: PriceRecordsEntity[];
}
