import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PriceRecordsEntity } from "../priceRecords/priceRecords.entity";
import { UsersEntity } from "../users/users.entity";
import { UserProfileSettings } from "./dtos/userProfiles.dto";

@Entity("profiles")
export class ProfilesEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => UsersEntity, (user) => user.id, {
    primary: true,
    nullable: false,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user!: UsersEntity;

  @OneToMany(() => PriceRecordsEntity, (priceRecord) => priceRecord.reportedBy)
  priceRecords?: PriceRecordsEntity[];

  @Column({ type: "jsonb", nullable: false })
  settings!: UserProfileSettings;
}
