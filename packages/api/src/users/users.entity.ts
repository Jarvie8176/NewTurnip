import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PriceRecordsEntity } from "../priceRecords/priceRecords.entity";
import { ProfilesEntity } from "../profiles/profiles.entity";

@Entity("users")
export class UsersEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  username!: string;

  @Column({ type: "text", nullable: false })
  password!: string;

  @Column({ type: "text", nullable: false })
  email!: string;

  @OneToMany(() => PriceRecordsEntity, (priceRecord) => priceRecord.reportedBy)
  priceRecords?: PriceRecordsEntity[];

  @OneToOne(() => ProfilesEntity, (profile) => profile.user)
  @JoinColumn()
  profile?: ProfilesEntity;
}
